# Pushpakanti Duari — Portfolio

A single-page portfolio for Pushpakanti Duari, a Computer Science undergraduate specializing in Data Science. It presents selected projects, education, research experience, technical skills, achievements, and contact links.

## Technologies

- React 19
- Vite 8
- JavaScript (ES modules)
- CSS
- SVG, PNG, and JPEG assets

## Features

- Responsive portfolio sections for Home, About, Projects, Experience, Technical Skills, and Contact
- Sticky navigation with scroll-aware active section highlighting and a mobile menu
- Interactive neural network visualization and a live India Standard Time clock
- Filterable technical skills and locally bundled technology icons
- Project source and demo links, published research DOI, and a public CV download
- Contact links and copy-email action

## Project structure

```text
.
├── index.html
├── public/
│   ├── favicon.svg
│   ├── pushpakanti-duari-resume.pdf
│   ├── pushpakanti-portrait.jpg
│   └── tech-icons/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── package.json
├── package-lock.json
└── README.md
```

## Requirements

Use a Node.js version supported by Vite 8: `^20.19.0` or `>=22.12.0`.

## Install and run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The production-ready static site is generated in `dist/`.

