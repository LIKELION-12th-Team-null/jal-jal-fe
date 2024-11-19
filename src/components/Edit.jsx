import React from "react";
import "../styles/Edit.css";

export default function Edit() {
  return (
    <div>
      <div className="edit-modal">
        <div className="text-container">
          <span className="button">수정하기</span>
          <span>|</span>
          <span className="button">삭제하기</span>
        </div>
      </div>
    </div>
  );
}
