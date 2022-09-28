import React from "react";
import { Link } from "react-router-dom";
import { HouseEnum, HouseType, TradeEnum } from "./HouseList";
import { customAxios } from "../../function/customAxios";

type PropsType = {
  house: HouseType;
  setHouses: React.Dispatch<React.SetStateAction<HouseType[]>>;
};

function HouseComponent({ house, setHouses }: PropsType) {
  const bookmarkImg = house.isBookmark
    ? "/img/blue_bookmark.png"
    : "/img/gray_bookmark.png";

  const tradeTypeText = () => {
    if (house.tradeType === TradeEnum.DEALING) return "[매매]";
    else if (house.tradeType === TradeEnum.JEONSE) return "[전세]";
    else return "[월세]";
  };

  const housetypeText = () => {
    if (house.houseType === HouseEnum.APT) return "아파트)";
    else if (house.houseType === HouseEnum.OFFICETEL) return "오피스텔)";
    else if (house.houseType === HouseEnum.VILLA) return "빌라)";
    else if (house.houseType === HouseEnum.HOUSING) return "주택)";
    else return "기타)";
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
        <img className="w-5" src={bookmarkImg} alt="" />
      </button>
      <div className="bg-white rounded-lg">
        <Link to={"/house/" + house.id}>
          <div className="flex w-full justify-between">
            <div className="my-5">
              {house.tradeType === TradeEnum.DEALING ? (
                <p className="px-2 text-lg">
                  {tradeTypeText()} &nbsp;
                  {house.price} 만원{" "}
                </p>
              ) : (
                <p className="px-2 text-lg">
                  {tradeTypeText()} &nbsp;
                  {house.deposit}/{house.rent}/{house.maintenanceFee} 만원{" "}
                </p>
              )}
              {house.isOffering ? (
                <p className="px-3 text-base">{house.discription}</p>
              ) : (
                <p className="px-3 text-base">{`${house.title}\n`}</p>
              )}
              <p className="px-3 text-base">
                {housetypeText()}•{house.area}•방 {house.roomNum}•{house.floor}
                층
              </p>
              <p className="px-3 text-base">
                상: {house.highAvg}&nbsp; 중: {house.middleAvg}&nbsp; 하:{" "}
                {house.lowAvg}
              </p>
            </div>
            <img
              className="w-28 m-3 right-0"
              src={
                house.img
                  ? process.env.REACT_APP_API_URL + house.img
                  : "/img/gray_box.png"
              }
              alt=""
            />
          </div>
        </Link>
      </div>
      <button onClick={onClick}>
        <img className="w-5 " src="img/minus.png" alt="" />
      </button>
    </div>
  );
}

export default HouseComponent;
