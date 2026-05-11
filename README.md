# AlterLabs

AlterLabs is a small studio website for web systems, CRM, dashboards, automation, and related implementation guides.

## Run locally

```bash
npm install
npm start
```

The site runs on `http://localhost:3000` by default. Set `PORT` to run on another port.

## Production notes

- Health check: `/api/health`
- Render build command: `npm install`
- Render start command: `npm start`
- Contact form submissions write to `data/submissions.json` by default.
- For persistent production contact storage, set `SUBMISSIONS_FILE` to a path on a persistent disk, or replace JSON storage with email/database handling.

## Domain

Primary domain planned: `alterlabs.in`
