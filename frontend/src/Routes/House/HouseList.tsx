import React, { useEffect, useState } from "react";
import HouseComponent from "./HouseComponent";
import axios from "axios";
import { getConfig } from "../../function/getConfig";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

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
      <h1 className="text-4xl text-center">리스트</h1>
      {houses.map((house) => {
        return <HouseComponent key="0" house={house} />;
      })}
      <Link to="/importance">
        <Button text="중요도 수정" />
      </Link>
      <Link to="/house/0">
        <Button text="추가" />
      </Link>
    </div>
  );
}

export default HouseList;
