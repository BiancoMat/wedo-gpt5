# WeDo MVP (React + Vite + Tailwind)

**Obiettivo:** demo funzionante della piattaforma WeDo con:
- Autenticazione email/password (Firebase adapter) **oppure** modalità demo locale (default)
- Bacheca pubblica favori (lista, filtro, aggiunta)
- Logica crediti base (+1 a chi fa, -1 a chi riceve)
- Gruppi (crea/lista)
- Centro notifiche (demo locale)
- UI minimale con Tailwind

## Avvio locale (modalità DEMO, nessun costo)
```bash
npm install
npm run dev
```
La demo usa `localStorage` e funziona **senza** Firebase.

## Passare a Firebase (opzionale)
1. Crea un file `.env` nella root con questi valori (usa le tue chiavi):
```
VITE_BACKEND=firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
2. In Firebase Console, abilita **Authentication** (Email/Password) e crea i DB **Firestore** con
   - collection: `credits` (docId = uid, { balance:number })
   - collection: `favors`
   - collection: `groups`

## Deploy GRATUITO (consigli)
- **Netlify** o **Cloudflare Pages**: piani free. Collega la repo GitHub e imposta build command `npm run build` e publish dir `dist/`.
- **GitHub Pages**: per Vite SPA, usa un workflow con `actions/setup-node` e `peaceiris/actions-gh-pages`.

## Struttura
- `src/adapters/local.js` — demo offline
- `src/adapters/firebase.js` — integrazione Firebase (base)
- `src/pages/*` — pagine principali
- `src/components/Navbar.jsx` — navigazione
- `tailwind.config.js` + `postcss.config.js` + `src/index.css`

## Note
- La logica crediti su Firebase andrebbe messa in **Cloud Functions** per sicurezza. Qui è dimostrativa.
- Questo MVP è pensato per partire subito e iterare sull'UX senza blocchi tecnici.
