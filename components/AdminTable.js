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
    { title: "SO #", field: "so" },
    { title: "RMA #", field: "rma" },
    { title: "✓", field: "done" },
    { title: "Received", field: "received", defaultSort: "desc" },
    { title: "Completed", field: "completed" },
    { title: "Part", field: "part" },
    { title: "QTY", field: "qty" },
    { title: "Note", field: "note" },
  ];

  return (
    <div className="App">
      <MaterialTable
        title="Admin Table"
        columns={columns}
        data={data}
        options={{ exportButton: true, grouping: true, actionsColumnIndex: -1 }}
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
