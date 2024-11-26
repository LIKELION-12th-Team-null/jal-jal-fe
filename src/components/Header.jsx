import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import HeartIcon from "../assets/heart.png";
import MyPageIcon from "../assets/mypage.png";
import tagSearch from "../assets/tagSearch.svg";
import writeIcon from "../assets/writeIcon.svg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="service-name" onClick={() => navigate("/main")}>
        잘잘
      </div>
      <div className="icons-container">
        <img
          src={tagSearch}
          alt="인기태그 아이콘"
          onClick={() => navigate("/tag")}
        />
        <img
          src={writeIcon}
          alt="글쓰기 아이콘"
          onClick={() => navigate("/write")}
        />
        <img
          src={MyPageIcon}
          alt="사람 아이콘"
          onClick={() => navigate("/mypage")}
        />
        <img
          src={HeartIcon}
          alt="하트 아이콘"
          onClick={() => navigate("/like")}
        />
      </div>
    </header>
  );
}
