import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Routes/Login/Login";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-[#f6f6f6] flex justify-center">
        <div className="w-96">
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;