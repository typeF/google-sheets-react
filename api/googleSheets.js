import {
  CLIENT_ID,
  GS_API_KEY,
  GS_SPREADSHEET_ID,
  DISCOVERY_DOCS,
  SCOPES,
} from "./config";

/* eslint-disable no-undef */
export const addRowToSheets = (newData) => {
  if (Object.keys(newData).length < 1) {
    return;
  }
  gapi.client.sheets.spreadsheets.values
    .append({
      spreadsheetId: "1Kvxwr_BHB50MVmlbfjeT1vGgIoGSVX1uiNdnB4IJnTk",
      // spreadsheetId: GS_SPREADSHEET_ID,
      range: "RMA list",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: buildAppendValueArray(newData),
      },
    })
    .then(
      (res) => {
        return res.status;
      },
      (err) => {
        console.error(err);
      }
    );
};

const buildAppendValueArray = (newData) => {
  const { so, rma, done, received, completed, part, qty, note } = newData;
  const array = [
    [
      so ? so : "",
      rma ? rma : "",
      done ? done : "",
      received ? received : "",
      completed ? completed : "",
      part ? part : "",
      qty ? qty : "",
      note ? note : "",
    ],
  ];
  return array;
};

export const updateRow = (newData) => {
  const { row } = newData;
  gapi.client.sheets.spreadsheets.values
    .update({
      spreadsheetId: "1Kvxwr_BHB50MVmlbfjeT1vGgIoGSVX1uiNdnB4IJnTk",
      valueInputOption: "USER_ENTERED",
      range: `A${row}:H${row}`,
      resource: {
        values: buildAppendValueArray(newData),
      },
    })
    .then(
      (response) => {
        console.log(response.result);
      },
      (reason) => {
        console.error(`Error: ${reason.result.error.message}`);
      }
    );
};

export const deleteRow = (oldData) => {
  const { row } = oldData;
  console.log(row);
  gapi.client.sheets.spreadsheets
    .batchUpdate(
      {
        spreadsheetId: "1Kvxwr_BHB50MVmlbfjeT1vGgIoGSVX1uiNdnB4IJnTk",
      },
      {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: "1386834576", // #gid=sheetId
                dimension: "ROWS",
                startIndex: row - 1,
                endIndex: row,
              },
            },
          },
        ],
      }
    )
    .then(
      (response) => {
        console.log(response.result);
      },
      (reason) => {
        console.error(`Error deleting row: ${reason.result.error.message}`);
      }
    );
};

export const handleClientLoad = () => {
  gapi.load("client:auth2", initClient);
};

function initClient() {
  gapi.client
    .init({
      apiKey: GS_API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        // Listen for sign-in state changes.
        // gapi.auth2
        //   .getAuthInstance()
        //   .isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      function (error) {
        console.error(error);
        // setMsg(JSON.stringify(error, null, 2));
      }
    );
}
