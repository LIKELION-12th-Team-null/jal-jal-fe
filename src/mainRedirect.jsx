import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "./atoms/authState";

function MainRedirect() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // token 반환

  const accessToken = queryParams.get("token");

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      // Access token 저장 및 상태 업데이트
      localStorage.setItem("accessToken", accessToken); // localStorage에 저장
      setAuth((prev) => ({
        ...prev,
        isLoggedIn: true,
        accessToken: accessToken, // Recoil 상태 업데이트
      }));
      navigate("/main");
    } else {
      console.error("Access token is missing.");
      navigate("/");
    }
  }, [accessToken, setAuth, navigate]); // 의존성 배열에 accessToken 추가

  return <div>로그인 중...</div>;
}
export default MainRedirect;
