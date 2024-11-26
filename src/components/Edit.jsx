import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Edit.css";

export default function Edit({ setIsModalOpen, postId, setContent, setTags }) {
  const navigate = useNavigate();

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".edit-modal")) {
      setIsModalOpen(false);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(false);
    navigate("/write", { state: { postId } });
  };

  const handleDelete = async () => {
    if (postId) {
      const url = `http://localhost:8080/api/posts/${postId}`;
      try {
        const response = await axios.delete(url, {
          params: { nickname: "한가로운 거위" } /*닉네임 받아오기*/,
        });
        console.log("삭제 성공:", response.data);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    } else {
      setContent("");
      setTags([]);
      console.log("초기화 완료");
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="edit-modal">
        <div className="text-container">
          <span className="button" onClick={handleEdit}>
            수정하기
          </span>
          <span>|</span>
          <span className="button" onClick={handleDelete}>
            삭제하기
          </span>
        </div>
      </div>
    </div>
  );
}
