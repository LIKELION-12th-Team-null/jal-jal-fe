import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/hashtagPosts.css";

function HashtagPosts() {
  const { hashtagName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `/api/hashtags/${encodeURIComponent(hashtagName)}`
        );
        if (response.data.code === "COM-000") {
          setPosts(response.data.result.content);
        } else {
          console.error("Error fetching posts: Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [hashtagName]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (posts.length === 0) {
    return <p>게시물이 없습니다.</p>;
  }

  return (
    <div className="postsContainer">
      <h1>#{hashtagName} 관련 게시물</h1>
      <div className="postsGrid">
        {posts.map((post) => (
          <div key={post.id} className="postCard">
            <p className="postAuthor">작성자: {post.nickName || "익명"}</p>
            <p className="postContent">{post.content}</p>
            {post.hashtagNames.map((tag, index) => (
              <span key={index} className="postHashtag">
                #{tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HashtagPosts;
