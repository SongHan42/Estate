import React, { useEffect, useState } from "react";
import ImportanceComponent from "./ImportanceComponent";
import axios from "axios";
import { getConfig } from "../../function/getConfig";

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
        setImportances(res.data.importance);
      });
  }, []);
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-3xl">중요도 선택</h1>
      {importances
        ? importances.map((importance) => {
            <ImportanceComponent importance={importance} />;
          })
        : null}
      <ImportanceComponent importance={{ id: 1, title: "hi", rating: 0 }} />
    </div>
  );
}

export default ImportanceList;
