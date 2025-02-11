# Smart Energy Monitor Web App

## Features
- Displays real-time power consumption using **Chart.js**.
- Fetches data from **Google Sheets API**.
- Alerts for high power usage.
- Generates automatic monthly reports in Google Sheets.

## Setup Instructions
1. Open **Google Sheets**, go to **File → Share → Publish to Web**, and set it to public.
2. Copy the **published URL**, modify it to get the **JSON format** (see instructions inside `script.js`).
3. Replace `YOUR_GOOGLE_SHEETS_JSON_FEED_URL` inside `script.js`.
4. Host the project on **GitHub Pages, Vercel, or Netlify**.

## Hosting on GitHub Pages
1. Create a **GitHub Repository**.
2. Upload these files (`index.html`, `style.css`, `script.js`).
3. Go to **Settings → Pages**, select `main` branch, and click **Save**.
4. Your web app will be live at: `https://your-username.github.io/smart-energy-monitor/`.
