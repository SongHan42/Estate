import React from "react";
import { HouseOfferingType } from "./HouseOfferingList";
import { HouseEnum, TradeEnum } from "../House/HouseList";
import { customAxios } from "../../function/customAxios";
import { Link } from "react-router-dom";

type PropsType = {
  houseOffering: HouseOfferingType;
  setHouseOfferings: React.Dispatch<React.SetStateAction<HouseOfferingType[]>>;
};

function HouseOfferingComponent({
  houseOffering,
  setHouseOfferings,
}: PropsType) {
  const tradeTypeText = () => {
    if (houseOffering.tradeType === TradeEnum.DEALING) return "[매매]";
    else if (houseOffering.tradeType === TradeEnum.JEONSE) return "[전세]";
    else return "[월세]";
  };

  const housetypeText = () => {
    if (houseOffering.houseType === HouseEnum.APT) return "아파트)";
    else if (houseOffering.houseType === HouseEnum.OFFICETEL)
      return "오피스텔)";
    else if (houseOffering.houseType === HouseEnum.VILLA) return "빌라)";
    else if (houseOffering.houseType === HouseEnum.HOUSING) return "주택)";
    else return "기타)";
  };

  const onClick = () => {
    customAxios.delete(`house/offering/${houseOffering.id}`).then(() => {
      setHouseOfferings((curr) =>
        curr.filter((temp) => temp.id !== houseOffering.id),
      );
    });
  };

  return (
    <div className="flex justify-between mb-3">
      <div className="bg-white rounded-lg">
        <Link to={"/house/offering/" + houseOffering.id}>
          <div className="flex w-full">
            <div>
              {houseOffering.tradeType === TradeEnum.DEALING ? (
                <p className="px-2 text-lg">
                  {tradeTypeText()} &nbsp;
                  {houseOffering.price} 만원{" "}
                </p>
              ) : (
                <p className="px-2 text-lg">
                  {tradeTypeText()} &nbsp;
                  {houseOffering.deposit}/{houseOffering.rent}/
                  {houseOffering.maintenanceFee} 만원{" "}
                </p>
              )}
              <p className="px-3 text-base">
                {houseOffering.address} {houseOffering.addressDetail}
              </p>

              <p className="px-3 text-base">
                {housetypeText()}•{houseOffering.area}•방{" "}
                {houseOffering.roomNum}•{houseOffering.floor}층
              </p>
              <p className="px-3 text-base">{houseOffering.discription}</p>
            </div>
            <img
              className="w-1/3 m-3 right-0"
              src={
                houseOffering.img
                  ? process.env.REACT_APP_API_URL + houseOffering.img
                  : "/img/gray_box.png"
              }
              alt=""
            />
          </div>
        </Link>
      </div>
      <button onClick={onClick}>
        <img className="w-10 ml-3" src="/img/minus.png" alt="" />
      </button>
    </div>
  );
}

export default HouseOfferingComponent;
