import { GS_SPREADSHEET_ID, GS_SHEET_ID } from "./config";

/* eslint-disable no-undef */
export const addRowToSheets = (newData) => {
  if (Object.keys(newData).length < 1) {
    return;
  }
  gapi.client.sheets.spreadsheets.values
    .append({
      spreadsheetId: GS_SPREADSHEET_ID,
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
      done ? done : "false",
      received ? received : "",
      completed ? completed : "",
      part ? part : "",
      qty ? qty : "",
      note ? note : "",
    ],
  ];
  return array;
};

export const updateRow = (newData) => {
  const { row } = newData;
  gapi.client.sheets.spreadsheets.values
    .update({
      spreadsheetId: GS_SPREADSHEET_ID,
      valueInputOption: "USER_ENTERED",
      range: `A${row}:H${row}`,
      resource: {
        values: buildAppendValueArray(newData),
      },
    })
    .then(
      (response) => {
        console.log(response.result);
      },
      (reason) => {
        console.error(`Error: ${reason.result.error.message}`);
      }
    );
};

export const deleteRow = (oldData) => {
  const { row } = oldData;
  console.log(row);
  gapi.client.sheets.spreadsheets
    .batchUpdate(
      {
        spreadsheetId: GS_SPREADSHEET_ID,
      },
      {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: GS_SHEET_ID, // #gid=sheetId
                dimension: "ROWS",
                startIndex: row - 1,
                endIndex: row,
              },
            },
          },
        ],
      }
    )
    .then(
      (response) => {
        console.log(response.result);
      },
      (reason) => {
        console.error(`Error deleting row: ${reason.result.error.message}`);
      }
    );
};
