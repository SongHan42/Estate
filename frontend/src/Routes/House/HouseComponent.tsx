import React from "react";
import { Link } from "react-router-dom";
import { HouseEnum, HouseType } from "./HouseList";

type PropsType = {
  house: HouseType;
};

function HouseComponent({ house }: PropsType) {
  console.log("house");
  const money = () => {
    if (house.type === HouseEnum.DEALING) {
      return house.price;
    } else {
      return `${house.deposit}/${house.rent}/${house.maintenanceFee}`;
    }
  };

  const typeText = () => {
    if (house.type === HouseEnum.DEALING) return "매매";
    else if (house.type === HouseEnum.JEONSE) return "전세";
    else return "월세";
  };

  return (
    <Link to={"/house/1"}>
      <div className="flex w-full justify-center">
        <p className="pl-2 pr-2 text-xl">{typeText()}</p>
        <p className="pl-2 pr-2 text-xl">{house.title}</p>
        <p className="pl-2 pr-2 text-xl">{house.area} m^2</p>
        <p className="pl-2 pr-2 text-xl">{money()} 만원</p>
      </div>
    </Link>
  );
}

export default HouseComponent;