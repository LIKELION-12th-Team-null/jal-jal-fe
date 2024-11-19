import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Main from "./pages/Main";
import Like from "./pages/Like";
import Write from "./pages/Write";
import Login from "./pages/login";
import Nickname from "./pages/nickName";
import Mypage from "./pages/mypage";
import KakaoRedirect from "./pages/kakaoRedirect";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nickname" element={<Nickname />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route exact path="/oauth" element={<KakaoRedirect />} />
          <Route path="/main" element={<Main />} />
          <Route path="/like" element={<Like />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  return location.pathname !== "/" ? <Header /> : null;
};

export default App;
