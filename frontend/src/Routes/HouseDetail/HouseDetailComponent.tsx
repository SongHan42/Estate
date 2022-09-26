import React from "react";
import { GradeType } from "./HouseDetail";

type PropsType = {
  grade: GradeType;
  setGrades: React.Dispatch<React.SetStateAction<GradeType[]>>;
};

function HouseDetailComponent({ grade, setGrades }: PropsType) {
  const onClick = (value: number) => {
    setGrades((currGrades) =>
      currGrades.map((currGrade) => {
        if (currGrade.id === grade.id) {
          currGrade.star = value;
        }
        return currGrade;
      }),
    );
  };

  return (
    <div className="text-center">
      <p>{grade.title}</p>
      <span
        className={`inline-block h-12 w-60 relative text-left`}
        style={{ backgroundImage: "url(/img/gray_star.png)" }}
      >
        <span
          className={`inline-block h-12 w-60 z-10 overflow-hidden`}
          style={{
            backgroundImage: "url(/img/blue_star.png)",
            width: grade.star ? 20 * grade.star + "%" : 20 + "%",
          }}
        ></span>
        <div className="absolute inset-0">
          {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, idx) => (
            <button
              key={idx}
              className="w-6 h-12"
              onClick={() => onClick(value)}
            ></button>
          ))}
        </div>
      </span>
    </div>
  );
}

export default HouseDetailComponent;
