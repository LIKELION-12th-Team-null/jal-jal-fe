import "../styles/Like.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import fullHeart from "../assets/full-heart.svg";
import dummyData from "../data/dummyData";

function Like() {
  return (
    <div>
      <div className="head">
        <p>느린 돌고래</p>
        <p className="date">2024.10.29</p>
      </div>
      <div className="white">
        <div>
          나는 느린 학습자인데,
          <br />
          정보처리기사를 목적으로 공부를 열심히 한다. 오늘은 데이터베이스에 대해
          공부했다.
        </div>
        <div className="hashtags">
          <button className="hashtag">#느린학습자</button>
          <button className="hashtag">#정보처리기사</button>
          <button className="hashtag">#자격증</button>
          <button className="hashtag">#휴학</button>
        </div>
      </div>
      <img src={fullHeart} className="like" alt="like" />

      <hr className="line" />

      <div className="head">
        <p>배고픈 카피바라</p>
        <p className="date">2024.10.29</p>
      </div>
      <div className="white">
        <div>
          여러분 모두 할 수 있어요!
          <br />저 오늘 토익 고득점 했습니다.
        </div>
        <div className="hashtags">
          <button className="hashtag">#토익</button>
          <button className="hashtag">#졸업요건</button>
          <button className="hashtag">#자격증</button>
          <button className="hashtag">#열정</button>
        </div>
      </div>
      <img src={fullHeart} className="like" alt="like" />
    </div>
  );
}

export default Like;
