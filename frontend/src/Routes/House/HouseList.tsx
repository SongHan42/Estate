import React, { useEffect, useState } from "react";
import HouseComponent from "./HouseComponent";
import { Link } from "react-router-dom";
import { customAxios } from "../../function/customAxios";
import Footer from "../../Components/Footer";

export enum HouseEnum {
  APT,
  OFFICETEL,
  VILLA,
  HOUSING,
  ETC,
}

export enum TradeEnum {
  DEALING,
  JEONSE,
  MONTHLY_RENT,
}

export type HouseType = {
  id: number;
  title: string;
  houseType: HouseEnum;
  tradeType: TradeEnum;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  highAvg: number;
  middleAvg: number;
  lowAvg: number;
  isBookmark: boolean;
  memo: string;
  address: string;
  floor: number;
  roomNum: number;
  isOffering: boolean;
  discription: string;
  img: string;
};

function HouseList() {
  const [houses, setHouses] = useState<HouseType[]>([]);

  useEffect(() => {
    customAxios.get("house").then((res) => {
      console.log(res.data);
      setHouses(res.data);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center justify-center pb-10">
        <h2 className="text-2xl w-full text-center mb-6">
          나의 매물 평가 리스트
        </h2>
        {houses.map((house) => {
          return (
            <HouseComponent
              key={house.id}
              house={house}
              setHouses={setHouses}
            />
          );
        })}
        <Link to="/house/0">
          <img className="w-5 my-5" src="img/plus.png" alt="plus" />
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default HouseList;
