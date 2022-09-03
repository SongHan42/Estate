import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Routes/SignUp/SignUp";
import HouseList from "./Routes/House/HouseList";
import SignIn from "./Routes/SignIn/SignIn";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-[#f6f6f6] flex justify-center">
        <div className="w-96">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Routes>
              <Route path="/" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/house" element={<HouseList />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
