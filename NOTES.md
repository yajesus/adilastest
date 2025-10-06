## How to run

```bash
npm install
npm run dev
```

App will start on `http://localhost:5173`.

Optional tests:

```bash
npm test
```

## Decisions
- Used DummyJSON carts as orders; mapped to fields required.
- Auth is mocked via localStorage and a simple login form.
- Create Order persists to localStorage and merges with remote list.
- Basic protected routes implemented in `src/App.tsx`.
- Tailwind CSS configured (PostCSS) for utility-first styling.
- Responsive components: mobile cards + desktop tables for Orders/Customers.
- Fallback data when network requests fail (to avoid blockers during review).

## Improvements (with more time)
- Replace DummyJSON with json-server for full CRUD.
- Add React Query for caching/loading states.
- Add form library (react-hook-form) and schema validation.
- Feature-based folder structure and stronger typing across JS files.
- Add toast notifications and per-field validation messages.
- Add pagination/virtualization for large datasets and skeleton loaders.

