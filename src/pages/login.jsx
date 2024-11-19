import MoonAndRabbit from "./../assets/MoonAndRabbit.svg";
import Blue from "./../assets/blue.svg";
import Yellow from "./../assets/yellow.svg";
import White from "./../assets/white.svg";
import Vector from "./../assets/Vector.svg";
import KakaoButton from "./../assets/kakao_login_button.png";
import "./../styles/login.css";
import { useEffect } from "react";

function Login() {
  // 카카오 로그인 정보
  // 루트 디렉토리에 .env 파일로 관리 후 config파일에서 따로 관리하여 export
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = kakaoLink;
  };

  // 페이지가 로드될 때 body 배경 설정
  useEffect(() => {
    const appElement = document.querySelector(".App");
    if (appElement) {
      appElement.style.background = `linear-gradient(#183e6a, #4a5390, #7b4d83), url(${Vector})`;
      appElement.style.backgroundRepeat = "no-repeat";
      appElement.style.backgroundSize = "cover";
      appElement.style.backgroundBlendMode = "overlay";
    }

    // 컴포넌트가 unmount 될 때 배경 복원
    return () => {
      if (appElement) {
        appElement.style.background = ""; // 원래 배경으로 복원
      }
    };
  }, []);

  return (
    <div className="login">
      <div className="title-wrapper">
        <img src={Yellow} alt="yellow-flower" className="top-yellow-flower" />
        <img src={White} alt="white-flower" className="top-white-flower" />
        <p className="title">잘잘</p>
      </div>

      <div className="intro">
        <p className="intro_1">내가 잘한 것을</p>
        <img src={White} alt="white-flower" className="middle-white-flower" />
        <p className="intro_2">잘 모아 내일의 내가</p>
      </div>

      <div className="login-img-wrapper">
        <img src={Yellow} alt="yellow-flower" className="middle-yellow-flower" />
        <img src={MoonAndRabbit} alt="달토끼" className="moon-and-rabbit" />
        <img src={Blue} alt="Blue-flower" className="middle-blue-flower" />
        <img src={Blue} alt="Blue-flower" className="bottom-blue-flower" />
      </div>

      {/* 카카오 로그인 버튼 */}
      <button onClick={loginHandler} className="KakaoButton">
        <img src={KakaoButton} alt="kakao-button" />
      </button>
    </div>
  );
}

export default Login;
