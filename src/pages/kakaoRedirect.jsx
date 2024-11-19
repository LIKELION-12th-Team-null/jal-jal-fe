import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../atoms/authState";

function KakaoRedirect() {
  const setAuthState = useSetRecoilState(authState); // Recoil 상태 업데이트 함수
  const navigate = useNavigate();

  // 인가 코드로 백엔드에 요청 보내기
  const getAccessToken = async (authorizationCode) => {
    try {
      // 토큰 발급 요청 형식
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      // URLSearchParams로 데이터를 URL 인코딩 형식으로 변환
      const body = new URLSearchParams({
        code: authorizationCode,
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY, // 카카오 REST API 키
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI, // 리다이렉트 URI
      });

      const response = await axios.post("", body, { headers });

      // 응답이 성공적인 경우
      const data = response.data;
      const accessToken = data.access_token; //나중에 응답 정보 수정
      const userInfo = data.user_Info;

      // 상태 업데이트
      setAuthState({
        isLoggedIn: true,
        accessToken: accessToken, //나중에 업데이트 정보 수정
        userInfo: userInfo,
      });

      // 로컬 스토리지에 받아온 토큰과 사용자 정보를 저장
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_info", JSON.stringify(userInfo)); //나중에 정보 수정
      navigate("/nickname"); // 로그인 후 닉네임 페이지로 이동
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 리다이렉트된 URL에서 인가 코드 추출
  useEffect(() => {
    // 서버로 보내줄 인가코드 추출
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      getAccessToken(code); // 인가 코드를 백엔드로 전달하여 토큰 받기
    }
  }, []);

  return <div>로그인 중...</div>;
}
export default KakaoRedirect;
