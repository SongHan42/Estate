import React from "react";
import { Link } from "react-router-dom";
import { HouseEnum, HouseType } from "./HouseList";
import { customAxios } from "../../function/customAxios";

type PropsType = {
  house: HouseType;
  setHouses: React.Dispatch<React.SetStateAction<HouseType[]>>;
};

function HouseComponent({ house, setHouses }: PropsType) {
  const typeText = () => {
    if (house.type === HouseEnum.DEALING) return "[매매]";
    else if (house.type === HouseEnum.JEONSE) return "[전세]";
    else return "[월세]";
  };

  const onClick = () => {
    customAxios.delete(`house/${house.id}`).then(() => {
      setHouses((curr) => curr.filter((temp) => temp.id !== house.id));
    });
  };

  return (
    <div className="flex justify-between">
      <Link to={"/house/" + house.id}>
        <div className="flex w-full justify-center">
          <p className="pl-2 pr-2 text-xl">{typeText()}</p>
          <p className="pl-2 pr-2 text-xl">{house.title}</p>
          <p className="pl-2 pr-2 text-xl">{house.area} m^2</p>
        </div>
        {house.type === HouseEnum.DEALING ? (
          <p className="pl-2 pr-2 text-xl mb-2">{house.price} 만원</p>
        ) : (
          <p className="pl-2 pr-2 text-xl mb-2">
            {house.deposit}/{house.rent}/{house.maintenanceFee} 만원
          </p>
        )}
      </Link>
      <button onClick={onClick}>
        <img className="w-5" src="img/minus.png" alt="" />
      </button>
    </div>
  );
}

export default HouseComponent;
