import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Main from "./pages/Main";
import Like from "./pages/Like";
import Write from "./pages/Write";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/like" element={<Like />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  return location.pathname !== "/login" ? <Header /> : null;
};

export default App;
