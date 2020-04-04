import { CLIENT_ID, GS_API_KEY, DISCOVERY_DOCS, SCOPES } from "./config";

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
