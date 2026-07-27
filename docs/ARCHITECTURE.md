# Bundle Builder Architecture

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- shadcn/ui
- Lucide Icons

---

## Project Structure

src/
├── components/
│ ├── AccordionStep
│ ├── ProductCard
│ ├── QuantityStepper
│ ├── ReviewPanel
│ └── review/
│
├── hooks/
│ ├── useProductCard
│ └── useReviewPanel
│
├── store/
│ └── useBundleStore
│
├── lib/
│ ├── review
│ └── utils
│
└── data/
└── products.json

---

## State Management

Global state is managed with Zustand.

The store is responsible for:

- Selected products
- Active variants
- Accordion state
- Pricing calculations
- Local persistence

UI components remain as stateless as possible.

---

## Data Flow

products.json

↓

ProductCard

↓

Zustand Store

↓

Review Panel

↓

Totals

---

## Component Responsibilities

### ProductCard

Displays a single product.

Responsible for:

- Variant selection
- Quantity controls
- Pricing
- Selected state

---

### AccordionStep

Responsible only for:

- Accordion behavior
- Step navigation
- Layout

---

### ReviewPanel

Responsible for:

- Rendering grouped items
- Summary
- Checkout section

Business logic is extracted into hooks.

---

## Hooks

### useProductCard

Contains:

- activeVariant
- quantity
- handlers

---

### useReviewPanel

Contains:

- grouped items
- totals
- save handler

---

## Persistence

The project uses Zustand Persist middleware.

Storage:

localStorage

This restores:

- selected products
- quantities
- variants
- accordion state

after page refresh.

---

## Design Principles

- Single Responsibility
- Reusable Components
- Data Driven UI
- Minimal Re-rendering
- Separation of UI & Business Logic

---

## Performance

- Flat product lookup
- Memoized derived data where appropriate
- Local JSON data source
- Lightweight global state
