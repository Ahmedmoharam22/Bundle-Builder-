# Bundle Builder

A React implementation of a multi-step security-system bundle builder, built from a provided Figma design. Shoppers pick cameras, a plan, sensors, and add-on protection through a 4-step accordion, with a live review panel that stays in sync on the side.

**Live demo / screenshots:** _(optional — add a Vercel/Netlify link here if you deploy it)_

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for tooling
- **Zustand** (+ `persist` middleware) for state management and localStorage persistence
- **Tailwind CSS** for styling
- **shadcn/ui** primitives for base components (Button, Card, Accordion, Badge, Input)

---

## Getting Started

Requires Node.js 18+.

```bash
# 1. Clone the repo
git clone https://github.com/Ahmedmoharam22/Bundle-Builder-.git
cd Bundle-Builder-

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

Other scripts:

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build locally
npm run lint       # run oxlint
```

---

## Project Structure

```
src/
├── components/       # Presentational UI components
│   ├── review/       # Review panel sub-components (category, item, summary)
│   └── ui/           # shadcn/ui primitives
├── hooks/            # Business logic, decoupled from UI (useProductCard, useReviewPanel)
├── store/            # Zustand store — single source of truth for cart/selection state
├── lib/              # Pure helper functions, constants, category/review grouping logic
├── data/             # products.json — the data source the UI renders from
└── types/            # Shared TypeScript types
```

---

## Key Decisions & Trade-offs

**State management — Zustand.**
Chosen for a small, centralized store with minimal boilerplate. The `persist` middleware handles localStorage automatically, so cart items and active variants survive a page reload without any manual `useEffect` wiring.

**Data-driven rendering.**
Every product card, variant chip, and review line is rendered from `src/data/products.json` — nothing is hardcoded per product. Adding or editing a product only means editing the JSON.

**Variant + quantity model.**
Each cart entry is keyed by `productId + variantId`, so every color variant is tracked with its own independent quantity. Selecting a different color on a card only changes which variant is "active" for that card's stepper — it never touches another variant's count. This is also what makes the review panel automatically show every variant with a quantity above zero as its own line, with no extra logic needed.

**"Save my system for later."**
The cart already persists automatically on every change (via Zustand's `persist` middleware), so by the time a shopper clicks this link, their configuration is already saved. The click currently shows a confirmation message rather than triggering a separate save — the persistence itself is continuous, not tied to the button press.

**Logic vs. UI separation.**
Business logic (quantity handling, active variant resolution, totals, grouping) lives in custom hooks (`useProductCard`, `useReviewPanel`) and `lib/` helpers, not inside components. Components stay focused on rendering.

**Responsiveness.**
The two-column desktop layout (`lg:grid-cols-12`) collapses to a single column below the `lg` breakpoint, so the builder and review panel stack vertically on mobile instead of squeezing side by side.

---

## What's Implemented

- 4-step accordion (Step 1 open by default, expand/collapse, "Next" navigation)
- Pixel-matched product cards: badge, image, title, description, Learn More link, color/variant chips, quantity stepper, compare-at + sale pricing
- Selected-state card highlighting (border) when any variant has quantity > 0
- Per-variant quantity tracking, synced between product card and review panel
- Live review panel: grouped by category (Cameras, Sensors, Accessories, Plan), running total, savings callout, shipping row, financing line, satisfaction badge
- Distinct-product "N selected" counter per step
- Full persistence via localStorage — reload restores the exact configuration
- Responsive layout down to mobile

## Known Limitations / Not Finished

- Accessibility: core interactions work, but ARIA attributes on the accordion trigger and icon-only stepper buttons could be more complete
- No automated tests (unit/component) yet
- Checkout button is a placeholder, per the assignment scope
- See `docs/TODO.md` for the fuller list of possible future improvements (loading states, animations, filters, etc.)

---

## Additional Docs

More detail on architecture, the Figma-to-code mapping, and performance choices is in [`docs/`](./docs):

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/DECISIONS.md`](./docs/DECISIONS.md)
- [`docs/FIGMA_SPEC.md`](./docs/FIGMA_SPEC.md)
- [`docs/PERFORMANCE.md`](./docs/PERFORMANCE.md)
- [`docs/TODO.md`](./docs/TODO.md)
