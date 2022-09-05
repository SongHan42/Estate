import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Routes/SignUp/SignUp";
import HouseList from "./Routes/House/HouseList";
import SignIn from "./Routes/SignIn/SignIn";
import ImportanceList from "./Routes/Importance/ImportanceList";
import HouseDetail from "./Routes/HouseDetail/HouseDetail";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-[#f6f6f6] flex justify-center">
        <div className="flex lfex-col justify-center items-center w-96">
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/importance" element={<ImportanceList />}></Route>
            <Route path="/house" element={<HouseList />}></Route>
            <Route path="/house/:id" element={<HouseDetail />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
