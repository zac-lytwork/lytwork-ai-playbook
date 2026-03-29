# Lytwork AI Playbook

Two-page site: a lead-capture gate that collects email + name before granting access to the playbook.

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Gate page — form submission required |
| `playbook.html` | `/playbook` | The full AI Playbook (cookie-gated) |

## How the gate works

1. Visitor lands on `/` (the gate page) and fills in their email + first name.
2. Form posts the lead to Google Sheets via Apps Script (fire-and-forget).
3. A 30-day access cookie (`lytwork_access`) is set in the browser.
4. User is redirected to `/playbook`.
5. If anyone tries to navigate directly to `/playbook` without the cookie, they are immediately redirected back to `/`.

---

## Setup: Google Sheets lead capture (one-time, ~5 min)

1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com).
2. Click **Extensions > Apps Script**.
3. Delete the placeholder code and paste the contents of **`google-apps-script.js`**.
4. Click **Save**, then **Deploy > New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, approve permissions.
6. Copy the **Web App URL** (e.g. `https://script.google.com/macros/s/AKfy.../exec`).
7. Open **`index.html`**, find this line near the bottom of the file:
   ```js
   var APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
   Replace the placeholder string with your Web App URL.
8. Save `index.html`, then commit and push.

Every submission will appear in your sheet with columns: **Timestamp | Name | Email | Source**.

---

## Deploy to Vercel (first time)

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel will detect the static site automatically.

### Option B — GitHub + Vercel dashboard

1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the GitHub repo.
4. Leave all settings as default and click **Deploy**.

---

## Push to GitHub

```bash
# Inside the lytwork-ai-playbook folder:
git remote add origin https://github.com/YOUR_USERNAME/lytwork-ai-playbook.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. The repo must already exist on GitHub (create it at github.com/new — keep it empty, no README).

---

## Future updates

After changing any file, commit and push:

```bash
git add .
git commit -m "Update playbook content"
git push
```

Vercel will automatically redeploy within ~30 seconds.
