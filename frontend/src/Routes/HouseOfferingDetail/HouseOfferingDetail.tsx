import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import { customAxios } from "../../function/customAxios";
import { HouseEnum, TradeEnum } from "../House/HouseList";
import PinkButton from "../../Components/PinkButton";
import Post from "./PostComponent";
import ImgButton from "../../Components/ImgButton";

function HouseOfferingDetail() {
  const { id } = useParams();

  const [imgUrl, setImgUrl] = useState("/img/gray_box.png");
  const [imgFile, setImgFile] = useState<File>();

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
    if (id !== "0") {
      customAxios.get(`house/offering/${id}`).then((res) => {
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
        if (res.data.img)
          setImgUrl(process.env.REACT_APP_API_URL + res.data.img);
      });
    }
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
    if (address === "") return alert("????????? ???????????????");
    else if (tradeType === null) return alert("?????? ????????? ???????????????");

    const formData = new FormData();
    if (imgFile) formData.append("img", imgFile);
    const data = JSON.stringify({
      title,
      tradeType,
      area,
      price,
      deposit,
      rent,
      maintenanceFee,
      discription,
      address,
      addressDetail,
      houseType,
    });
    formData.append("data", data);
    if (id === "0") {
      customAxios
        .post("house/offering", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          alert("?????? ?????? ??????");
          navigate("/house/offering");
        });
    } else {
      customAxios
        .patch(`house/offering/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          alert("?????? ?????? ??????");
          navigate("/house/offering");
        });
    }
  };

  return (
    <div>
      <PinkButton onClick={onClick} text="??????"></PinkButton>
      <div className="w-full">
        <div className="flex flex-row justify-center">
          <ImgButton
            imgUrl={imgUrl}
            setImgFile={setImgFile}
            setImgUrl={setImgUrl}
          />
        </div>
        ??????:
        <input className="ml-4" onChange={onChangeTitle} value={title} />
        <div className="justify-between mt-5">
          ??????:
          <input
            className="user_enroll_text"
            type="text"
            required={true}
            name="address"
            onChange={handleInput}
            value={address}
            onClick={handleComplete}
          />
          {popup && (
            <Post company={enroll_company} setcompany={setEnroll_company} />
          )}
          <div>
            <div>
              ????????????:
              <input
                type="text"
                onChange={onChangeAddressDetail}
                value={addressDetail}
              />
            </div>
            <label> ??????: </label>
            <input
              className="w-20"
              type="number"
              onChange={onChangeArea}
              value={area}
            />
            <label>m^2</label>
            <div>
              <label>?????? ??????: </label>
              <select onChange={onChangeTradeType} value={tradeType}>
                {["??????", "??????", "??????"].map((tradeType, index) => {
                  return (
                    <option key={index} value={index}>
                      {tradeType}
                    </option>
                  );
                })}
              </select>
              <label>?????? ??????: </label>
              <select onChange={onChangeHouseType} value={houseType}>
                {["?????????", "????????????", "??????", "??????", "??????"].map(
                  (houseType, index) => {
                    return (
                      <option key={index} value={index}>
                        {houseType}
                      </option>
                    );
                  },
                )}
              </select>
            </div>
          </div>
        </div>
        {tradeType === TradeEnum.DEALING ? (
          <div className="">
            <label> ?????????: </label>
            <input
              className="w-20"
              type="number"
              onChange={onChangePrice}
              value={price}
            />
            <label>?????? </label>
          </div>
        ) : (
          <>
            <div className="flex justify-between mt-5">
              <div className="text-center">
                <p>?????????(??????)</p>
                <input
                  className="w-20"
                  type="number"
                  onChange={onChangeDeposit}
                  value={deposit}
                />
              </div>
              <div className="text-center">
                <p>??????(??????)</p>
                <input
                  className="w-20"
                  type="number"
                  onChange={onChangeRent}
                  value={rent}
                />
              </div>
              <div className="text-center">
                <p>?????????(??????)</p>
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
        <label>?????? ??????: </label>
        <input onChange={onChangeDiscription} value={discription} />
        <Footer />
      </div>
    </div>
  );
}

export default HouseOfferingDetail;
