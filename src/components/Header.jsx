import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import SearchIcon from "../assets/search.png";
import HeartIcon from "../assets/heart.png";
import MyPageIcon from "../assets/mypage.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="service-name" onClick={() => navigate("/")}>
        잘잘
      </div>
      <div className="icons-container">
        <img
          src={SearchIcon}
          alt="돋보기 아이콘"
          onClick={() => navigate("/")}
        />
        <img src={MyPageIcon} alt="사람 아이콘" onClick={() => navigate("/")} />
        <img
          src={HeartIcon}
          alt="하트 아이콘"
          onClick={() => navigate("/like")}
        />
      </div>
    </header>
  );
}
