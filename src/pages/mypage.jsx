// import Mypost from "./../components/mypost";
// import "./../styles/mypage.css";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useRecoilValue } from "recoil";
// import { authState } from "../atoms/authState";

// function Mypage() {
//   const auth = useRecoilValue(authState); /// 로그인 상태 조회
//   const [posts, setPosts] = useState([]); // 게시글 상태
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 컴포넌트가 처음 렌더링 될 때 데이터 가져오기
//   useEffect(() => {
//     // 게시글 데이터를 서버에서 받아오는 함수
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("", { headers: { Authorization: `Bearer ${auth.accessToken} ` } });

//         setPosts(response.data);
//       } catch (error) {
//         console.error("데이터를 불러오는 데 실패했습니다.", error);
//         setError("게시글을 불러오는 데 문제가 발생했습니다.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (auth.isLoggedIn) {
//       fetchPosts();
//     }
//   }, [auth]);

//   // 로딩 중일 때 & 에러가 있을 때
//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="mypage">
//       {posts.length === 0 ? (
//         <div>작성한 게시글이 없습니다.</div> // 작성한 게시글이 없을 때 메시지
//       ) : (
//         posts.map((post) => <Mypost key={post.id} post={post} />)
//       )}
//     </div>
//   );
// }

// export default Mypage;

import Mypost from "./../components/mypost";
import "./../styles/mypage.css";
import React, { useState, useEffect } from "react";

function Mypage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example data (for testing)
  const examplePosts = [
    {
      id: 1,
      user: "user123",
      nickname: "하품하는 고양이",
      writeDate: "2024-11-16",
      content: "이것은 첫 번째 게시글입니다.",
      finishDate: "2025-01-01",
      hashtags: ["첫번째", "자유"],
    },
    {
      id: 2,
      user: "user123",
      writeDate: "2024-11-15",
      content: "이것은 두 번째 게시글입니다.",
      hashtags: ["두번째", "React"],
    },
    {
      id: 3,
      user: "user456",
      writeDate: "2024-11-14",
      content: "다른 사용자의 게시글",
      hashtags: ["다른", "유저"],
    },
  ];

  // 로그인된 사용자 ID (예시로 하드코딩된 사용자 ID)
  const userId = "user123"; // For testing, you can change this to simulate different users

  // 컴포넌트가 처음 렌더링 될 때 데이터 가져오기
  useEffect(() => {
    setLoading(true);
    try {
      // 예시 데이터를 사용하여 로그인된 사용자의 게시글만 필터링
      const filteredPosts = examplePosts.filter((post) => post.user === userId);
      setPosts(filteredPosts);
    } catch (error) {
      console.error("데이터를 불러오는 데 실패했습니다.", error);
      setError("게시글을 불러오는 데 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 로딩 중일 때 & 에러가 있을 때
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mypage">
      {posts.length === 0 ? (
        <div>작성한 게시글이 없습니다.</div> // 작성한 게시글이 없을 때 메시지
      ) : (
        posts.map((post) => <Mypost key={post.id} post={post} />)
      )}
    </div>
  );
}

export default Mypage;
