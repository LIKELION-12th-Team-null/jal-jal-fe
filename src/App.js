import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Nickname from "./pages/nickName";
import Mypage from "./pages/mypage";
import KakaoRedirect from "./pages/kakaoRedirect";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route exact path="/oauth" element={<KakaoRedirect />} />
      </Routes>
    </div>
  );
}

export default App;
