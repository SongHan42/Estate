import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HouseDetailComponent from "./HouseDetailComponent";
import { HouseEnum, TradeEnum } from "../House/HouseList";
import { customAxios } from "../../function/customAxios";
import PinkButton from "../../Components/PinkButton";
import Footer from "../../Components/Footer";

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

  const [price, setPrice] = useState(0);
  const [toggles, setToggles] = useState([true, true, true, true]);
  const [memo, setMemo] = useState("");
  const navigate = useNavigate();

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
      });
    }
  }, []);

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

  const onClick = () => {
    if (title === "") {
      return alert("제목을 입력해주세요");
    }
    if (id === "0") {
      customAxios
        .post("house", {
          title,
          type: tradeType,
          area,
          price,
          deposit,
          rent,
          maintenanceFee,
          memo,
          grade: grades,
        })
        .then(() => {
          navigate("/house");
        });
    } else {
      customAxios
        .patch(`house/${id}`, {
          title,
          type: tradeType,
          area,
          price,
          deposit,
          rent,
          maintenanceFee,
          memo,
          grade: grades,
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
      <PinkButton onClick={onClick} text="저장"></PinkButton>
      <div className="w-full">
        <div className="flex flex-row justify-center">
          제목:
          <input className="ml-4" onChange={onChangeTitle} value={title} />
        </div>
        <div className="flex justify-between mt-5">
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
          <div>
            <label> 면적: </label>
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
          <li className="text-xl" onClick={() => onClickToggle(3)}>
            {toggles[3] ? "▼" : "▶"} 메모
          </li>
          {toggles[3] ? (
            <input className="w-full" onChange={onChangeMemo} value={memo} />
          ) : null}
          <li className="text-xl" onClick={() => onClickToggle(0)}>
            {toggles[0] ? "▼" : "▶"} 중요도 상
          </li>
          {toggles[0]
            ? grades.map((grade) => {
                if (grade.rating === 0)
                  return (
                    <HouseDetailComponent
                      key={grade.id}
                      grade={grade}
                      setGrades={setGrades}
                    />
                  );
              })
            : null}
          <li className="text-xl" onClick={() => onClickToggle(1)}>
            {toggles[1] ? "▼" : "▶"} 중요도 중
          </li>
          {toggles[1]
            ? grades.map((grade) => {
                if (grade.rating === 1)
                  return (
                    <HouseDetailComponent
                      key={grade.id}
                      grade={grade}
                      setGrades={setGrades}
                    />
                  );
              })
            : null}
          <li className="text-xl" onClick={() => onClickToggle(2)}>
            ︎{toggles[2] ? "▼" : "▶"} 중요도 하
          </li>
          {toggles[2]
            ? grades.map((grade) => {
                if (grade.rating === 2)
                  return (
                    <HouseDetailComponent
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
