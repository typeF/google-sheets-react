import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { fakeData, columns } from "../utils/fakeData";

function MaterialTableAdmin() {
  const [gridData, setGridData] = useState({
    data: fakeData,
    resolve: () => {},
    updatedAt: new Date(),
  });

  useEffect(() => {
    gridData.resolve();
    // console.log("RESOLVE AT:", gridData.updatedAt);
  }, [gridData]);

  const onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      const { data } = gridData;
      const updatedAt = new Date();
      data.push(newData);
      setGridData({ ...gridData, data, resolve, updatedAt });
    });

  const onRowDelete = (oldData) =>
    new Promise((resolve, reject) => {
      const { data } = gridData;
      const updatedAt = new Date();
      const index = data.indexOf(oldData);
      data.splice(index, 1);
      setGridData({ ...gridData, data, resolve, updatedAt });
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      const { data } = gridData;
      const updatedAt = new Date();
      const index = data.indexOf(oldData);
      data[index] = newData;
      setGridData({ ...gridData, data, resolve, updatedAt });
    });

  const { data } = gridData;

  // Columns must be defined within this component, otherwise no worky
  const columns = [
    { title: "ID", field: "id" },
    { title: "Item", field: "item" },
  ];

  return (
    <div className="App">
      <MaterialTable
        title="Admin Table"
        columns={columns}
        data={data}
        editable={{
          isEditable: (rowData) => true,
          isDeletable: (rowData) => true,
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
          onRowDelete: onRowDelete,
        }}
      />
    </div>
  );
}

export default MaterialTableAdmin;
