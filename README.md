# CUCU FRONTEND

A [React](https://react.dev) project bootstrapped with [Vite](https://vitejs.dev), serving as the frontend for the Cucu platform.

---

## Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- A GitHub account with access to the [CUCU-chuka](https://github.com/CUCU-chuka) organization

---

## Getting Started

### 1. Clone the repository
```bash
git clone git@github.com:CUCU-chuka/cucu-backend.git
cd cucu-backend/frontend
\```

### 2. Install dependencies

\```bash
npm install
\```

### 3. Start the development server

\```bash
npm run dev
\```

Open [http://localhost:5173](http://localhost:5173) in your browser.  
The page auto-updates as you save changes — start editing at `src/App.jsx`.

---

## Folder Structure

\```
frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, fonts, icons
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page-level components
│   ├── App.jsx      # Root component
│   └── main.jsx     # App entry point
├── index.html
├── vite.config.js
└── package.json
\```

---

## Git Workflow for Collaborators

> ⚠️ **`main` is a protected branch — never push directly to it.**  
> All changes must go through a Pull Request (PR).

### Step 1 — Stay up to date

\```bash
git checkout main
git pull origin main
\```

### Step 2 — Create your feature branch

\```bash
git checkout -b feature/your-feature-name
\```

Examples:
\```bash
git checkout -b feature/navbar-component
git checkout -b fix/login-bug
git checkout -b chore/update-dependencies
\```

### Step 3 — Make your changes

\```bash
git add .
git commit -m "feat: describe what you changed"
\```

**Commit message conventions:**
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance/config changes
- `style:` — UI/styling only

### Step 4 — Push your branch

\```bash
git push -u origin feature/your-feature-name
\```

### Step 5 — Open a Pull Request

1. Go to the repo on GitHub
2. Click **"Compare & pull request"**
3. Add a clear title and description
4. Request a review from a teammate
5. Wait for approval before merging

---

## Build for Production

\```bash
npm run build
\```

Output will be in the `dist/` folder, ready to deploy on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any static host.

---

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev/guide)
- [Git Branching Guide](https://www.atlassian.com/git/tutorials/using-branches)
```

Copy this directly into your `README.md` file — remove the backslashes (`\`) I added before the inner code fences, those were just to prevent rendering conflicts here.

## License

Copyright 2026 CUCU

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
