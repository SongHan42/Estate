import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import { customAxios } from "../../function/customAxios";
import { HouseOfferingType } from "../HouseOffering/HouseOfferingList";

function Search() {
  const [houseOfferings, setHouseOfferings] = useState<HouseOfferingType[]>([]);
  const [address, setAddress] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      customAxios.get(`/house/search/${address}`).then((res) => {
        setHouseOfferings(res.data);
      });
    }
  };

  useEffect(() => {
    customAxios.get(`/house/search/${address}`).then((res) => {
      setHouseOfferings(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full items-center pb-10">
      <div className="flex justify-between">
        <img className="left-0 w-5" src="/img/black_search.png" alt="" />
        <input
          onChange={onChangeSearch}
          value={address}
          placeholder="(동)으로 검색"
          onKeyPress={onEnter}
        />
      </div>
      {houseOfferings.map((houseOffering) => {
        return <p key={houseOffering.id}>{houseOffering.address}</p>; //임시
      })}
      <Footer />
    </div>
  );
}

export default Search;
