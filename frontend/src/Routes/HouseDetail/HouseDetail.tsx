import React from "react";
import HouseDetailComponent from "./HouseDetailComponent";

function HouseDetail() {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-center">
        <h1 className="mr-2">제목</h1>
        <h2>보증금</h2>
      </div>
      <ul className="w-full">
        <li>중요도 상</li>
        <HouseDetailComponent />
        <li>중요도 중</li>
        <li>중요도 하</li>
      </ul>
    </div>
  );
}

export default HouseDetail;
