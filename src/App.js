import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main.jsx";
import Like from "./pages/Like.jsx";
import Ex from "./pages/ex.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Ex />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Like" element={<Like />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
