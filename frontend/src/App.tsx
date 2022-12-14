import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Routes/SignUp/SignUp";
import HouseList from "./Routes/House/HouseList";
import SignIn from "./Routes/SignIn/SignIn";
import ImportanceList from "./Routes/Importance/ImportanceList";
import HouseDetail from "./Routes/HouseDetail/HouseDetail";
import Setting from "./Routes/Setting/Setting";
import User from "./Routes/User/User";
import HouseOfferingDetail from "./Routes/HouseOfferingDetail/HouseOfferingDetail";
import HouseOfferingList from "./Routes/HouseOffering/HouseOfferingList";
import LikeList from "./Routes/Like/LikeList";
import Search from "./Routes/Search/Search";

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen h-full bg-[#f6f6f6] flex justify-center">
        <div className="flex flex-col justify-center items-center w-96 h-full mt-10 pt-5">
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/importance" element={<ImportanceList />}></Route>
            <Route path="/house" element={<HouseList />}></Route>
            <Route path="/house/:id" element={<HouseDetail />}></Route>
            <Route path="/setting" element={<Setting />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route
              path="/house/offering"
              element={<HouseOfferingList />}
            ></Route>
            <Route
              path="/house/offering/:id"
              element={<HouseOfferingDetail />}
            ></Route>
            <Route path="/like" element={<LikeList />}></Route>
            <Route path="/house/search" element={<Search />}></Route>
            <Route path="/house/search/:address" element={<Search />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
