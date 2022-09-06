import React from "react";
import { GradeType } from "./HouseDetail";

type PropsType = {
  grade: GradeType;
  setGrades: React.Dispatch<React.SetStateAction<GradeType[]>>;
};

function HouseDetailComponent({ grade, setGrades }: PropsType) {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrades((currGrades) =>
      currGrades.map((currGrade) => {
        if (currGrade.id === grade.id) {
          currGrade.star = +e.target.value;
        }
        return currGrade;
      }),
    );
  };
  return (
    <div>
      <p>{grade.title}</p>
      <select onChange={onChange}>
        {[1, 2, 3, 4, 5].map((idx) => (
          <option key={idx} value={idx}>
            {idx}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HouseDetailComponent;
