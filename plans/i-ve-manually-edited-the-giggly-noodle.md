# Plan: Core 2.0 Dashboard — Premium Expansion

## Context

The current dashboard (`src/App.tsx`) implements the main Dashboard page well, but the reference screenshots show several additional pages and corrections:

1. **Overview stat tiles** — screenshots show Customers (2,048) and Balance (256k) displayed simultaneously side-by-side (not as a mutually-exclusive toggle). Clicking one highlights it and changes the content *below* the tiles (customer list vs. balance chart). Fix the value to 2,048.
2. **Products page** — a full data table view with Market / Traffic sources / Viewers tab navigation, sortable columns, row checkboxes, hover actions (Edit / Delete / Share), mini sparkline bars, and a product search input.
3. **New product page** — a form page reachable via the "Create" button or Products > Drafts, with product title input, rich-text-style description editor, cover image upload zone, images/previews section, and a file upload section. Header has "Save draft" + "Publish now" split button.
4. **Product overview page** — a page reached from the Products table, showing Earning/Payout stat cards, a product activity table, a product views bar chart, and a **delete confirmation modal** triggered by a Delete action (centered overlay with "Are you sure?", Cancel/Delete buttons, red warning icon).
5. **Sidebar** — the logo should be a 4-quadrant square icon (matching the screenshot), Products accordion should start closed.

## Files to modify

- **`src/App.tsx`** — primary file; all views live here as a simple `currentPage` state router (no react-router needed for this scale). Refactor into named view components rendered conditionally.
- **`src/index.css`** — minor: add `.sparkline` bar styles if needed.

## Implementation approach

Use a `currentPage` state string (`'dashboard' | 'products' | 'new-product' | 'product-overview'`) at the top level. The sidebar nav items and "Create" button update this state. The shell (sidebar + header) stays mounted; only `<main>` content swaps.

### 1. Fix Dashboard Overview stat tiles
- Both tiles render simultaneously; clicking one sets `activeStat` (border highlight + shadow-depth-toggle on the active tile)
- Customer count → `2,048`
- Products accordion → `open: false` by default

### 2. Products page (`currentPage === 'products'`)
Components:
- Header row: "Products" title, search input (`solar:magnifer-linear`), tab bar (Market / Traffic sources / Viewers)
- Below tabs: data table with columns:
  - Checkbox
  - Product (64px image, name, subtitle "UI Design Kit")
  - Status badge (Active/Offline label-green/label-red)
  - Price
  - Sales (value + trend pill + mini inline bar)
  - Views (value + mini multi-bar sparkline)
  - Like count
- On row hover: show Edit | Delete | Share pill row (positioned absolute, similar to the screenshot)
- Viewers tab: replaces Sales/Views/Like with a Views count + two-tone horizontal progress bar (Followers vs Others)
- Clicking "Delete" on any row opens the delete confirmation modal

Data (7 rows matching screenshot):
```ts
{ name: 'Bento Matte 3D Illustration', sub: 'UI Design Kit', status: 'Active', price: '$98.00', sales: '$3,200', trend: '+36.8%', views: '48m', likes: 480, img: productBase+'1' }
// etc.
```

### 3. Delete confirmation modal
- Triggered by clicking Delete on a product row in the Products table
- Renders as a fixed overlay (backdrop blur or dim) centered modal card (rounded-3xl, ~420px wide)
- Red warning circle icon at top
- "Are you sure?" heading
- Body text: "This will definitely delete 4 products, and all data will be removed. This action cannot be undone."
- Two buttons: "Cancel" (surface btn) and "Delete" (white gradient btn-light)
- State: `deleteModalOpen: boolean` + `deleteTarget` — clicking Cancel closes it, Delete removes row from state

### 4. New product page (`currentPage === 'new-product'`)
Layout: Two columns (left: form, right: sidebar panels)

Left column:
- "Product details" card: product title input, description textarea with formatting toolbar row (Bold, Italic, Underline, Emoji, Link, List, Align, arrow buttons)
- "Images" card: "Previews" label + upload area

Right column:
- "Cover image" card: drag-drop zone with camera icon + "Drag and drop an image, or Browse" + below it a product preview card (thumbnail, name, price "$0.00")
- "Upload product files" card: upload zone

Header (replaces normal header Create button area): "New product" title on left, "Save draft" outline button + "Publish now" split dropdown button (white gradient) on right

### 5. Logo update
Replace the "C" text mark in the sidebar brand with a 4-quadrant square SVG icon (matching the screenshots — a 2×2 grid of filled squares, similar to a window/grid icon).

## Verification

After implementation, `pnpm build` should exit 0 with no TypeScript errors. Manually check:
- Dashboard: both stat tiles visible, clicking each highlights it and swaps content below
- Sidebar: Products accordion starts collapsed, clicking expands it
- Products page: navigating via sidebar Products > Overview shows the table; clicking Delete opens modal; Cancel closes it
- New product page: reachable via Create button; form fields render; Publish now button is visible
- Product overview page: accessible from Products table row; shows stats, table, chart, and delete modal
