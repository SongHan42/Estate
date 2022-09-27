import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import { customAxios } from "../../function/customAxios";
import { HouseEnum, TradeEnum } from "../House/HouseList";
import HouseOfferingComponent from "../HouseOffering/HouseOfferingComponent";

export type HouseOfferingType = {
  id: number;
  title: string;
  houseType: HouseEnum;
  tradeType: TradeEnum;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  address: string;
  floor: number;
  roomNum: number;
  discription: string;
  img: string;
};

function LikeList() {
  const [houseOfferings, setHouseOfferings] = useState<HouseOfferingType[]>([]);

  useEffect(() => {
    customAxios.get("house/offering").then((res) => {
      setHouseOfferings(res.data);
    });
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl w-full text-center mb-6">찜한 방</h2>
      {houseOfferings.map((houseOffering) => {
        return (
          <HouseOfferingComponent
            key={houseOffering.id}
            houseOffering={houseOffering}
            setHouseOfferings={setHouseOfferings}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default LikeList;
