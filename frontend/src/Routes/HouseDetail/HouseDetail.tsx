import { getConfig } from "../../function/getConfig";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HouseDetailComponent from "./HouseDetailComponent";
import Button from "../../Components/Button";

// export type HouseType = {
//   id: number;
//   title: string;
//   price: number;
//   deposit: number;
//   rent: number;
//   maintenanceFee: number;
// };

export type GradeType = {
  id: number;
  title: string;
  star: number;
  memo: string;
  rating: number;
};

function HouseDetail() {
  const { id } = useParams();
  const [grades, setGrades] = useState<GradeType[]>(() => {
    return [];
  });
  const [title, setTitle] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);
  const [maintenanceFee, setMaintenanceFee] = useState(0);
  const [area, setArea] = useState(0);
  // const [house, setHouse] = useState<HouseType>({
  //   id: 0,
  //   title: "",
  //   price: 0,
  //   deposit: 0,
  //   rent: 0,
  //   maintenanceFee: 0,
  // });

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
          console.log(res.data);

          setTitle(res.data.title);
          setDeposit(res.data.deposit);
          setMaintenanceFee(res.data.maintenanceFee);
          setRent(res.data.rent);
        })
        .catch(() => console.log("hi"));
    }
  }, []);

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
    if (id === "0") {
      axios.post(
        process.env.REACT_APP_API_URL + "house",
        {
          title,
          type: 0,
          area,
          price: 0,
          deposit,
          rent,
          maintenanceFee,
          grade: grades,
        },
        getConfig(),
      );
    } else {
      axios.patch;
    }
    console.log(grades);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-center">
        제목:
        <input className="ml-4" onChange={onChangeTitle} value={title} />
      </div>
      <div className="flex">
        <div>
          <label>보증금(만원)</label>
          <input size={10} onChange={onChangeDeposit} value={deposit} />
        </div>
        <div>
          <label>월세(만원)</label>
          <input size={10} onChange={onChangeRent} value={rent} />
        </div>
        <div>
          <label>관리비(만원)</label>
          <input
            size={10}
            onChange={onChangeMaintenanceFee}
            value={maintenanceFee}
          />
        </div>
      </div>
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
