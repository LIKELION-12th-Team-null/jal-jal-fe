import React, { useState } from "react";
import "../styles/Write.css";
import EditIcon from "../assets/edit.png";
import InputTag from "../components/InputTag";
import EditModal from "../components/Edit";

export default function Write() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Data = {
    name: "한가로운 거위",
  };

  const handleEditButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const Today = new Date();
  const formattedDate = `${Today.getFullYear()}.${String(
    Today.getMonth() + 1
  ).padStart(2, "0")}.${String(Today.getDate()).padStart(2, "0")}`;

  return (
    <div className="write-page">
      <div className="nickname-container">
        {Data.name}(나의 글)<span className="today">{formattedDate}</span>
        <div className="edit-button" onClick={handleEditButtonClick}>
          <img src={EditIcon} alt="..." />
        </div>
      </div>
      <div class="write-content" contenteditable="true"></div>
      <InputTag />
      <div className="done-button-container">
        <button className="done-button">다 작성했어요</button>
      </div>
      {isModalOpen && <EditModal />}
    </div>
  );
}
