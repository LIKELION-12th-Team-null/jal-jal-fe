import "./../styles/nickName.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../atoms/authState";

function NickName() {
  const auth = useRecoilValue(authState); // 현재 로그인 상태 조회
  const setAuthState = useSetRecoilState(authState);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 서버에서 닉네임을 가져오는 함수
  const fetchNickname = async () => {
    setLoading(true);
    try {
      console.log("토큰:", auth.accessToken); // 요청 전에 토큰을 출력하여 확인

      // axios를 사용하여 GET 요청
      const response = await axios.get("", { headers: { Authorization: `Bearer ${auth.accessToken}` } }); // 토큰을 Authorization 헤더에 추가

      const receivedNickname = response.data.nickname;

      if (response.status === 200) {
        setNickname(receivedNickname); // 서버에서 받은 닉네임을 상태에 저장
      } else {
        console.error("닉네임을 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("서버에 연결할 수 없습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 닉네임을 가져오기
  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchNickname();
    }
  }, [auth.isLoggedIn]);

  // 확인하기 버튼 클릭 시 닉네임 전송하기
  const handleSubmitNickname = async () => {
    if (!nickname) {
      alert("닉네임이 저장되지 않았습니다.");
      return;
    }

    try {
      // 닉네임 POST 요청
      const response = await axios.post("", { nickname }, { headers: { Authorization: `Bearer ${auth.accessToken}` } });

      console.log("닉네임 저장 응답 데이터:", response.data); // 응답 데이터 확인

      if (response.status === 200) {
        alert("닉네임이 성공적으로 저장되었습니다.");
        setAuthState((prev) => ({
          ...prev,
          userInfo: { nickname },
        }));
        navigate("/mypage"); //닉네임 저장 후 페이지 이동
      } else {
        alert("닉네임 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버에 연결할 수 없습니다.", error);
    }
  };

  // css 배치 설정
  // 페이지가 로드될 때 body 배치 설정
  useEffect(() => {
    const appElement = document.querySelector(".App");
    if (appElement) {
      appElement.style.justifyContent = "flex-start";
      appElement.style.paddingTop = "120px";
      appElement.style.overflow = "hidden";
    }

    // 컴포넌트가 unmount 될 때 배치 복원
    return () => {
      if (appElement) {
        appElement.style.background = ""; // 원래 배경으로 복원
      }
    };
  }, []);

  return (
    <div className="nickname">
      <div className="nickname-wrapper">
        <p className="title">잘잘</p>
        <p className="nickname-intro">닉네임을 골라주세요.</p>
        <p className="nickname-explain">닉네임은 랜덤으로 생성됩니다.</p>
      </div>

      <div className="nickname-form">
        <p className="nickname-input">{nickname}</p>
        <button type="button" className="create-new-nickname" onClick={fetchNickname} disabled={loading}>
          닉네임 다시 만들기
        </button>
        <button type="submit" className="submit-nickname" onClick={handleSubmitNickname} disabled={loading}>
          {loading ? "로딩 중..." : "확인하기"}
        </button>
      </div>
    </div>
  );
}

export default NickName;