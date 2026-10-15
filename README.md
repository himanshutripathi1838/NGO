# Agridoot

Working local agriculture-management application with five account roles: Agridoot, NGO, FPO, CRP and Farmer.

Run `npm start` (Node.js 24+), then open http://127.0.0.1:5180. Complete first-time administrator setup using your own mobile number and password. There is no demo account or role switcher.

Features include server-side hierarchy permissions, expiring sessions, one-use account activation, CRP-code farmer registration, persistent SQLite storage, crop/season history, itemized input expenses, harvest quantities, crop/season filters, scoped bar charts, CSV exports, profile/password changes, account deactivation, audit history and backup tooling.

Each role has its own responsive visual workspace: Agridoot uses a teal network command center, NGO uses a warm impact-report view, FPO uses a blue operations layout, CRP uses a gold field board, and Farmer uses a personal farm-diary design. The shared data and access model stay consistent while headings, navigation emphasis, card composition, color system and dashboard purpose change by role.

See [LOCAL-GUIDE.md](LOCAL-GUIDE.md) for setup, access rules, backups, recovery and the local-only boundary. `npm test` runs isolated API/security tests. Browser QA uses `tests/ui-fixture.mjs` with an in-memory database, never the real data directory.

No online deployment has been performed.









cd D:\NGO\agridoot


npm start