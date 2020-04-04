import { CLIENT_ID, GS_API_KEY, DISCOVERY_DOCS, SCOPES } from "./config";

export const loadSpreadSheet = ({ setMsg }) => {
  gapi.client.sheets.spreadsheets.values
    .get({
      // spreadsheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      spreadsheetId: process.env.SPREADSHEET_ID,
      // range: "Class Data!A2:E",
      range: "A1:E5",
    })
    .then(
      (res) => {
        const range = res.result;
        if (range.values.length > 0) {
          console.log(range);
          setMsg(range.values[2]);
          // for (i = 0; i < range.values.length; i++) {
          //   var row = range.values[i];
          //   // Print columns A and E, which correspond to indices 0 and 4.
          //   appendPre(row[0] + ", " + row[4]);
          // }
        } else {
          setMsg(`No data found`);
        }
      },
      (res) => {
        console.error(`Error: ${res.result.error.message}`);
        setMsg(`Error: ${res.result.error.message}`);
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
