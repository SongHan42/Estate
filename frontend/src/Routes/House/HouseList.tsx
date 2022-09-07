import React, { useEffect, useState } from "react";
import HouseComponent from "./HouseComponent";
import axios from "axios";
import { getConfig } from "../../function/getConfig";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";

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
};

function HouseList() {
  const [houses, setHouses] = useState<HouseType[]>([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "house", getConfig())
      .then((res) => {
        setHouses(res.data);
      })
      .catch();
  }, []);

  return (
    <div className="w-full">
      <Header />
      <h1 className="text-4xl text-center">리스트</h1>
      {houses.map((house) => {
        return (
          <HouseComponent key={house.id} house={house} setHouses={setHouses} />
        );
      })}
      <Link to="/house/0">
        <Button style="fixed bottom-0 left-0" text="추가" />
      </Link>
    </div>
  );
}

export default HouseList;
