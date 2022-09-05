import React from "react";
import { ImportanceType, RatingEnum } from "./ImportanceList";

type PropsType = {
  importance: ImportanceType;
  setImportances: React.Dispatch<React.SetStateAction<ImportanceType[]>>;
};

function ImportanceComponent({ importance, setImportances }: PropsType) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportances((importances) => {
      return importances.map((temp) => {
        if (temp.id === importance.id) {
          temp.rating = +e.target.value;
        }
        return temp;
      });
    });
  };

  const onClick = () => {
    setImportances((importances) => {
      return importances.filter((temp) => temp.id !== importance.id);
    });
  };

  return (
    <div className="flex w-full">
      <div className="flex-col w-full text-center">
        <p className="text-center">{importance.title}</p>
        <div>
          <label>
            <input
              className="ml-2"
              type="radio"
              name={importance.id + ""}
              defaultChecked={importance.rating === RatingEnum.high}
              value={RatingEnum.high}
              onChange={onChange}
            />{" "}
            상
          </label>
          <label>
            <input
              className="ml-2"
              type="radio"
              name={importance.id + ""}
              value={RatingEnum.middle}
              defaultChecked={importance.rating === RatingEnum.middle}
              onChange={onChange}
            />{" "}
            중
          </label>
          <label>
            <input
              className="ml-2"
              type="radio"
              name={importance.id + ""}
              value={RatingEnum.low}
              defaultChecked={importance.rating === RatingEnum.low}
              onChange={onChange}
            />{" "}
            하
          </label>
        </div>
      </div>
      <button className="w-10" onClick={onClick}>
        빼기
      </button>
    </div>
  );
}

export default ImportanceComponent;
