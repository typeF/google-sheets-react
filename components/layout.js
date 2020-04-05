import Head from "next/head";
import { CLIENT_ID, GS_API_KEY, DISCOVERY_DOCS, SCOPES } from "../api/config";
import { useState, useEffect } from "react";
import { formatData } from "../utils/formatData";

/* eslint-disable */
export default ({
  // children,
  title = "Spreadsheet",
  setSheetsLoaded,
  setSheetData,
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
        scope: SCOPES,
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
        // spreadsheetId: "1zAe53lK06l2Pg4gUr1qsUwZo1LFkmmko-nq-OH53Iv4",
        spreadsheetId: "1Kvxwr_BHB50MVmlbfjeT1vGgIoGSVX1uiNdnB4IJnTk",
        range: "RMA list",
      })
      .then(
        function (response) {
          const range = response.result;
          if (range.values.length > 0) {
            console.log(range);
            // setMsg(range.values[2]);
            // setHaha(range);
            // setSheetData(true);
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
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <script
        async
        defer
        src="https://apis.google.com/js/api.js"
        // onreadystatechange="if (this.readyState === 'complete') this.onload()"
      ></script>
    </Head>
  );
};
