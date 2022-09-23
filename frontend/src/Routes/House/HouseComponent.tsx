import React from "react";
import { Link } from "react-router-dom";
import { HouseEnum, HouseType } from "./HouseList";
import { customAxios } from "../../function/customAxios";

type PropsType = {
  house: HouseType;
  setHouses: React.Dispatch<React.SetStateAction<HouseType[]>>;
};

function HouseComponent({ house, setHouses }: PropsType) {
  const buttonImg = house.isBookmark
    ? "/img/blue_bookmark.png"
    : "/img/gray_bookmark.png";

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

  const onClickBookMark = () => {
    customAxios.patch(`house/bookmark/${house.id}`).then(() => {
      setHouses((currHouse) => {
        return currHouse
          .map((value) => {
            if (value.id === house.id) {
              value.isBookmark = !value.isBookmark;
            }
            return value;
          })
          .sort((a, b) => b.isBookmark - a.isBookmark);
      });
    });
  };

  return (
    <div className="flex justify-between mb-3">
      <button onClick={onClickBookMark}>
        <img className="w-5" src={buttonImg} alt="" />
      </button>
      <Link to={"/house/" + house.id}>
        <div className="flex w-full">
          <p className="pl-2 pr-2 text-base">{typeText()}</p>
          <p className="pl-2 pr-2 text-base">{house.title}</p>
          <p className="pl-2 pr-2 text-base">{house.area} m^2</p>
        </div>
        {house.type === HouseEnum.DEALING ? (
          <p className="pl-2 pr-2 text-base">
            {house.price} 만원 , 상:
            {house.highAvg.toFixed(2)} / 중:{house.middleAvg.toFixed(2)} / 하:
            {house.lowAvg.toFixed(2)}
          </p>
        ) : (
          <p className="pl-2 pr-2 text-base">
            {house.deposit}/{house.rent}/{house.maintenanceFee} 만원 , 상:
            {house.highAvg.toFixed(2)} / 중:{house.middleAvg.toFixed(2)} / 하:
            {house.lowAvg.toFixed(2)}
          </p>
        )}
        {house.memo ? (
          <p className="pl-2 pr-2 text-base">특이사항: {house.memo}</p>
        ) : null}
      </Link>
      <button onClick={onClick}>
        <img className="w-5" src="img/minus.png" alt="" />
      </button>
    </div>
  );
}

export default HouseComponent;
