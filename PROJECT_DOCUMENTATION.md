# AERO STEP — Project Documentation

Welcome to the official developer documentation for **AERO STEP**, a high-performance, modern React + Vite e-commerce web application and administrative dashboard.

This document serves as the permanent single source of truth for the codebase, architecture, technical decisions, components, routing, internationalization system, performance strategy, and developer guidelines.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Routing Architecture](#routing-architecture)
5. [Reusable Components](#reusable-components)
6. [Translation & Data System (i18n)](#translation--data-system-i18n)
7. [Styling & Design System](#styling--design-system)
8. [Performance Optimizations](#performance-optimizations)
9. [Dashboard Architecture](#dashboard-architecture)
10. [Coding Standards & Guidelines](#coding-standards--guidelines)
11. [Architectural Decisions & Important Notes](#architectural-decisions--important-notes)
12. [Future Improvements (TODO List)](#future-improvements-todo-list)
13. [Installation & Commands](#installation--commands)
14. [Deployment Guide](#deployment-guide)
15. [Changelog](#changelog)
16. [Developer Onboarding Notes](#developer-onboarding-notes)

---

## Project Overview

**AERO STEP** ("MOVE AHEAD") is a premium fashion and footwear e-commerce application crafted with React 19, Vite, Vanilla CSS, and React Router v7. It features a customer-facing storefront and a full-featured administrative control panel.

### Project Goals
- Provide an ultra-responsive, elegant shopping experience with smooth page transitions and instant UI updates.
- Support complete bilingual operation (English LTR and Arabic RTL) with seamless locale switching.
- Maintain top-tier web vitals through code splitting, skeleton loading, lazy asset loading, and optimized routing.
- Offer an intuitive admin dashboard for store operations, analytics, products, inventory, and customer management.

### Target Users
- **Shoppers**: Fashion-conscious customers browsing catalog products, customizing cart items, and completing checkouts on mobile, tablet, or desktop devices.
- **Store Managers & Admins**: Administrative staff managing products, order fulfillment, coupon campaigns, customer feedback, and real-time sales metrics.

### Key Features
- **Hero & Curated Collections**: Dynamic storefront sections showcasing featured products, technology highlights, and membership offers.
- **Global Shopping Cart**: Real-time slide-out cart drawer powered by persistent local storage.
- **RTL & LTR Internationalization**: Instant language toggle with automatic direction adjustment (`dir="rtl"` / `dir="ltr"`).
- **Global PageLoader & Transitions**: Custom Apple/Nike-style loading overlay between route changes.
- **Instant Scroll Restoration**: Automatic `ScrollToTop` reset on navigation.
- **Skeleton Loaders**: Custom shimmer skeletons for product grids, detail pages, category chips, dashboard cards, and data tables.
- **Comprehensive Admin Dashboard**: Multi-view dashboard for managing products, categories, orders, customers, reviews, coupons, analytics, and settings.

---

## Tech Stack

| Technology / Library | Version | Category | Rationale & Usage |
| :--- | :--- | :--- | :--- |
| **React** | `^19.2.6` | Core Framework | Component-based UI library providing concurrent rendering, hooks, and clean state management. |
| **Vite** | `^8.0.12` | Build Tool / Dev Server | Ultra-fast ES module bundler providing instant HMR and optimized production code splitting. |
| **React Router DOM** | `^7.18.0` | Client Routing | `createBrowserRouter` layout routes, nested outlets, and lazy route loading. |
| **i18next** | `^26.3.6` | Internationalization | Core i18n framework supporting namespace loading and language detection. |
| **react-i18next** | `^17.0.11` | React i18n Binding | Custom hooks (`useTranslation`) for dynamic text rendering and language switching. |
| **i18next-browser-languagedetector** | `^8.2.1` | Language Detection | Automatically detects user browser language preference on initial session launch. |
| **react-use-cart** | `^1.14.0` | State Management | Lightweight cart management handling additions, removals, quantities, and localStorage persistence. |
| **AOS (Animate On Scroll)** | `^2.3.4` | Scroll Animations | Smooth scroll-triggered entrance animations for landing sections. |
| **Chart.js** | `^4.5.1` | Data Visualization | HTML5 canvas chart engine powering administrative dashboards. |
| **react-chartjs-2** | `^5.3.1` | React Chart Wrapper | Declarative React components (`<Line />`, `<Bar />`, `<Doughnut />`) for Chart.js integrations. |
| **Axios** | `^1.18.1` | HTTP Client | Promise-based HTTP client pre-configured for future REST API integration. |
| **React Icons** | `^5.6.0` | Iconography | High-performance SVG icon collection (Lucide, Feather, FontAwesome). |
| **ESLint** | `^10.3.0` | Code Quality | Linter enforcing code structure and React hooks best practices. |

---

## Folder Structure

```
d:/project/myProejct/Clothing store/
├── public/                     # Static public assets (favicon, manifest, public media)
├── src/
│   ├── assets/                 # Local images, banners, icons, and media files
│   ├── components/             # Reusable global storefront components
│   │   ├── CartDrawer/         # Slide-out interactive shopping cart drawer
│   │   ├── CartToast/          # Real-time cart action notification toasts
│   │   ├── CustomSelect/       # Accessible custom styled select dropdown
│   │   ├── Footer/             # Main storefront footer component & styles
│   │   ├── Navbar/             # Main navigation header with logo & action buttons
│   │   └── common/             # Reusable UI primitives (Loaders, Skeletons, Scroll helpers)
│   │       ├── LazyImage.jsx   # Lazy image loader with skeleton fallback & fade-in
│   │       ├── PageLoader.jsx  # Global route transition loader overlay
│   │       ├── ScrollToTop.jsx # Automatic scroll position reset component
│   │       ├── SkeletonCard.jsx# Shimmer skeleton cards (product, category, detail, dashboard)
│   │       └── SkeletonTable.jsx# Shimmer skeleton tables for data grids
│   ├── context/                # React Context providers for global state
│   ├── css/                    # Global stylesheets and CSS variable tokens
│   │   └── variables.css       # CSS custom properties (colors, typography, radii, shadows)
│   ├── dashboard/              # Admin dashboard module
│   │   ├── components/         # Dashboard-specific header, sidebar, and chart widgets
│   │   ├── data/               # Mock metrics, orders, products, and analytics data
│   │   ├── layout/             # Dashboard Layout wrapper (Sidebar + Header + Outlet)
│   │   └── pages/              # Admin subpages (Analytics, Orders, Products, Customers, etc.)
│   ├── hooks/                  # Custom reusable React hooks
│   ├── i18n/                   # Translation configuration and locale JSON files
│   │   ├── LanguageSwitcher.jsx# Language toggle button component (EN / AR)
│   │   ├── index.js            # i18next initialization instance
│   │   └── locales/            # JSON translation namespaces for English and Arabic
│   ├── pages/                  # Storefront page views
│   │   ├── auth/               # Login and Register pages
│   │   ├── best-sellers/       # Best Sellers page
│   │   ├── cart/               # Full cart and checkout page view
│   │   ├── home/               # Homepage sub-sections (Header, Featured, Tech, Membership)
│   │   ├── product/            # Single Product Detail view & skeleton
│   │   └── shop/               # Store catalog grid with filters and pagination
│   ├── router/                 # React Router v7 configuration
│   │   └── Router.jsx          # Route definitions, suspense wrappers, and layout routes
│   ├── services/               # API service abstractions (Axios instances, endpoints)
│   └── utils/                  # Helper utilities (currency formatting, date formatters)
├── index.html                  # HTML entry point with meta tags & root container
├── package.json                # Project dependencies and script declarations
├── vite.config.js              # Vite build configuration & React plugin setup
└── PROJECT_DOCUMENTATION.md    # Permanent project reference documentation
```

---

## Routing Architecture

Routes are defined using React Router `createBrowserRouter` in [`src/router/Router.jsx`](file:///d:/project/myProejct/Clothing%20store/src/router/Router.jsx). Non-critical page routes are lazy-loaded via `React.lazy()` and wrapped in `<Suspense>` fallback handling.

All routes are nested inside `RootLayout`, which houses `<ScrollToTop />` and `<PageLoader />` for global navigation control.

| Route Path | Component | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `AllHome` | Eager | Storefront home page showcasing hero banner, featured products, tech features, membership, and newsletter. |
| `/shop` | `Shop` | Lazy | Main product catalog page with category filtering, sorting, grid layout, and load more pagination. |
| `/best-sellers` | `BestSellers` | Lazy | Filtered catalog view displaying top-rated and trending products. |
| `/product/:slug` | `Product` | Lazy | Single product details page featuring image gallery, size selection, specifications, and cart actions. |
| `/cart` | `Cart` | Lazy | Full shopping cart management view and order breakdown. |
| `/login` | `Login` | Lazy | User login page with form authentication inputs and social logins. |
| `/register` | `Register` | Lazy | New user registration page. |
| `/dashboard` | `DashboardLayout` | Lazy | Parent layout route for administrative control panel. |
| `/dashboard` | `DashboardHome` | Lazy | Admin overview metrics (sales, revenue, recent orders, performance charts). |
| `/dashboard/products` | `ProductsPage` | Lazy | Product management grid with search, stock counters, and edit actions. |
| `/dashboard/categories` | `CategoriesPage` | Lazy | Product category administration. |
| `/dashboard/orders` | `OrdersPage` | Lazy | Customer order management, payment status, and fulfillment tracking. |
| `/dashboard/customers` | `CustomersPage` | Lazy | Registered customer directory and activity histories. |
| `/dashboard/reviews` | `ReviewsPage` | Lazy | Customer product reviews moderation panel. |
| `/dashboard/coupons` | `CouponsPage` | Lazy | Promotional discount code management. |
| `/dashboard/analytics` | `AnalyticsPage` | Lazy | Detailed financial and visitor analytics reports. |
| `/dashboard/messages` | `MessagesPage` | Lazy | Customer support inquiries and messaging center. |
| `/dashboard/settings` | `SettingsPage` | Lazy | Store profile settings, currency, and system preferences. |
| `/dashboard/profile` | `ProfilePage` | Lazy | Admin user account profile details. |

---

## Reusable Components

### Storefront Components

#### 1. `Navbar`
- **Path**: [`src/components/Navbar/Navbar.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/Navbar/Navbar.jsx)
- **Purpose**: Top navigation bar containing brand logo ("AERO STEP"), navigation links, language toggle, and cart icon badge.
- **Key Features**: Sticky header effect on scroll, mobile hamburger menu overlay, real-time cart badge counter (`totalItems`).

#### 2. `Footer`
- **Path**: [`src/components/Footer/Footer.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/Footer/Footer.jsx)
- **Purpose**: Main footer containing brand mission statement, navigation quick links, newsletter subscription box, and copyright notice.

#### 3. `CartDrawer`
- **Path**: [`src/components/CartDrawer/CartDrawer.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/CartDrawer/CartDrawer.jsx)
- **Purpose**: Slide-out cart overlay enabling users to modify item quantities, remove items, and view price subtotal without leaving the active page.

#### 4. `LanguageSwitcher`
- **Path**: [`src/i18n/LanguageSwitcher.jsx`](file:///d:/project/myProejct/Clothing%20store/src/i18n/LanguageSwitcher.jsx)
- **Purpose**: Toggle component switching language context between English (`en`) and Arabic (`ar`). Automatically updates document direction attribute (`dir="ltr"` / `dir="rtl"`).

---

### Common Infrastructure Components (`src/components/common/`)

#### 5. `PageLoader`
- **Path**: [`src/components/common/PageLoader.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/common/PageLoader.jsx)
- **Purpose**: Full-screen Apple/Nike-style loading overlay with brand logo, smooth fade-in/fade-out transitions (300ms-500ms duration), and an animated progress bar.
- **Props**:
  - `isManualLoading` *(boolean, default: false)*: Force display during manual suspense fallbacks.

#### 6. `ScrollToTop`
- **Path**: [`src/components/common/ScrollToTop.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/common/ScrollToTop.jsx)
- **Purpose**: Invisible helper component listening to `useLocation()` state changes and invoking `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })` on every route transition.

#### 7. `SkeletonCard`
- **Path**: [`src/components/common/SkeletonCard.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/common/SkeletonCard.jsx)
- **Purpose**: Versatile shimmer skeleton component mimicking final component layout dimensions before data resolves.
- **Props**:
  - `type` *('product' | 'category' | 'product-detail' | 'dashboard')*: Skeleton layout style.
  - `count` *(number, default: 1)*: Renders grid array of skeletons when `count > 1`.
  - `className` *(string)*: Custom CSS class.

#### 8. `SkeletonTable`
- **Path**: [`src/components/common/SkeletonTable.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/common/SkeletonTable.jsx)
- **Purpose**: Shimmer skeleton table loader for data grids in dashboard views.
- **Props**:
  - `rows` *(number, default: 5)*: Number of placeholder rows.
  - `columns` *(number, default: 5)*: Number of placeholder columns.

#### 9. `LazyImage`
- **Path**: [`src/components/common/LazyImage.jsx`](file:///d:/project/myProejct/Clothing%20store/src/components/common/LazyImage.jsx)
- **Purpose**: Image wrapper component that renders a shimmer skeleton placeholder while loading, uses `loading="lazy"` & `decoding="async"`, and smoothly fades in the image upon completion.
- **Props**: `src`, `alt`, `className`, `style`.

---

## Translation & Data System (i18n)

Internationalization is powered by `i18next` and `react-i18next`. Translation resources are decoupled into modular JSON namespace files for English (`en`) and Arabic (`ar`).

### Directory Layout
```
src/i18n/locales/
├── ar/
│   ├── common.json     # Common UI strings (buttons, badges, fallbacks)
│   ├── footer.json     # Footer link labels and copyright text
│   ├── home.json       # Hero section headers, tech features, membership text
│   ├── navbar.json     # Navigation link titles and action tooltips
│   └── shop.json       # Catalog filter titles, sorting labels, load more
└── en/
    ├── common.json
    ├── footer.json
    ├── home.json
    ├── navbar.json
    └── shop.json
```

### RTL & LTR Handling
When language is changed via `<LanguageSwitcher />`:
1. `i18n.changeLanguage(newLang)` updates language state.
2. `document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr')` dynamically switches document text flow direction.
3. CSS rules in [`src/css/variables.css`](file:///d:/project/myProejct/Clothing%20store/src/css/variables.css) automatically switch font family definitions:
   - **LTR Font**: `'Outfit', -apple-system, sans-serif`
   - **RTL Font**: `'Cairo', 'Tajawal', sans-serif`

---

## Styling & Design System

The application relies on Vanilla CSS utilizing CSS Custom Properties (Variables) defined in [`src/css/variables.css`](file:///d:/project/myProejct/Clothing%20store/src/css/variables.css). This guarantees maximum styling flexibility without dependency bloat.

### Design Tokens Palette

```css
:root {
  /* Brand Palette (Aero Step Dark Olive & Accent) */
  --primary: #515546;
  --primary-hover: #3F4236;
  --primary-light: #F2F4EE;

  --secondary: #F5F6F2;
  --accent: #EBB437;
  --success: #86A17B;
  --warning: #EBB437;
  --danger: #DC6860;

  /* Backgrounds & Surfaces */
  --bg: #FFFFFF;
  --bg-secondary: #F8F9F5;
  --surface: #F5F6F2;
  --surface-hover: #ECEEE8;

  /* Typography Colors */
  --text-primary: #1A1A1A;
  --text-secondary: #5F6358;
  --text-muted: #969A8E;
  --text-white: #FFFFFF;

  /* Borders & Shadows */
  --border: #E2E4DC;
  --border-light: #EFF1EA;
  --shadow-color: #00000014;

  /* Typography */
  --font-en: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-ar: 'Cairo', 'Tajawal', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Accessibility & Reduced Motion
The styling system respects user accessibility preferences:
```css
@media (prefers-reduced-motion: reduce) {
  [data-aos],
  .page-loader-overlay,
  .shimmer::after {
    transition: none !important;
    animation: none !important;
  }
}
```

---

## Performance Optimizations

1. **Route-Level Code Splitting**: All non-critical pages (`Shop`, `Cart`, `Dashboard`, `Auth`) are loaded lazily via `React.lazy()`. Initial bundle size is reduced dramatically.
2. **Global Route Transitions**: `<PageLoader />` prevents visual flash of unstyled content during bundle fetching.
3. **Instant Scroll Reset**: `<ScrollToTop />` resets window coordinates on navigation, eliminating sticky scroll bugs.
4. **Asynchronous Image Loading**: `<LazyImage />` enforces `loading="lazy"` and `decoding="async"` while serving shimmer skeleton placeholders.
5. **Component Memoization**: Core navigation components (such as `<Navbar />`) are wrapped in `React.memo` to eliminate unnecessary re-renders during state mutations.
6. **Hardware-Accelerated CSS Transitions**: Animations leverage `transform` and `opacity` to maintain 60 FPS rendering on mobile devices.

---

## Dashboard Architecture

The administrative panel (`/dashboard`) is constructed with a modular sub-system:

- **Layout Container** (`DashboardLayout`): Controls sidebar state, top header bar, notification popovers, and renders nested sub-routes inside an `<Outlet />`.
- **Navigation Sidebar**: Left sidebar containing direct navigation links to administrative modules (Analytics, Orders, Products, Categories, Customers, Reviews, Coupons, Messages, Settings).
- **Interactive Analytics**: Integrated with `Chart.js` and `react-chartjs-2` to render financial revenue line charts and category sales breakdown charts.
- **Data Table Skeletons**: Integrated `<SkeletonTable />` loaders prevent UI layout shift during async data fetch queries.

---

## Coding Standards & Guidelines

### File Naming Conventions
- **React Components**: PascalCase (`PageLoader.jsx`, `SkeletonCard.jsx`).
- **Stylesheets**: Co-located with component matching name (`PageLoader.css`, `SkeletonCard.css`).
- **Utility / Config Files**: camelCase (`variables.css`, `index.js`).

### Component Structure Rule
Every functional component must follow this declaration layout:
1. React & third-party imports.
2. Internal sub-component imports.
3. Component interface / JSX signature.
4. Hook declarations (`useLocation`, `useState`, `useEffect`).
5. Event handlers.
6. JSX Return statement.
7. Export statement.

---

## Architectural Decisions & Important Notes

- **Why Vite instead of Create React App?** Vite provides instant server start times (< 300ms) and lightning-fast HMR via native ES modules.
- **Why Vanilla CSS Custom Properties over Tailwind CSS?** Keeps CSS output lightweight, eliminates purge setup overhead, and offers full native support for dynamic theme variables.
- **Why layout routes in React Router `createBrowserRouter`?** Allows single global mount point for `<ScrollToTop />` and `<PageLoader />` without repeating layout logic in every page view.

---

## Future Improvements (TODO List)

- [ ] **Backend API Integration**: Connect storefront and dashboard data queries to Node.js/Express or NestJS REST API.
- [ ] **User Authentication & JWT**: Integrate real authentication token storage, refresh tokens, and protected route guards.
- [ ] **Payment Gateway**: Integrate Stripe or PayPal SDK for checkout authorization.
- [ ] **Wishlist Persistence**: Implement user wishlist functionality with local storage sync and API persistence.
- [ ] **Search & Filter API**: Implement real-time debounced product search with backend indexing.
- [ ] **Dark Theme Toggle**: Add dark mode color variable overrides in `variables.css`.
- [ ] **Progressive Web App (PWA)**: Register service worker for offline catalog browsing and push notifications.

---

## Installation & Commands

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation
```bash
# Clone repository
git clone https://github.com/username/clothing-store.git

# Navigate into directory
cd "Clothing store"

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Starts Vite dev server at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Compiles production assets into `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## Deployment Guide

### Vercel Deployment
1. Import repository to Vercel.
2. Set Build Command: `npm run build`.
3. Set Output Directory: `dist`.
4. Create a `vercel.json` rewrite file in root for SPA client routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Netlify Deployment
1. Create `public/_redirects` file:
```
/*    /index.html   200
```
2. Deploy via Netlify CLI or Git connection with build command `npm run build` and directory `dist`.

---

## Changelog

### Version 1.2.0 (Current)
- Added global `PageLoader` component with Apple/Nike-style loading overlay.
- Added global `ScrollToTop` router reset component.
- Implemented `SkeletonCard`, `SkeletonTable`, and `LazyImage` shimmer loaders.
- Refactored `Router.jsx` to use top-level `RootLayout`.

### Version 1.1.0
- Added complete bilingual Arabic (RTL) & English (LTR) i18n system.
- Implemented `react-use-cart` slide-out drawer integration.

### Version 1.0.0
- Initial project release featuring storefront home, product catalog, and admin dashboard.

---

## Developer Onboarding Notes

If you are a new developer joining this project:
1. Check [`src/css/variables.css`](file:///d:/project/myProejct/Clothing%20store/src/css/variables.css) to understand color tokens before writing custom styles.
2. Always import reusable skeleton UI components from `src/components/common/` when introducing new data-fetching views.
3. Wrap newly created routes under `createBrowserRouter` in [`src/router/Router.jsx`](file:///d:/project/myProejct/Clothing%20store/src/router/Router.jsx) to inherit global route transitions automatically.
