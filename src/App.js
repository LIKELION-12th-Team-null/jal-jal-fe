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
import Tag from "./pages/famousTag.jsx";
import LoginRedirect from "./loginRedirect";
import MainRedirect from "./mainRedirect";
import HashtagPosts from "./components/hasgtagPosts";

function App() {
  return (
    <div className="App">
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/callback/sign-up" element={<LoginRedirect />} />
        <Route path="/callback/main" element={<MainRedirect />} />
        <Route path="/main" element={<Main />} />
        <Route path="/like" element={<Like />} />
        <Route path="/write" element={<Write />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/hashtags/:hashtagName" element={<HashtagPosts />} />
      </Routes>
    </div>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  const excludedPaths = [
    "/",
    "/nickname",
    "/callback/sign-up",
    "/callback/main",
  ]; // 헤더를 숨길 경로 목록

  return !excludedPaths.includes(location.pathname) ? <Header /> : null;
};

export default App;
