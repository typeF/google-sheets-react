import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Checkbox from "@material-ui/core/Checkbox";
import { addRowToSheets, updateRow, deleteRow } from "../api/googleSheets";

const MaterialTableAdmin = ({ sheetData }) => {
  const [gridData, setGridData] = useState({
    // data: fakeData,
    data: sheetData,
    resolve: () => {},
    updatedAt: new Date(),
  });

  useEffect(() => {
    gridData.resolve();
  }, [gridData]);

  const onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      // TODO: Provide feedback depending on success/fail of async
      addRowToSheets(newData);
      const { data } = gridData;
      const updatedAt = new Date();
      data.push(newData);
      setGridData({ ...gridData, resolve, updatedAt });
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      updateRow(newData);
      const { data } = gridData;
      const updatedAt = new Date();
      const index = data.indexOf(oldData);
      data[index] = newData;
      setGridData({ ...gridData, data, resolve, updatedAt });
    });

  const onRowDelete = (oldData) =>
    new Promise((resolve, reject) => {
      deleteRow(oldData);
      const { data } = gridData;
      const updatedAt = new Date();
      const index = data.indexOf(oldData);
      data.splice(index, 1);
      setGridData({ ...gridData, data, resolve, updatedAt });
    });

  const { data } = gridData;

  // Columns must be defined within this component, otherwise no worky
  const columns = [
    {
      title: "Row",
      field: "row",
      cellStyle: {
        textAlign: "center",
      },
      hidden: true,
      searchable: false,
    },
    {
      title: "SO #",
      field: "so",
      cellStyle: {
        width: 200,
        textAlign: "center",
      },
    },
    {
      title: "RMA #",
      field: "rma",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "✓",
      field: "done",
      cellStyle: {
        textAlign: "center",
      },
      defaultFilter: "false",
      /* eslint-disable react/display-name */
      render: (rowData) => (
        <Checkbox
          classes={{ root: "Checkbox", disabled: "disabled" }}
          color="primary"
          // disabled={true}
          checked={rowData.done === "TRUE"}
          inputProps={{ "aria-label": "Checkbox" }}
        />
      ),
    },
    {
      title: "Received",
      field: "received",
      defaultSort: "desc",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Completed",
      field: "completed",
      cellStyle: {
        textAlign: "center",
      },
    },
    { title: "Part", field: "part", cellStyle: { textAlign: "center" } },
    { title: "QTY", field: "qty", cellStyle: { textAlign: "center" } },
    { title: "Note", field: "note", cellStyle: { textAlign: "center" } },
  ];

  /* eslint-disable no-undef */
  return (
    <div className="App">
      <MaterialTable
        title="RMA List - Admin"
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          exportFileName: `RMA Sheet - ${new Date().toDateString()}`,
          filtering: true,
          grouping: true,
          headerStyle: {
            // backgroundColor: "#031CFC",
            right: "10",
            backgroundColor: "rgba(3,28,252,0.8)",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          },
          rowStyle: {
            textAlign: "right",
          },
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
        }}
        editable={{
          isEditable: (rowData) => true,
          isDeletable: (rowData) => true,
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
          onRowDelete: onRowDelete,
        }}
      />
      <style jsx>{`
        .MuiCheckbox-colorPrimary.Mui-disabled {
          margin-right: 69px;
          color: rgba(3, 28, 252, 0.8);
        }
      `}</style>
    </div>
  );
};

export default MaterialTableAdmin;
