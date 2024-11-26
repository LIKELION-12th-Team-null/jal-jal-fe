import Hashtag from "./hashtag";
import "./../styles/mypost.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  // 로컬 시간대에 적용되도록 변경
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "-")
    .replace(/\s/g, ""); // YYYY-MM-DD 형식으로 반환
}

function Mypost({ nickname, post }) {
  return (
    <div className="mypage">
      <div className="post-info">
        <p className="user">{nickname} (나의 글)</p>
        <p className="write-date">{formatDate(post.updatedAt || post.createdAt)}</p>
      </div>
      <div className="post-wrapper">
        <div className="post-content">{post.content}</div>
        <div className="hashtag-wrapper">
          {post.hashtags.map((hashtag, index) => (
            <Hashtag key={index} hashtag={hashtag} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mypost;
