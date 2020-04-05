/* eslint-disable no-undef */
if (typeof window === "undefined") {
  // Server settings
  module.exports = {
    GS_SPREADSHEET_ID: process.env.GS_SPREADSHEET_ID,
    GS_SHEET_ID: process.env.GS_SHEET_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME,
  };
} else {
  module.exports = {
    GS_SPREADSHEET_ID: process.env.GS_SPREADSHEET_ID,
    GS_SHEET_ID: process.env.GS_SHEET_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME,
  };
}
