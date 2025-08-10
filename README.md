# WeDo MVP (React + Vite + Tailwind)

**Questa build è pronta per Firebase.** Ho incluso un file `.env.example` e qui sotto trovi già il contenuto per `.env` con le tue chiavi.

## Avvio locale
```bash
npm install
npm run dev
```
> Userà `VITE_BACKEND=firebase` (vedi `.env`).

## Deploy (Vercel, gratis)
- Framework: **Vite**
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Aggiungi in **Project Settings → Environment Variables** tutte le variabili del tuo `.env`.

## Sicurezza crediti
Per produzione sposta la logica di accredito/scarico crediti in **Cloud Functions** per evitare manipolazioni client.
