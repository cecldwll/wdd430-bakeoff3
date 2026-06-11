Digital Scrapboard - MVP (Static)

This is a minimal client-side MVP implementing a digital scrapboard with:
- Add / edit sticky notes (themes)
- Add images (local file upload)
- Drag to position notes and images
- Draw simple connecting lines between elements
- State persisted to localStorage

How to run locally
1. Open the frontend/index.html directly in a browser (file://) OR run a simple HTTP server:
   - Python 3: cd frontend && python -m http.server 8000
   - Then open http://localhost:8000

How to commit these files
1. From repository root (Windows PowerShell):
   git add frontend/
   git commit -m "Add MVP static scrapboard frontend\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
   git push origin HEAD

How to test
- Manually: open the site, add notes/images, draw lines, refresh to confirm persistence.
- Automated: this MVP has no test harness; add Vitest/Playwright later as spec requires.
