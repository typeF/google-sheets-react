import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { addRowToSheets, updateRow, deleteRow } from "../lib/googleSheets";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const MaterialTableAdmin = ({ sheetData }) => {
  const [gridData, setGridData] = useState({
    data: sheetData,
    resolve: () => {},
    updatedAt: new Date(),
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  useEffect(() => {
    gridData.resolve();
  }, [gridData]);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFail(false);
  };

  const onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      // TODO: Provide feedback depending on success/fail of async
      addRowToSheets(newData, { success: setOpenSuccess, error: setOpenFail });
      const { data } = gridData;
      const updatedAt = new Date();
      data.push(newData);
      setGridData({ ...gridData, resolve, updatedAt });
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      updateRow(newData, { success: setOpenSuccess, error: setOpenFail });
      const { data } = gridData;
      const updatedAt = new Date();
      const index = data.indexOf(oldData);
      data[index] = newData;
      setGridData({ ...gridData, data, resolve, updatedAt });
    });

  const onRowDelete = (oldData) =>
    new Promise((resolve, reject) => {
      deleteRow(oldData, { success: setOpenSuccess, error: setOpenFail });
      const { data } = gridData;
      const updatedAt = new Date();
      const index = data.indexOf(oldData);
      data.splice(index, 1);
      setGridData({ ...gridData, data, resolve, updatedAt });
    });

  const authorizeApp = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const deAuthorizeApp = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const logOut = () => {
    window.location = `/api/logout`;
  };

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
      type: "numeric",
    },
    {
      title: "RMA #",
      field: "rma",
      cellStyle: {
        textAlign: "center",
      },
      type: "numeric",
    },
    {
      title: "✓",
      field: "done",
      cellStyle: {
        textAlign: "center",
      },
      emptyValue: "false",
      defaultFilter: "false",
      initialEditValue: "false",
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
      type: "date",
    },
    {
      title: "Completed",
      field: "completed",
      cellStyle: {
        textAlign: "center",
      },
      type: "date",
    },
    { title: "Part", field: "part", cellStyle: { textAlign: "center" } },
    {
      title: "QTY",
      field: "qty",
      cellStyle: { textAlign: "center" },
      type: "numeric",
    },
    { title: "Note", field: "note", cellStyle: { textAlign: "center" } },
  ];

  /* eslint-disable no-undef */
  return (
    <div className="App">
      <MaterialTable
        title="Admin"
        columns={columns}
        data={data}
        actions={[
          {
            icon: "vpn_key_outlined",
            tooltip: "Authorize App",
            isFreeAction: true,
            onClick: () => {
              authorizeApp();
            },
          },
          {
            icon: "lockopen",
            tooltip: "De-Authorize App from Write",
            isFreeAction: true,
            onClick: () => {
              deAuthorizeApp();
            },
          },
          {
            icon: "exit_to_app",
            tooltip: "Log out",
            isFreeAction: true,
            onClick: () => {
              logOut();
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
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
        editable={{
          isEditable: (rowData) => true,
          isDeletable: (rowData) => true,
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
          onRowDelete: onRowDelete,
        }}
      />
      <Snackbar
        open={openSuccess}
        onClose={handleClose}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Successfully updated Google sheet!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFail}
        onClose={handleClose}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Error connecting to Google sheet!
        </Alert>
      </Snackbar>
      <style jsx>{`
        .Checkbox.disabled {
          margin-right: 69px;
          color: rgba(3, 28, 252, 0.8);
        }
      `}</style>
    </div>
  );
};

export default MaterialTableAdmin;
