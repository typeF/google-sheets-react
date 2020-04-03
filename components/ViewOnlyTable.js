import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { fakeData } from "../utils/fakeData";

function MaterialTableViewOnly() {
  const [gridData, setGridData] = useState({
    data: fakeData,
    resolve: () => {},
    updatedAt: new Date(),
  });

  useEffect(() => {
    gridData.resolve();
    // console.log("RESOLVE AT:", gridData.updatedAt);
  }, [gridData]);

  const { data } = gridData;

  // Columns must be defined within this component, otherwise no worky
  const columns = [
    { title: "ID", field: "id" },
    { title: "Item", field: "item" },
  ];

  return (
    <div className="App">
      <MaterialTable title="View only table" columns={columns} data={data} />
    </div>
  );
}

export default MaterialTableViewOnly;
