import { useState } from "react";
import Layout from "../components/layout";
import MaterialTableAdmin from "../components/AdminTable";
import { useFetchUser, fetchUser } from "../lib/user";
import auth0 from "../lib/auth0";

/* eslint-disable */
const Admin = () => {
  const [sheetsLoaded, setSheetsLoaded] = useState(false);
  const [sheetData, setSheetData] = useState({});
  const { user, loading } = useFetchUser();

  return (
    <div className="container">
      <Layout
        user={user}
        loading={loading}
        setSheetsLoaded={setSheetsLoaded}
        setSheetData={setSheetData}
      />
      <main>
        <h1 className="title">RMA List</h1>
        <div className="table-container">
          {sheetsLoaded && sheetData.length > 0 && (
            <MaterialTableAdmin sheetData={sheetData} />
          )}
        </div>
      </main>
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </div>
  );
};

Admin.getInitialProps = async ({ req, res }) => {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: "/api/login",
      });
      res.end();
      return;
    }

    const user = await fetchUser();
    return { user };
  }
};

export default Admin;
