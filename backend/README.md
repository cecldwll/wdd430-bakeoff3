Scrapboard Backend (Minimal)

This small Express backend provides:
- GET /api/board  -> returns stored board JSON
- POST /api/board -> accepts full board JSON and persists to backend/data/db.json
- POST /api/upload -> accepts multipart file field `file`, saves under /uploads and returns {url}
- Serves frontend/ static files (if frontend/ exists) and /uploads

Run locally:
1. cd backend
2. npm install
3. npm start

Then open http://localhost:3000 (serves frontend if present) or call the API directly.
