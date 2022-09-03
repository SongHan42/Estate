import React from "react";
import { ImportanceType, RatingEnum } from "./ImportanceList";

type PropsType = {
  importance: ImportanceType;
};

function ImportanceComponent({ importance }: PropsType) {
  console.log(importance);
  return (
    <div className="flex w-full">
      <div className="flex-col w-full text-center">
        <p className="text-center">{importance.title}</p>
        <div>
          <input
            className="ml-2"
            type="radio"
            name="select"
            checked={importance.rating === RatingEnum.high}
          />{" "}
          <label>상</label>
          <input
            className="ml-2"
            type="radio"
            name="select"
            checked={importance.rating === RatingEnum.middle}
          />{" "}
          <label>중</label>
          <input
            className="ml-2"
            type="radio"
            name="select"
            checked={importance.rating === RatingEnum.low}
          />{" "}
          <label>하</label>
        </div>
      </div>
      <button className="w-10">빼기</button>
    </div>
  );
}

export default ImportanceComponent;
