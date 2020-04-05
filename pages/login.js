import Layout from "../components/layout";
import { useState } from "react";

/* eslint-disable no-undef*/
const handleAuthClick = (e) => {
  gapi.auth2.getAuthInstance().signIn();
};

const handleSignoutClick = (e) => {
  gapi.auth2.getAuthInstance().signOut();
};

const Login = () => {
  const [sheetsLoaded, setSheetsLoaded] = useState(false);
  const [sheetData, setSheetData] = useState({});
  const [msg, setMsg] = useState("API MSG");

  /* eslint-disable react/react-in-jsx-scope */
  return (
    <div className="container">
      <Layout setSheetData={setSheetData} setSheetsLoaded={setSheetsLoaded}>
        {sheetsLoaded && (
          <div>
            <button id="authorize" onClick={handleAuthClick}>
              Authorize
            </button>
            <button onClick={handleSignoutClick}>Sign Out</button>
          </div>
        )}
        {/* <main> */}
        {/* <button onClick={loadSpreadSheet}>Get Majors</button> */}
        {/* </main> */}
        <footer>{msg}</footer>
        <style jsx>{`
          #authorize {
            background-color: #3fbf3f;
            color: white;
          }

          button {
            border-radius: 5px;
            height: 50px;
            width: 150px;
            font-size: 20px;
            margin-right: 30px;
            border: 0;
            box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.2);
            cursor: pointer;
            background-color: white;
          }
        `}</style>
      </Layout>
    </div>
  );
};

export default Login;
