# StewDec – Decoration & Event Management Platform

A full-stack web app with a React + Vite frontend and dual backend support (Node.js or Python).

---

## Project Structure

```
Dec-main/
├── main.py                  # Python ASGI backend (alternative to Node.js)
├── requirements.txt         # Python dependencies
├── package.json             # Root workspace scripts
└── stewDec/
    ├── server/
    │   ├── index.js         # Node.js backend (port 8010)
    │   └── data/
    │       └── database.sqlite
    ├── src/
    │   ├── Pages/           # Route-level pages
    │   ├── Components/      # Shared UI components
    │   └── lib/api.js       # Frontend ↔ Backend API client
    ├── public/              # Static assets (icons, logo)
    ├── dist/                # Production build output
    ├── .env.example         # Environment variable template
    ├── vite.config.js
    ├── netlify.toml
    └── package.json
```

---

## Quick Start (Local Development)

### Option A — Node.js Backend (recommended)

**Requirements:** Node.js >= 22

```bash
# 1. Install dependencies
npm install

# 2. Start backend (port 8010)
npm run dev:server

# 3. In a second terminal, start frontend (port 3000)
cd stewDec
npm run dev
```

### Option B — Python Backend

**Requirements:** Python >= 3.11

```bash
# 1. Install Python dependency
pip install -r requirements.txt

# 2. Start Python backend (port 8010)
uvicorn main:app --host 127.0.0.1 --port 8010 --reload

# 3. In a second terminal, start frontend
cd stewDec
npm run dev
```

The Vite dev server proxies all `/api/*` requests to `http://127.0.0.1:8010` automatically — no env variable needed locally.

---

## Environment Variables

Copy `stewDec/.env.example` to `stewDec/.env`:

```bash
cp stewDec/.env.example stewDec/.env
```

| Variable            | Description                                      | Default       |
|---------------------|--------------------------------------------------|---------------|
| `VITE_API_BASE_URL` | Backend URL for production. Leave empty locally. | `""` (proxy)  |

---

## Deployment

### Frontend → Netlify

1. Connect your GitHub repo to Netlify
2. Set **Base directory**: `Dec-main/stewDec`
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `dist`
5. Add environment variable: `VITE_API_BASE_URL=https://your-backend.railway.app`

### Backend → Railway / Render / Fly.io

**Node.js:**
- Root directory: `Dec-main/stewDec`
- Start command: `node server/index.js`
- Port: `8010` (or set `PORT` env variable)

**Python:**
- Root directory: `Dec-main`
- Start command: `uvicorn main:app --host 0.0.0.0 --port 8010`

---

## API Endpoints

| Method | Route                  | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/api/health`          | Health check                  |
| GET    | `/api/contact-requests`| List all contact requests     |
| POST   | `/api/contact-requests`| Submit a contact form         |
| GET    | `/api/consultations`   | List consultations by date    |
| POST   | `/api/consultations`   | Book a consultation           |

---

## Pages & Routes

| Route          | Component          |
|----------------|--------------------|
| `/`            | Home               |
| `/service`     | ServicePage        |
| `/portfolio`   | Portfolio          |
| `/about`       | AboutPage          |
| `/contact`     | ContactPage        |
| `/consultation`| BookConsultation   |
| `/Story`       | RealStory          |
| `/priceCalc`   | PriceCalc          |
| `/board`       | InspirationBoard   |
