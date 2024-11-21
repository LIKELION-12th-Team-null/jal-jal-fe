import "../styles/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Dot from "../assets/threeDot.svg";
import Heart from "../assets/heart.svg";
import dummyData from "../data/dummyData";
import fullHeart from "../assets/full-heart.svg";

function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleScroll = (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0 && currentIndex < dummyData.length - 1) {
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
    if (touchStart - touchEnd > 50 && currentIndex < dummyData.length - 1) {
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
        {dummyData.map((data, index) => (
          <div className="pageM" key={index}>
            <div className="headM">
              <p>{data.title}</p>
              <p className="dateM">{data.date}</p>
              <div className="dot-containerM">
                <img
                  src={Dot}
                  className="dotM"
                  alt="etc"
                  onClick={handleDotClick}
                />
                {showOptions && (
                  <div className="options-boxM">
                    <button className="optionM">삭제하기</button>
                    <button className="optionM">수정하기</button>
                  </div>
                )}
              </div>
            </div>
            <div className="whiteM">
              <p>{data.content}</p>
              <div className="hashtagsM">
                {data.hashtags.map((tag, idx) => (
                  <p className="hashtagM" key={idx}>
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <img
              src={dummyData[currentIndex].liked ? fullHeart : Heart}
              alt="like"
              className="likeM"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
