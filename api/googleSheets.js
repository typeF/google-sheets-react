import {
  CLIENT_ID,
  GS_API_KEY,
  GS_SPREADSHEET_ID,
  DISCOVERY_DOCS,
  SCOPES,
} from "./config";

/* eslint-disable no-undef */
export const addRowToSheets = (newData) => {
  // TODO: Make sure object.keys();
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
