import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Write.css";
import EditIcon from "../assets/edit.png";
import InputTag from "../components/InputTag";
import EditModal from "../components/Edit";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authState";

export default function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useRecoilValue(authState);
  const token = auth?.accessToken;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const contentRef = useRef(null); // contentEditable 요소에 접근할 ref
  const postId = location.state?.postId || null;

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      const url = `http://localhost:8080/api/posts/${postId}`;

      try {
        const response = await axios.get(url, {
          params: { nickname: "한가로운 거위" },
        });

        const data = response.data;

        setContent(data.content || "");
        setTags(data.hashtagNames || []);
      } catch (error) {
        console.error("글 불러오기 실패:", error);
      }
    };

    fetchPost();
  }, [postId, token]);

  const Data = {
    name: "한가로운 거위" /*닉네임 받아오기*/,
  };

  const handleEditButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDoneButtonClick = async () => {
    const url = postId
      ? `http://localhost:8080/api/posts/${postId}`
      : "http://localhost:8080/api/posts";

    const params = {
      content,
      hashtags: tags,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      if (postId) {
        const response = await axios.put(url, {
          params: { nickname: "한가로운 거위" },
        });
        console.log("수정 성공:", response.data);
      } else {
        const response = await axios.post(url, params, { headers });
        console.log("작성 성공:", response.data);
      }
      navigate("/main");
    } catch (error) {
      console.error("글쓰기 요청 실패:", error);
    }
  };

  const Today = new Date();
  const formattedDate = `${Today.getFullYear()}.${String(
    Today.getMonth() + 1
  ).padStart(2, "0")}.${String(Today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (contentRef.current && contentRef.current.textContent !== content) {
      contentRef.current.textContent = content;
    }
  }, [content]);

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
      >
        {postId ? content : ""}
      </div>
      <InputTag tags={tags} setTags={setTags} />
      <div className="done-button-container">
        <button className="done-button" onClick={handleDoneButtonClick}>
          다 작성했어요
        </button>
      </div>
    </div>
  );
}
