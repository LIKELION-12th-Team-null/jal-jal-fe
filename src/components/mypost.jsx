import Hashtag from "./hashtag";
import "./../styles/mypost.css";
function Mypost({ post }) {
  return (
    <div className="mypage">
      <div className="post-info">
        <p className="user">{post.user} (나의 글)</p>
        <p className="write-date">{post.writeDate}</p>
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
