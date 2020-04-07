## About

A Next.js application that loads data remotely from Google Sheets data into [Material Table](https://material-table.com). Uses the serverless function features of ZEIT Now to authenticate users for protected routes via Next.js SDK for signing in with [Auth0](https://github.com/auth0/nextjs-auth0).

## Setup

### Auth0

Follow Auth0 configuration setup for [here](https://github.com/auth0/nextjs-auth0).

### Local Development

Create .env and .env.build files with the following values

```bash
# Obtain from Google Sheets API
GS_CLIENT_ID=
GS_API_KEY=
GS_DISCOVERY_DOCS=https://sheets.googleapis.com/$discovery/rest?version=v4
GS_SCOPES_READ_ONLY=https://www.googleapis.com/auth/spreadsheets.readonly
GS_SCOPES_WRITE=https://www.googleapis.com/auth/spreadsheets


# Add your own
GS_SPREADSHEET_ID=
GS_SHEET_ID=

# Obtain from Auth0 Config
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

SESSION_COOKIE_SECRET=YOUR_SUPER_DUPER_SECRET
APP_URL=http://localhost:3000
```

## Usage

```bash
npm run dev
# or
yarn dev
# or
now dev
```

## Deployment setup

Add environment variables according to now.json

```
now secrets add secret_variable_name secret_value
```

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
