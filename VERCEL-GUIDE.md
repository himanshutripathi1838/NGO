# Vercel deployment

1. Import `himanshutripathi1838/NGO` in Vercel.
2. Keep the framework preset as **Other** and leave build command empty.
3. Add these encrypted Environment Variables for Production and Preview:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
4. Deploy or redeploy after saving the variables.

The `public` directory contains the browser application. The catch-all API in
`api/[...path].mjs` connects only from the server to Turso. Never place the
Turso token in `public`, `dist`, GitHub, screenshots, or browser code.

After deployment, sign in using an existing mobile number and password from the
uploaded database. Existing local sessions were intentionally removed, so every
account must sign in again. Pending accounts need a newly issued activation link
from their direct parent administrator.

## Render alternative

The repository also includes `render.yaml` and `cloud-server.mjs`. On Render,
create a Blueprint from this repository, enter `TURSO_DATABASE_URL` and
`TURSO_AUTH_TOKEN`, then deploy. The Node web service serves both the site and
the Turso-backed API from one process.
