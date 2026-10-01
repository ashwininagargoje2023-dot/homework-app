# Homework

A small study app for students — no build step, no backend.

- **Homework checklist** with colour-coded subjects and due dates, filters, progress bar and "clear done".
- **Focus timer** — 25 min focus / 5 min break; the break suggests reading a joke.
- **Screenshot import** — tap **+ → Import from a screenshot** (or drop / paste an image) and the app reads the text on-device (Tesseract.js) and adds multiple entries at once after you review them.
- **Joke Cards** — 10 school jokes; tap to flip, swipe to move on, rate Groan / LOL.
- Data is saved on the device (`localStorage`). Installable as a PWA and works offline.

On a phone the app fills the screen. On a desktop it shows two phones side by side as a prototype view.

## Run locally

Open `index.html` in a browser, or serve the folder (needed to test install/offline):

```bash
npx serve .
```

## Deploy

It is a static site — GitHub Pages serves it straight from the `main` branch root.
