AZIM KHAN - PORTFOLIO WEBSITE
=============================

Plain HTML, CSS and JavaScript. No build step, no install.

Files
- index.html   all content (projects, skills, experience, contact)
- styles.css   colours, fonts, layout (colours are at the top of the file)
- script.js    animations, live preview, contact form

Put it live (free, takes 2 minutes)
1. Vercel:  vercel.com -> Add New -> Project -> drag this unzipped folder in. Done.
2. Netlify: app.netlify.com/drop -> drop the unzipped folder.
3. GitHub Pages: upload the 3 files to a repo, Settings -> Pages -> Deploy from branch.

Edit things
- Project links, text and tech chips: search index.html for the project name.
- Phone / email / WhatsApp: search index.html and script.js for 7000651529 and azimkhan50607@gmail.com.
- Colours: the --ink-*, --gold and --mist values at the top of styles.css.
- Add screenshots later: put an image in the same folder and replace the
  <div class="poster ..."> inside a project's .screen with <img src="your.png" alt="...">.

Notes
- "Live preview" buttons load the real site inside the frame. If a site blocks
  being shown in a frame, use the "Visit" button instead.
- The page needs internet for the Google Fonts. It falls back to system fonts offline.
