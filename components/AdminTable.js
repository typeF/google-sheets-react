import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { fakeData } from "../utils/fakeData";
import { formatData, getTotalCount } from "../utils/formatData";

const MaterialTableAdmin = ({ sheetData }) => {
  const [gridData, setGridData] = useState({
    // data: fakeData,
    data: sheetData,
    resolve: () => {},
    updatedAt: new Date(),
  });

  // const loadSpreadSheet = () => {
  //   gapi.client.sheets.spreadsheets.values
  //     .get({
  //       // spreadsheetId: "1zAe53lK06l2Pg4gUr1qsUwZo1LFkmmko-nq-OH53Iv4",
  //       spreadsheetId: "1Kvxwr_BHB50MVmlbfjeT1vGgIoGSVX1uiNdnB4IJnTk",
  //       range: "RMA list",
  //     })
  //     .then(
  //       function (response) {
  //         const range = response.result;
  //         if (range.values.length > 0) {
  //           console.log(range);
  //           // setMsg(range.values[2]);
  //           setHaha(range);
  //         } else {
  //           console.error(`No data found`);
  //         }
  //       },
  //       function (response) {
  //         console.error(`Error: ${response.result.error.message}`);
  //       }
  //     );
  // };

  useEffect(() => {
    // loadSpreadSheet();
    gridData.resolve();
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

  // const data = haha.values;

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

  /* eslint-disable no-undef */
  return (
    <div className="App">
      <MaterialTable
        title="Admin Table"
        columns={columns}
        data={data}
        // data={(query) =>
        //   new Promise((resolve, reject) => {
        //     gapi.client.sheets.spreadsheets.values
        //       .get({
        //         spreadsheetId: "1Kvxwr_BHB50MVmlbfjeT1vGgIoGSVX1uiNdnB4IJnTk",
        //         range: "RMA list",
        //       })
        //       .then(
        //         function (response) {
        //           const range = response.result;
        //           if (range.values.length > 0) {
        //             console.log(range);
        //             // setMsg(range.values[2]);
        //             // setHaha(range);
        //             resolve({
        //               data: formatData(range.values),
        //               page: 0,
        //               totalCount: getTotalCount(range.values),
        //             });
        //           } else {
        //             console.error(`No data found`);
        //           }
        //         },
        //         function (response) {
        //           console.error(`Error: ${response.result.error.message}`);
        //         }
        //       );
        //   })
        // }
        options={{
          exportButton: true,
          exportFileName: `RMA Sheet - ${new Date().toDateString()}`,
          grouping: true,
          actionsColumnIndex: -1,
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
    </div>
  );
};

export default MaterialTableAdmin;
