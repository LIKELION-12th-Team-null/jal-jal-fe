import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "./atoms/authState";

function LoginRedirect() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // token 반환

  const accessToken = queryParams.get("token");

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    setAuth((prev) => ({
      ...prev,
      isLoggedIn: true,
      accessToken: accessToken,
    }));
    navigate("/nickname");
  }, [setAuth, navigate]);

  return <div>로그인 중...</div>;
}
export default LoginRedirect;
