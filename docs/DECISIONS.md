# Technical Decisions

This document explains the main implementation decisions made during the project.

---

## State Management

Zustand was chosen because it provides a lightweight API with minimal boilerplate while keeping the state centralized and easy to maintain.

---

## Data Source

The UI is fully data-driven using a local JSON file.

This makes adding or modifying products possible without changing any UI components.

---

## Component Structure

Large components were split into smaller reusable pieces whenever possible.

Examples:

- ReviewCategory
- ReviewItem
- ReviewSummary

This improves readability and maintainability.

---

## Business Logic

Business logic was extracted into custom hooks instead of being embedded inside UI components.

Examples:

- useProductCard
- useReviewPanel

---

## Persistence

The bundle configuration is stored using Zustand Persist with localStorage.

This restores:

- selected products
- quantities
- variants
- accordion state

after page refresh.

---

## Styling

Tailwind CSS was used for all styling.

Spacing, sizing, and component dimensions were matched against the Figma reference.

---

## Goal

Prioritize:

- readability
- maintainability
- reusable components
- production-ready structure
