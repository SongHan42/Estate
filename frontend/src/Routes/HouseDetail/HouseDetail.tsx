import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EvaluationComponent from "./EvaluationComponent";
import { HouseEnum, TradeEnum } from "../House/HouseList";
import { customAxios } from "../../function/customAxios";
import PinkButton from "../../Components/PinkButton";
import Footer from "../../Components/Footer";
import ImgButton from "../../Components/ImgButton";
import Post from "../HouseOfferingDetail/PostComponent";

export type GradeType = {
  id: number;
  title: string;
  star: number;
  rating: number;
};

function HouseDetail() {
  const { id } = useParams();
  const [grades, setGrades] = useState<GradeType[]>([]);
  const [title, setTitle] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);
  const [maintenanceFee, setMaintenanceFee] = useState(0);
  const [area, setArea] = useState(0);
  const [tradeType, setTradeType] = useState<TradeEnum>(TradeEnum.DEALING);
  const [houseType, setHouseType] = useState<HouseEnum>(HouseEnum.APT);

  const [imgUrl, setImgUrl] = useState("/img/gray_box.png");
  const [imgFile, setImgFile] = useState<File>();

  const [price, setPrice] = useState(0);
  const [toggles, setToggles] = useState([true, true, true, true]);
  const [memo, setMemo] = useState("");
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [popup, setPopup] = useState<boolean>(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

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
    if (id === "0") {
      // first
      customAxios.get("importance").then((res) => {
        setGrades(res.data);
      });
    } else {
      // update
      customAxios.get(`house/${id}`).then((res) => {
        setTitle(res.data.title);
        setDeposit(res.data.deposit);
        setMaintenanceFee(res.data.maintenanceFee);
        setRent(res.data.rent);
        setArea(res.data.area);
        setPrice(res.data.price);
        setTradeType(res.data.type);
        setGrades(res.data.grade);
        setMemo(res.data.memo);
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

  const onChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArea(+e.target.value);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+e.target.value);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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

  const onChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const onChangeAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const onClick = () => {
    if (title === "") {
      return alert("????????? ??????????????????");
    }
    const formData = new FormData();

    if (imgFile) formData.append("img", imgFile);
    const data = JSON.stringify({
      title,
      tradeType,
      houseType,
      area,
      price,
      deposit,
      rent,
      maintenanceFee,
      memo,
      grade: grades,
    });
    formData.append("data", data);
    if (id === "0") {
      customAxios
        .post("house", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          navigate("/house");
        });
    } else {
      customAxios
        .patch(`house/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          navigate("/house");
        });
    }
  };

  const onClickToggle = (idx: number) => {
    setToggles((toggle) => {
      toggle[idx] = !toggle[idx];
      return [...toggle];
    });
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
        <div className="mt-5">
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
            <label>?????? ??????: </label>
            <select onChange={onChangeTradeType} value={tradeType}>
              {["??????", "??????", "??????"].map((tradetype, index) => {
                return (
                  <option key={index} value={index}>
                    {tradetype}
                  </option>
                );
              })}
            </select>
            <label>?????? ??????: </label>
            <select onChange={onChangeHouseType} value={houseType}>
              {["?????????", "????????????", "??????", "??????", "??????"].map(
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
          <div>
            <label> ??????: </label>
            <input
              className="w-20"
              type="number"
              onChange={onChangeArea}
              value={area}
            />{" "}
            <label>m^2</label>
          </div>
        </div>
        {tradeType === TradeEnum.DEALING ? (
          <div className="mb-5">
            <p>?????????</p>
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
        <ul className="w-full">
          <li className="text-xl" onClick={() => onClickToggle(3)}>
            {toggles[3] ? "???" : "???"} ??????
          </li>
          {toggles[3] ? (
            <input className="w-full" onChange={onChangeMemo} value={memo} />
          ) : null}
          <li className="text-xl" onClick={() => onClickToggle(0)}>
            {toggles[0] ? "???" : "???"} ????????? ???
          </li>
          {toggles[0]
            ? grades.map((grade) => {
                if (grade.rating === 0)
                  return (
                    <EvaluationComponent
                      key={grade.id}
                      grade={grade}
                      setGrades={setGrades}
                    />
                  );
              })
            : null}
          <li className="text-xl" onClick={() => onClickToggle(1)}>
            {toggles[1] ? "???" : "???"} ????????? ???
          </li>
          {toggles[1]
            ? grades.map((grade) => {
                if (grade.rating === 1)
                  return (
                    <EvaluationComponent
                      key={grade.id}
                      grade={grade}
                      setGrades={setGrades}
                    />
                  );
              })
            : null}
          <li className="text-xl" onClick={() => onClickToggle(2)}>
            ???{toggles[2] ? "???" : "???"} ????????? ???
          </li>
          {toggles[2]
            ? grades.map((grade) => {
                if (grade.rating === 2)
                  return (
                    <EvaluationComponent
                      key={grade.id}
                      grade={grade}
                      setGrades={setGrades}
                    />
                  );
              })
            : null}
        </ul>
        <Footer />
      </div>
    </div>
  );
}

export default HouseDetail;
