import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/famousTag.css";
import "bootstrap/dist/css/bootstrap.min.css";

function FamousTag() {
  const [hashtags, setHashtags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const response = await axios.get("/api/hashtags");
        if (
          response.data.code === "COM-000" &&
          Array.isArray(response.data.result)
        ) {
          setHashtags(response.data.result);
        } else {
          console.error("Error fetching hashtags: Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching hashtags: ", error);
      }
    };

    fetchHashtags();
  }, []);

  const handleHashtagClick = (hashtagName) => {
    navigate(`/hashtags/${encodeURIComponent(hashtagName)}`);
  };

  const renderHashtags = () => {
    if (hashtags.length === 0) {
      return <p className="noHashtags">해시태그가 없습니다.</p>;
    }

    const bfHashtags = hashtags.slice(0, 5);
    const yfHashtags = hashtags.slice(5);

    return (
      <>
        <div className="hashtagsBF">
          {bfHashtags.map((tag) => (
            <button
              key={tag.id}
              className="hashtagBF"
              onClick={() => handleHashtagClick(tag.hashtagName)}
            >
              #{tag.hashtagName}
            </button>
          ))}
        </div>
        <div className="hashtagsYF">
          {yfHashtags.map((tag) => (
            <button
              key={tag.id}
              className="hashtagYF"
              onClick={() => handleHashtagClick(tag.hashtagName)}
            >
              #{tag.hashtagName}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="containerF">
        <p className="collectF">인기태그를 모아볼 수 있습니다.</p>
        <p className="impossibleF">*태그 중복 선택은 불가합니다.</p>
      </div>
      {renderHashtags()}
    </div>
  );
}

export default FamousTag;
