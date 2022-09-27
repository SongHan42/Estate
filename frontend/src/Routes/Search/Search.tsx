import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import { customAxios } from "../../function/customAxios";
import HouseOfferingComponent from "../HouseOffering/HouseOfferingComponent";
import { HouseOfferingType } from "../HouseOffering/HouseOfferingList";

function Search() {
  const { address } = useParams();
  const [houseOfferings, setHouseOfferings] = useState<HouseOfferingType[]>([]);
  const [searchAddress, setSearchAddress] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
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
    <div className="w-full">
      <div className="flex flex-col w-full items-center justify-center pb-10">
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
          <HouseOfferingComponent
            key={houseOffering.id}
            houseOffering={houseOffering}
            setHouseOfferings={setHouseOfferings}
          />;
        })}
        <Footer />
      </div>
    </div>
  );
}

export default Search;
