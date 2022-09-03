import React, { useEffect, useState } from "react";
import HouseComponent from "./HouseComponent";
import axios from "axios";
import { getConfig } from "../../function/getConfig";

export enum HouseEnum {
  DEALING,
  JEONSE,
  MONTHLY_RENT,
}

export type HouseType = {
  id: number;
  title: string;
  houseType: HouseEnum;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
};

function HouseList() {
  const [houses, setHouses] = useState<HouseType[]>();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "house", getConfig())
      .then((res) => {
        console.log(res);
        setHouses(res.data);
      })
      .catch();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-4xl text-center">리스트</h1>
      {houses
        ? houses.map((house) => {
            <HouseComponent house={house} />;
          })
        : null}
    </div>
  );
}

export default HouseList;
