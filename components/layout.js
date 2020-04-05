import Head from "next/head";
import { useState, useEffect } from "react";
import { formatData } from "../utils/formatData";
import { UserProvider } from "../lib/user";
import {
  CLIENT_ID,
  GS_API_KEY,
  DISCOVERY_DOCS,
  SCOPES_WRITE,
  GS_SPREADSHEET_ID,
} from "../api/config";

/* eslint-disable */
export default ({
  children,
  title = "Spreadsheet",
  setSheetsLoaded,
  setSheetData,
  user,
  loading = false,
}) => {
  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  function initClient() {
    gapi.client
      .init({
        apiKey: GS_API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES_WRITE,
      })
      .then(
        () => {
          setSheetsLoaded(true);
          // Listen for sign-in state changes.
          // gapi.auth2
          //   .getAuthInstance()
          //   .isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          loadSpreadSheet();
          // setSheetData({ a: 1 });
        },
        (error) => {
          console.error(error);
          // setMsg(JSON.stringify(error, null, 2));
        }
      );
  }

  const loadSpreadSheet = () => {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: GS_SPREADSHEET_ID,
        range: "RMA list",
      })
      .then(
        function (response) {
          const range = response.result;
          if (range.values.length > 0) {
            // console.log(range);
            setSheetData(formatData(range.values));
          } else {
            console.error(`No data found`);
          }
        },
        function (response) {
          console.error(`Error: ${response.result.error.message}`);
        }
      );
  };

  useEffect(() => {
    handleClientLoad();
  }, []);

  return (
    <UserProvider value={{ user, loading }}>
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <script async defer src="https://apis.google.com/js/api.js"></script>
        </Head>
        {children}
      </div>
    </UserProvider>
  );
};
