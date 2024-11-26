import Mypost from "./../components/mypost";
import "./../styles/mypage.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";

function Mypage() {
  const auth = useRecoilValue(authState); /// 로그인 상태 조회
  const [posts, setPosts] = useState([]); // 게시글 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nickname, setNickname] = useState(); // 닉네임 상태

  // 컴포넌트가 처음 렌더링 될 때 데이터 가져오기
  useEffect(() => {
    // 게시글 데이터를 서버에서 받아오는 함수
    const fetchPosts = async () => {
      setLoading(true);
      // Recoil 상태에서 토큰 가져오기, 없으면 localStorage에서 가져오기
      const token = auth.accessToken || localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://localhost:8080/api/posts/myPage", { headers: { Authorization: `${token}` } });

        setPosts(response.data.data.posts);
        setNickname(response.data.data.profile.nickname);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
        setError("게시글을 불러오는 데 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (auth.isLoggedIn) {
      fetchPosts();
    }
  }, [auth.isLoggedIn]);

  // 로딩 중일 때 & 에러가 있을 때
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mypage">
      {posts.length === 0 ? (
        <div className="no_posts">작성한 게시글이 없습니다.</div> // 작성한 게시글이 없을 때 메시지
      ) : (
        posts.map((post) => <Mypost key={post.id} nickname={nickname} post={post} />)
      )}
    </div>
  );
}

export default Mypage;
