import "../styles/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Dot from "../assets/threeDot.svg";
import Heart from "../assets/heart.svg";
import Edit from "../components/Edit";

function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      if (response.data.status === "SUCCESS") {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0 && currentIndex < posts.length - 1) {
      setIsScrolling(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setIsScrolling(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientY;
    if (isScrolling) return;
    if (touchStart - touchEnd > 50 && currentIndex < posts.length - 1) {
      setIsScrolling(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (touchEnd - touchStart > 50 && currentIndex > 0) {
      setIsScrolling(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsScrolling(false), 800);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, touchStart, isScrolling]);

  const handleDotClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="main-containerM">
      <div
        className="page-wrapperM"
        style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
      >
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="pageM" key={post.id}>
              <div className="headM">
                <p>{post.author.nickname}</p>
                <p className="dateM">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="dot-containerM" onClick={handleDotClick}>
                  <img src={Dot} alt="etc" />
                  {showOptions && <Edit />}
                </div>
              </div>
              <div className="whiteM">
                <p>{post.content}</p>
                <div className="hashtagsM">
                  {post.hashtags.map((tag, idx) => (
                    <p className="hashtagM" key={idx}>
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
              <img src={Heart} alt="like" className="likeM" />
            </div>
          ))
        ) : (
          <div className="pageM">
            <div className="headM">
              <p>게시물 작성자가 없습니다.</p>
            </div>
            <div className="whiteM">
              <p>게시물이 없습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
