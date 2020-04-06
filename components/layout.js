import Head from "next/head";
import { useState, useEffect } from "react";
import { formatData } from "../utils/formatData";
import { UserProvider } from "../lib/user";
import {
  GS_CLIENT_ID,
  GS_API_KEY,
  DISCOVERY_DOCS,
  SCOPES_WRITE,
  GS_SPREADSHEET_ID,
} from "../lib/config";

/* eslint-disable */
export default ({
  children,
  title = "RMA List",
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
        apiKey: process.env.GS_API_KEY,
        clientId: process.env.GS_CLIENT_ID,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
        scope: "https://www.googleapis.com/auth/spreadsheets",
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
        },
        (error) => {
          console.log(`Error initClient: ${error.code} ${error.message}`);
          console.log(error);
        }
      );
  }

  const loadSpreadSheet = () => {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.GS_SPREADSHEET_ID,
        range: "RMA list",
      })
      .then(
        function (response) {
          const range = response.result;
          if (range.values.length > 0) {
            setSheetData(formatData(range.values));
          } else {
            console.error(`No data found`);
          }
        },
        function (response) {
          console.log(`Error: ${response.result.error.message}`);
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
          <script
            key="gapi"
            async="async"
            defer
            src="https://apis.google.com/js/api.js"
          ></script>
        </Head>
        {children}
      </div>
    </UserProvider>
  );
};
