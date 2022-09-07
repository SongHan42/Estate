import { getConfig } from "../../function/getConfig";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HouseDetailComponent from "./HouseDetailComponent";
import Button from "../../Components/Button";
import { HouseEnum } from "../House/HouseList";
import Header from "../../Components/Header";

export type GradeType = {
  id: number;
  title: string;
  star: number;
  memo: string;
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
  const [tradeType, setTradeType] = useState<HouseEnum>(HouseEnum.DEALING);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "0") {
      // first
      axios
        .get(process.env.REACT_APP_API_URL + "importance", getConfig())
        .then((res) => {
          setGrades(res.data);
        })
        .catch(() => console.log());
    } else {
      // update
      axios
        .get(process.env.REACT_APP_API_URL + "house/" + id, getConfig())
        .then((res) => {
          setTitle(res.data.title);
          setDeposit(res.data.deposit);
          setMaintenanceFee(res.data.maintenanceFee);
          setRent(res.data.rent);
          setArea(res.data.area);
          setPrice(res.data.price);
          setTradeType(res.data.type);
          setGrades(res.data.grade);
        })
        .catch(() => console.log("hi"));
    }
  }, []);

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTradeType(+e.target.value);
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

  const onClick = () => {
    if (title === "") {
      return alert("제목을 입력해주세요");
    }
    if (id === "0") {
      axios
        .post(
          process.env.REACT_APP_API_URL + "house",
          {
            title,
            type: tradeType,
            area,
            price: 0,
            deposit,
            rent,
            maintenanceFee,
            grade: grades,
          },
          getConfig(),
        )
        .then(() => {
          navigate("/house");
        });
    } else {
      axios
        .patch(
          process.env.REACT_APP_API_URL + "house/" + id,
          {
            title,
            type: tradeType,
            area,
            price,
            deposit,
            rent,
            maintenanceFee,
            grade: grades,
          },
          getConfig(),
        )
        .then(() => {
          navigate("/house");
        });
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-row justify-center">
        제목:
        <input className="ml-4" onChange={onChangeTitle} value={title} />
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <label>거래 형식: </label>
          <select onChange={onChangeType} value={tradeType}>
            {["매매", "전세", "월세"].map((type, index) => {
              return (
                <option key={index} value={index}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label> 평수</label>
          <input
            className="w-20"
            type="number"
            onChange={onChangeArea}
            value={area}
          />{" "}
          <label>m^2</label>
        </div>
      </div>
      {tradeType === HouseEnum.DEALING ? (
        <div className="text-center mt-5">
          <p>매매가</p>
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
      <ul className="w-full">
        <li>중요도 상</li>
        {grades.map((grade) => {
          if (grade.rating === 0)
            return (
              <HouseDetailComponent
                key={grade.id}
                grade={grade}
                setGrades={setGrades}
              />
            );
        })}
        <li>중요도 중</li>
        {grades.map((grade) => {
          if (grade.rating === 1)
            return (
              <HouseDetailComponent
                key={grade.id}
                grade={grade}
                setGrades={setGrades}
              />
            );
        })}
        <li>중요도 하</li>
        {grades.map((grade) => {
          if (grade.rating === 2)
            return (
              <HouseDetailComponent
                key={grade.id}
                grade={grade}
                setGrades={setGrades}
              />
            );
        })}
      </ul>
      <Button text="저장" onClick={onClick} />
    </div>
  );
}

export default HouseDetail;
