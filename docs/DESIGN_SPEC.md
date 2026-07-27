# Bundle Builder Design Specification

## Reference

**Design Source:** Figma

**Reference Frame:** Frame 1735 (Desktop)

> This document defines the design rules followed during implementation to ensure a pixel-perfect UI.

---

# Layout

## Page

- Max Width: 1280px
- Horizontal Padding: 32px
- Top Padding: 32px

## Grid

- 12 Columns
- Left Builder: 8 Columns
- Review Panel: 4 Columns
- Column Gap: 32px

---

# Border Radius

| Component    | Radius |
| ------------ | ------ |
| Product Card | 10px   |
| Accordion    | 10px   |
| Review Panel | 10px   |
| Buttons      | 4px    |
| Variant Chip | 4px    |
| Badge        | Full   |

---

# Product Card

## Size

- Width: **361.5px**
- Min Height: **173px**

## Layout

- Padding: **11px**
- Gap: **13px**

### Left Section

- Width: **100px**

Contains:

- Badge
- Product Image

Image max height:

- **110px**

### Right Section

Contains:

- Product Title
- Description
- Learn More
- Variant Selector
- Quantity Stepper
- Pricing

---

# Variant Selector

- Horizontal Layout
- Gap: **6px**
- Chip Radius: **4px**
- Font Size: **11px**

Each variant keeps an independent quantity.

---

# Quantity Stepper

- Icon Size: **16px**
- Gap: **12px**
- Counter Min Width: **16px**
- Font Size: **14px**

---

# Accordion

Header Padding:

**15px**

Content Padding:

**15px**

Grid Gap:

**13px**

Step Label:

- 11px
- Bold
- Uppercase

Title:

- 16px
- Bold

---

# Review Panel

Width:

**399px**

Padding:

**15px**

Corner Radius:

**10px**

Internal Gap:

**5px**

Sticky:

Top **24px**

---

## Review Item

Thumbnail:

36 × 36

Thumbnail Radius:

8px

Gap:

10px

Name:

12px

Variant:

10px

Price:

Old Price:

10px

Current Price:

12px Bold

---

## Totals

Old Total:

20px

Final Total:

32px

Savings:

11px Bold

Checkout Button:

350 × 48

Radius:

4px

---

# Product Grid

Desktop:

2 Columns

Gap:

13px

Last Camera Card:

Left aligned

Does not stretch

---

# Responsive Behavior

Desktop follows the Figma design exactly.

Tablet and Mobile layouts are responsive while preserving spacing, hierarchy, and usability.

---

# Development Notes

- UI is fully data-driven from JSON.
- State is managed using Zustand.
- Product variants maintain independent quantities.
- Review Panel updates in real time.
- Local persistence is implemented using Zustand Persist.
- Components were refactored to keep UI separated from business logic.
- Shared utilities are extracted into reusable modules.
- Design values were matched against the Figma reference wherever possible.

---

# Goal

The objective of this implementation is to produce a clean, reusable, maintainable, and pixel-perfect React application while closely matching the provided Figma design.
