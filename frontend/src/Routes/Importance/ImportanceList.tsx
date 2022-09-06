import React, { useEffect, useState } from "react";
import ImportanceComponent from "./ImportanceComponent";
import axios from "axios";
import { getConfig } from "../../function/getConfig";
import Button from "../../Components/Button";

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
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "importance", getConfig())
      .then((res) => {
        setImportances(res.data);
      });
  }, []);

  const onClick = () => {
    axios.patch(
      process.env.REACT_APP_API_URL + "importance",
      { importances: importances },
      getConfig(),
    );
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-3xl">중요도 선택</h1>
      {importances
        ? importances.map((importance, idx) => {
            return (
              <ImportanceComponent
                key={idx}
                importance={importance}
                setImportances={setImportances}
              />
            );
          })
        : null}
      <Button text="제출" onClick={onClick} />
    </div>
  );
}

export default ImportanceList;
