# Performance Notes

## Rendering

The UI is data-driven and avoids duplicated markup.

---

## State Updates

Only the required state is updated inside the Zustand store.

---

## Component Separation

Business logic is separated from presentation components to reduce unnecessary complexity.

---

## Shared Utilities

Common helpers and constants are extracted into reusable modules.

---

## Assets

Images are served from the public directory to avoid unnecessary JavaScript bundle size.

---

## Future Improvements

Potential optimizations include:

- React.memo
- useMemo
- useCallback
- Virtualization for very large product lists
- Lazy loading for future sections
