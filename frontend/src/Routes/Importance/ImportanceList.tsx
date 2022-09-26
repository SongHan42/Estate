import React, { useEffect, useState } from "react";
import ImportanceComponent from "./ImportanceComponent";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../function/customAxios";

export enum RatingEnum {
  high,
  middle,
  low,
}

export type ImportanceType = {
  id: number;
  title: string;
  rating: RatingEnum;
};

function ImportanceList() {
  const [importances, setImportances] = useState<ImportanceType[]>();
  const [deleteImportanceIds, setDeleteImportanceIds] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    customAxios.get("importance").then((res) => {
      setImportances(res.data);
    });
  }, []);

  const onAddClick = () => {
    setImportances((curr) => [
      ...curr,
      {
        id: 0,
        title: "",
        rating: 2,
      },
    ]);
  };

  const onClick = () => {
    deleteImportanceIds.forEach((id) => {
      customAxios.delete(`importance/${id}`);
      // axios.delete(
      //   process.env.REACT_APP_API_URL + "importance/" + id,
      //   getConfig(),
      // );
    });
    customAxios
      .patch(process.env.REACT_APP_API_URL + "importance", {
        importances: importances,
      })
      .then(() => {
        navigate("/house");
      });

    // axios
    //   .patch(
    //     process.env.REACT_APP_API_URL + "importance",
    //     { importances: importances },
    //     getConfig(),
    //   )
    //   .then(() => {
    //     navigate("/house");
    //   });
  };

  return (
    <div className="flex flex-col w-full items-center justify-center pb-10">
      <h1 className="text-3xl">체크리스트 및 중요도 설정</h1>
      {importances
        ? importances.map((importance, index) => {
            return (
              <ImportanceComponent
                key={index}
                importance={importance}
                index={index}
                setImportances={setImportances}
                setDeleteImportanceIds={setDeleteImportanceIds}
              />
            );
          })
        : null}
      <button onClick={onAddClick}>
        <img className="w-5 mt-5" src="img/plus.png" alt="plus" />
      </button>
      <Button style={"fixed bottom-0"} text="저장" onClick={onClick} />
    </div>
  );
}

export default ImportanceList;
