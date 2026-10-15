# Agridoot local app

## Start

Requires Node.js 24 or later. No npm dependencies or cloud account needed.

Double-click `START.cmd`, or run `npm start` in this folder. Open http://127.0.0.1:5180. Keep the server running while using the website. First-time setup asks you to create your own Agridoot admin name, mobile number and password. There is no default password. The setup endpoint closes permanently once the first admin is created.

## Accounts and permissions

The role comes from the server, never a selector. Agridoot adds NGOs; an NGO adds FPOs; an FPO adds CRPs; a CRP adds farmers. Each member gets a unique code and one-use, 48-hour activation link. Copy that link privately to the member; the member sets their password on this computer. Farmers can also self-register using an active CRP code.

Every account sees itself and its descendants only. Parents can view records and export their authorized branch. A farmer and that farmer's assigned CRP can add/edit the farmer's crop records. NGO/FPO/Agridoot have read-only crop access. An account manages only its direct children. Deactivating a parent blocks sign-in for its entire branch and revokes descendant sessions; historical records stay in reports.

Name and mobile updates require the current password. Mobile is the login ID. Parent, role and referral code cannot be changed in the profile form. There is no SMS verification service in this local version.

## Farming records

Separate crop records preserve each season/year. Area accepts acre or hectare; report totals normalize to acres. Output accepts kilograms or quintals; reports normalize to quintals and require selecting one crop. Blank output means awaiting harvest, distinct from recorded zero. Expense totals sum itemized input rows, with currency stored in paise. Farmers count once per filter even when they have multiple crop records. Across-season area is cultivated area, not unique landholding.

Save refreshes the current dashboard; other open dashboards refresh every 20 seconds while visible and no form is open. Refresh is also available manually. Concurrent edits are version-checked; a stale save is rejected rather than overwriting newer data. Audit entries preserve crop changes and actor IDs in the database.

## Storage and recovery

The real database is `data/agridoot.sqlite`; it starts empty. Browser storage is not the source of records. Back up with `npm run backup`; SQLite's backup API safely includes current data while the server runs. Backups appear in `backups/`.

To restore: stop Agridoot cleanly, retain a copy of the current `data` directory, and replace the database with the selected backup in a fresh data directory. Do not mix a restored database with old SQLite `-wal` or `-shm` sidecars. Restart and verify records.

Members who forgot passwords ask their direct parent for a new activation link through Manage. This revokes the old access. If the Agridoot administrator forgets their password, the computer owner can run `node scripts/recover-admin.mjs` locally. It prints a one-use recovery link and revokes old admin sessions. Keep the link private; it grants account recovery.

## Local boundary

The server binds only to 127.0.0.1 and validates its Host and Origin. Links work on this computer only, not on another phone/computer. Sessions use HttpOnly SameSite cookies and CSRF tokens; passwords are salted scrypt hashes. Local HTTP is for loopback only. Internet/LAN deployment requires a separate HTTPS deployment configuration, Secure cookies, durable backups and operational review. No external hosting was performed per your instruction.

This Node + SQLite application must not be deployed as a static-only site because its authentication, permissions and database require the local server.

## Verification

`npm test` exercises setup, activation, hierarchy isolation, parent/child permissions, forged role rejection, CRP referral registration, input validation, conflict detection, branch deactivation, session revocation/expiry, password change and database restart persistence using a disposable database. Tests do not seed the real database.

Implementation references: [Node SQLite](https://nodejs.org/docs/latest-v24.x/api/sqlite.html), [Node crypto](https://nodejs.org/docs/latest-v24.x/api/crypto.html).
