/* eslint-disable */
export const CLIENT_ID = process.env.GS_CLIENT_ID;
export const GS_API_KEY = process.env.GS_API_KEY;
export const GS_SPREADSHEET_ID = process.env.GS_SPREADSHEET_ID;
export const GS_SHEET_ID = process.env.GS_SHEET_ID;
export const DISCOVERY_DOCS = [process.env.GS_DISCOVERY_DOCS];
export const SCOPES_READ_ONLY = process.env.GS_SCOPES_READ_ONLY;
export const SCOPES_WRITE = process.env.GS_SCOPES_WRITE;
export const APP_URL =
  process.env.NODE_ENV === "production"
    ? process.env.APP_URL
    : "http://localhost:3000";
