# Personal Portfolio

This repository contains the source code for my personal portfolio website.

The site showcases my work as a front-end developer, UI/UX designer, and multimedia creator.

---


## About

This portfolio is a central place to show what I do, my experience, and the projects I’ve worked on. It’s designed to be easy to navigate, responsive, and visually engaging, with a focus on user experience and clean design.


## Sections

- **Featured Work** – Highlighting UI/UX and web development projects  
- **Other Works** – Graphic design, video editing, and other creative projects  
- **What I Do** – Services I offer as a developer and designer  
- **About Me** – Background, work experience, and professional overview  
- **What People Say** – Testimonials and feedback from clients or collaborators  


---


## Tech Stack

The portfolio is built using the following tools:

- **React** – Component-based UI development  
- **Vite** – Fast development server and build tool  
- **Tailwind CSS** – Utility-first CSS framework  
- **Motion (Framer Motion)** – Animations and transitions  
- **Lucide React** – Icon set  
- **clsx / tailwind-merge** – Conditional and merged class handling  

## Development Setup

This project uses [Sanity](https://www.sanity.io/) as a headless CMS. `sanity` and `@sanity/vision` are already listed in `package.json`, so `npm install` pulls them in — no separate install step needed.

To run the project locally:

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Sanity's project ID/dataset are read from env vars, and `.env.local` is gitignored (not committed), so you need to create it yourself on every new machine:

   ```bash
   cp .env.local.example .env.local
   ```

   Then fill in `VITE_SANITY_PROJECT_ID` with your project ID from [sanity.io/manage](https://www.sanity.io/manage) (dataset defaults to `production`).

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. **(Optional) Run the Sanity Studio**

   The Studio is embedded via `sanity.config.js` and served through the same Vite dev server — visit `/studio` once `npm run dev` is running. It also needs the same `.env.local` values to connect to the dataset.

### Troubleshooting

**`Failed to resolve import "@sanity/..."` (or any other package) after pulling:** your local `node_modules` is out of sync with `package-lock.json` — usually because a pull brought in new/updated dependencies (like the Sanity integration) and `npm install` wasn't rerun afterward. Fix:

```bash
npm install
```

As a habit, rerun `npm install` after every `git pull` that touches `package.json` or `package-lock.json`.

