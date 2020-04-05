import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Checkbox from "@material-ui/core/Checkbox";

const MaterialTableViewOnly = ({ sheetData }) => {
  const [gridData, setGridData] = useState({
    data: sheetData,
    resolve: () => {},
    updatedAt: new Date(),
  });

  useEffect(() => {
    gridData.resolve();
  }, [gridData]);

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
        title="View-only"
        columns={columns}
        data={data}
        options={{
          exportButton: true,
          exportFileName: `RMA Sheet - ${new Date().toDateString()}`,
          filtering: true,
          grouping: true,
          headerStyle: {
            backgroundColor: "rgba(254, 125, 26)",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          },
          rowStyle: {
            textAlign: "right",
          },
          pageSize: 25,
          pageSizeOptions: [25, 50],
        }}
      />
      <style jsx>{`
        .Checkbox.disabled {
          margin-right: 69px;
          color: rgba(3, 28, 252, 0.8);
        }
      `}</style>
    </div>
  );
};

export default MaterialTableViewOnly;
