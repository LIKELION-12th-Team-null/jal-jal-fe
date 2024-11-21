import React, { useState } from "react";
import "../styles/InputTag.css";

function InputTag() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue)) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="tag-container">
        <input
          className="text-tag input-tag"
          type="text"
          placeholder="#태그를 입력해주세요."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {tags.map((tag, index) => (
          <div className="text-tag-container">
            <div className="text-tag" key={index}>
              <span>#{tag}</span>
            </div>
            <button className="delete-tag" onClick={() => handleRemoveTag(tag)}>
              x
            </button>
          </div>
        ))}
        <div className="text-tag add-button" onClick={handleAddTag}>
          +
        </div>
      </div>
    </div>
  );
}

export default InputTag;
