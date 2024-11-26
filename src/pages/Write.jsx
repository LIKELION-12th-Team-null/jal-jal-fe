import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Write.css";
import EditIcon from "../assets/edit.png";
import InputTag from "../components/InputTag";
import EditModal from "../components/Edit";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";

export default function Write() {
  const auth = useRecoilValue(authState);
  const token = auth?.accessToken;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const contentRef = useRef(null); // contentEditable 요소에 접근할 ref
  const navigate = useNavigate();

  const Data = {
    name: "한가로운 거위" /*닉네임 받아오기*/,
  };

  const handleEditButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDoneButtonClick = async () => {
    const url = "http://localhost:8080/api/posts";

    const params = {
      content: content,
      socialId: 2 /*Id 받아오기*/,
      hashtags: tags,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(url, { params }, { headers });
      console.log(response.data);
      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.textContent = content;
    }
  }, [content]);

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
          {isModalOpen && (
            <EditModal
              setIsModalOpen={setIsModalOpen}
              setContent={setContent}
              setTags={setTags}
            />
          )}
        </div>
      </div>
      <div
        className="write-content"
        contentEditable="true"
        dir="ltr"
        ref={contentRef} // contentEditable 요소에 접근할 ref
        onInput={(e) => setContent(e.target.textContent)}
      ></div>
      <InputTag tags={tags} setTags={setTags} />
      <div className="done-button-container">
        <button className="done-button" onClick={handleDoneButtonClick}>
          다 작성했어요
        </button>
      </div>
    </div>
  );
}
