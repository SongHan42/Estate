import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import { customAxios } from "../../function/customAxios";
import { HouseEnum, TradeEnum } from "../House/HouseList";
import PinkButton from "../../Components/PinkButton";
import Post from "./PostComponent";

function HouseOfferingDetail() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);
  const [maintenanceFee, setMaintenanceFee] = useState(0);
  const [area, setArea] = useState(0);
  const [tradeType, setTradeType] = useState<TradeEnum>(TradeEnum.DEALING);
  const [price, setPrice] = useState(0);
  const [discription, setDiscription] = useState("");
  const [houseType, setHouseType] = useState<HouseEnum>(HouseEnum.APT);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [popup, setPopup] = useState<boolean>(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    // update
    customAxios.get(`house/${id}`).then((res) => {
      setTitle(res.data.title);
      setDeposit(res.data.deposit);
      setMaintenanceFee(res.data.maintenanceFee);
      setRent(res.data.rent);
      setArea(res.data.area);
      setPrice(res.data.price);
      setTradeType(res.data.type);
      setDiscription(res.data.discription);
      setAddressDetail(res.data.addressDetail);
      setAddress(res.data.address);
    });
  }, []);

  useEffect(() => {
    setAddress(enroll_company.address);
  }, [enroll_company]);

  const onChangeTradeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTradeType(+e.target.value);
  };

  const onChangeHouseType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHouseType(+e.target.value);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+e.target.value);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArea(+e.target.value);
  };

  const onChangeDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(+e.target.value);
  };

  const onChangeRent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRent(+e.target.value);
  };

  const onChangeMaintenanceFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaintenanceFee(+e.target.value);
  };

  const onChangeDiscription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscription(e.target.value);
  };

  const onChangeAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const onClick = () => {
    if (address === "") return alert("주소를 입력하세요");
    else if (tradeType === null) return alert("거래 형식을 설정하세요");
    if (id === "0") {
      customAxios
        .post("house/offering", {
          title,
          tradeType: tradeType,
          area,
          price,
          deposit,
          rent,
          maintenanceFee,
          discription,
          address,
          addressDetail,
          housetype: houseType,
        })
        .then(() => {
          navigate("/house/offering");
        });
    } else {
      customAxios
        .patch(`house/offering/${id}`, {
          title,
          tradeType: tradeType,
          area,
          price,
          deposit,
          rent,
          maintenanceFee,
          discription,
          address,
          addressDetail,
          housetype: houseType,
        })
        .then(() => {
          navigate("/house/offering");
        });
    }
  };

  return (
    <div className="w-full">
      <PinkButton onClick={onClick} text="저장"></PinkButton>
      <div className="flex flex-row justify-center">
        제목:
        <input className="ml-4" onChange={onChangeTitle} value={title} />
      </div>
      <div className="justify-between mt-5">
        주소:
        <input
          className="user_enroll_text"
          type="text"
          required={true}
          name="address"
          onChange={handleInput}
          value={enroll_company.address}
          onClick={handleComplete}
        />
        {popup && (
          <Post company={enroll_company} setcompany={setEnroll_company} />
        )}
        <div>
          상세주소:
          <input
            type="text"
            onChange={onChangeAddressDetail}
            value={addressDetail}
          />
        </div>
        <div>
          <label>거래 형식: </label>
          <select onChange={onChangeTradeType} value={tradeType}>
            {["매매", "전세", "월세"].map((tradetype, index) => {
              return (
                <option key={index} value={index}>
                  {tradetype}
                </option>
              );
            })}
          </select>
          <label>주거 형식: </label>
          <select onChange={onChangeHouseType} value={houseType}>
            {["아파트", "오피스텔", "빌라", "주택", "기타"].map(
              (housetype, index) => {
                return (
                  <option key={index} value={index}>
                    {housetype}
                  </option>
                );
              },
            )}
          </select>
        </div>
        <label> 면적: </label>
        <input
          className="w-20"
          type="number"
          onChange={onChangeArea}
          value={area}
        />
        <label>m^2</label>
      </div>
      {tradeType === TradeEnum.DEALING ? (
        <div className="">
          <label> 매매가: </label>
          <input
            className="w-20"
            type="number"
            onChange={onChangePrice}
            value={price}
          />
          <label>만원 </label>
        </div>
      ) : (
        <>
          <div className="flex justify-between mt-5">
            <div className="text-center">
              <p>보증금(만원)</p>
              <input
                className="w-20"
                type="number"
                onChange={onChangeDeposit}
                value={deposit}
              />
            </div>
            <div className="text-center">
              <p>월세(만원)</p>
              <input
                className="w-20"
                type="number"
                onChange={onChangeRent}
                value={rent}
              />
            </div>
            <div className="text-center">
              <p>관리비(만원)</p>
              <input
                className="w-20"
                type="number"
                onChange={onChangeMaintenanceFee}
                value={maintenanceFee}
              />
            </div>
          </div>
        </>
      )}
      <label>상세 설명: </label>
      <input onChange={onChangeDiscription} value={discription} />
      <Footer />
    </div>
  );
}

export default HouseOfferingDetail;
