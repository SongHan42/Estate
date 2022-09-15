import React from "react";
import { ImportanceType, RatingEnum } from "./ImportanceList";

type PropsType = {
  importance: ImportanceType;
  index: number;
  setImportances: React.Dispatch<React.SetStateAction<ImportanceType[]>>;
  setDeleteImportanceIds: React.Dispatch<React.SetStateAction<number[]>>;
};

function ImportanceComponent({
  importance,
  index,
  setImportances,
  setDeleteImportanceIds,
}: PropsType) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportances((importances) => {
      importances[index].rating = +e.target.value;
      return [...importances];
    });
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportances((importances) => {
      importances[index].title = e.target.value;
      return [...importances];
    });
  };

  const onClick = () => {
    if (importance.id !== 0) {
      setDeleteImportanceIds((curr) => [...curr, importance.id]);
    }
    setImportances((importances) => {
      importances.splice(index, 1);
      return [...importances];
    });
  };

  return (
    <div className="flex w-full">
      <div className="flex-col w-full text-center">
        <input value={importance.title} onChange={onChangeTitle} />
        <div>
          <label>
            <input
              className="ml-2"
              type="radio"
              name={index + ""}
              checked={importance.rating === RatingEnum.high}
              value={RatingEnum.high}
              onChange={onChange}
            />{" "}
            상
          </label>
          <label>
            <input
              className="ml-2"
              type="radio"
              name={index + ""}
              value={RatingEnum.middle}
              checked={importance.rating === RatingEnum.middle}
              onChange={onChange}
            />{" "}
            중
          </label>
          <label>
            <input
              className="ml-2"
              type="radio"
              name={index + ""}
              value={RatingEnum.low}
              checked={importance.rating === RatingEnum.low}
              onChange={onChange}
            />{" "}
            하
          </label>
        </div>
      </div>
      <button className="w-10" onClick={onClick}>
        <img className="w-5" src="img/minus.png" />
      </button>
    </div>
  );
}

export default ImportanceComponent;
