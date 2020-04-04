import Head from "next/head";
import { CLIENT_ID, GS_API_KEY, DISCOVERY_DOCS, SCOPES } from "../api/config";
import { useState, useEffect } from "react";

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
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
        // Listen for sign-in state changes.
        // gapi.auth2
        //   .getAuthInstance()
        //   .isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      (error) => {
        console.error(error);
        // setMsg(JSON.stringify(error, null, 2));
      }
    );
}
export default ({ children, title = "Spreadsheet" }) => {
  useEffect(() => {
    handleClientLoad();
  });

  return (
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
          async
          defer
          src="https://apis.google.com/js/api.js"
          onreadystatechange="if (this.readyState === 'complete') this.onload()"
        ></script>
      </Head>
      {children}
    </div>
  );
};
