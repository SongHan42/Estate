import React, { useEffect, useState } from "react";
import HouseComponent from "./HouseComponent";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import { customAxios } from "../../function/customAxios";

export enum HouseEnum {
  DEALING,
  JEONSE,
  MONTHLY_RENT,
}

export type HouseType = {
  id: number;
  title: string;
  type: HouseEnum;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  highAvg: number;
  middleAvg: number;
  lowAvg: number;
};

function HouseList() {
  const [houses, setHouses] = useState<HouseType[]>([]);
  useEffect(() => {
    customAxios.get("house").then((res) => {
      setHouses(res.data);
    });
  }, []);

  return (
    <div className="w-full">
      <Header />
      <h1 className="text-4xl text-center">매물 리스트</h1>
      {houses.map((house) => {
        return (
          <HouseComponent key={house.id} house={house} setHouses={setHouses} />
        );
      })}
      <Link to="/house/0">
        <Button style="fixed bottom-0 left-0" text="매물 추가" />
      </Link>
    </div>
  );
}

export default HouseList;
