import { useState } from "react";
import Layout from "../components/layout";
import MaterialTableViewOnly from "../components/ViewOnlyTable";

/* eslint-disable */
export default () => {
  const [sheetsLoaded, setSheetsLoaded] = useState(false);
  const [sheetData, setSheetData] = useState({});

  return (
    <div className="container">
      <Layout setSheetsLoaded={setSheetsLoaded} setSheetData={setSheetData} />
      <main>
        <h1 className="title">RMA List</h1>
        <div className="table-container">
          {sheetsLoaded && sheetData.length > 0 && (
            <MaterialTableViewOnly sheetData={sheetData} />
          )}
        </div>
      </main>

      <footer></footer>

      <style jsx>{`
        .table-container {
          width: 100%;
          margin: 50px 0 50px;
        }

        #material-table {
          width: 100%;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 3rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
