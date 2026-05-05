# MediFind - Medicine Availability Finder

A modern web application that helps users find medicines across nearby pharmacies and shops. MediFind provides an intuitive interface to search for medicines, check availability, compare prices, and manage shopping carts.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Architecture](#project-architecture)
- [Key Components](#key-components)
- [Pages & Routes](#pages--routes)
- [Dependencies](#dependencies)
- [Configuration](#configuration)

---

## 🎯 Project Overview

**MediFind** is a full-featured medicine finder platform built with modern web technologies. It enables users to:
- Securely authenticate as a user or admin with role-based access
- Search and browse medicines
- Check medicine availability at nearby shops
- Compare prices across different pharmacies
- Manage a shopping cart
- Explore medicine categories
- Find nearby medical shops

The application features a beautiful green-themed design with smooth animations and transitions, providing an elegant and intuitive interface that works seamlessly on desktop and mobile devices.

---

## ✨ Features

### Core Features
- **Authentication System**: Secure user and admin login with role-based access control
- **Medicine Search & Discovery**: Browse and search through a comprehensive medicine catalog
- **Real-time Availability**: Check medicine stock and availability at nearby pharmacies
- **Price Comparison**: Compare prices across different shops and locations
- **Shopping Cart**: Add medicines to cart and manage purchases
- **Shop Locator**: Find pharmacies nearby with distance information
- **Category Browsing**: Browse medicines by categories
- **Prescription Tracking**: Identify prescription-required medicines (Rx)

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI Components**: Rich, interactive components from Radix UI
- **Smooth Animations**: Delightful transitions and animations using Motion library
- **Location-Based**: Distance-aware shop availability
- **Visual Feedback**: Toast notifications using Sonner
- **Accessibility**: Built with accessibility best practices

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1**: UI library
- **React Router 7.13.0**: Client-side routing
- **TypeScript**: Static type checking and better developer experience

### Build & Development Tools
- **Vite 6.3.5**: Next-generation frontend build tool with lightning-fast HMR
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **ESLint**: Code quality and consistency

### UI Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives
  - Accordion, Alert Dialog, Avatar, Badge, Button, Calendar, Card, Carousel
  - Checkbox, Collapsible, Context Menu, Dialog, Dropdown Menu, Hover Card
  - Input OTP, Label, Menubar, Navigation Menu, Pagination, Popover
  - Progress, Radio Group, Scroll Area, Select, Slider, Switch, Table, Tabs
  - Toggle, Tooltip, and more
- **Material-UI (MUI)**: Alternative UI component set
- **Lucide React**: Beautiful, consistent icon library

### Form & Data Management
- **React Hook Form 7.55.0**: Efficient form state management
- **Date FNS 3.6.0**: Date utility functions
- **Input OTP**: OTP input component

### Visual Effects & Animations
- **Motion 12.23.24**: Animation library
- **Canvas Confetti 1.9.4**: Confetti effects
- **React Slick**: Carousel/slider component
- **Embla Carousel**: Another carousel library
- **Recharts 2.15.2**: Data visualization charts

### Additional Libraries
- **React DND**: Drag and drop functionality
- **React Resizable Panels**: Resizable panel layouts
- **Responsive Masonry**: Masonry layout for images
- **Sonner 2.0.3**: Toast notifications
- **Next Themes 0.4.6**: Theme management
- **Emotion**: CSS-in-JS styling
- **Vaul**: Drawer component
- **CMDK**: Command palette/search component

### Styling
- **Tailwind CSS**: Utility-first CSS
- **Tailwind Merge**: Smart Tailwind class merging
- **Class Variance Authority**: Component variant management
- **CLSX**: Conditional className utility

---

## 📁 Project Structure

```
frontend/
├── eslint.config.js              # ESLint configuration
├── index.html                    # Main HTML entry point
├── package.json                  # Project dependencies & scripts
├── tsconfig.json                 # TypeScript base configuration
├── tsconfig.app.json             # TypeScript app configuration
├── tsconfig.node.json            # TypeScript node configuration
├── vite.config.ts                # Vite build configuration
│
├── public/                        # Static assets
│   └── hero-bg.avif              # Hero background image
│
└── src/
    ├── main.tsx                  # React entry point
    │
    ├── app/
    │   ├── App.tsx               # Main App component with router
    │   ├── routes.tsx            # Route definitions & configuration
    │   │
    │   ├── components/           # Reusable UI components
    │   │   ├── AvailabilityModal.tsx      # Modal for medicine availability
    │   │   ├── Cart.tsx                   # Shopping cart component
    │   │   ├── Header.tsx                 # Navigation header
    │   │   ├── MedicineCard.tsx           # Medicine display card
    │   │   ├── ShopCard.tsx               # Shop/pharmacy card
    │   │   ├── background.avif            # Background image
    │   │   ├── premium_photo-*.avif       # Premium images
    │   │   │
    │   │   ├── figma/
    │   │   │   └── ImageWithFallback.tsx  # Image component with fallback
    │   │   │
    │   │   └── ui/               # Shadcn/Radix UI components
    │   │       ├── accordion.tsx
    │   │       ├── alert-dialog.tsx
    │   │       ├── alert.tsx
    │   │       ├── aspect-ratio.tsx
    │   │       ├── avatar.tsx
    │   │       ├── badge.tsx
    │   │       ├── breadcrumb.tsx
    │   │       ├── button.tsx
    │   │       ├── calendar.tsx
    │   │       ├── card.tsx
    │   │       ├── carousel.tsx
    │   │       ├── chart.tsx
    │   │       ├── checkbox.tsx
    │   │       ├── collapsible.tsx
    │   │       ├── command.tsx
    │   │       ├── context-menu.tsx
    │   │       ├── dialog.tsx
    │   │       ├── drawer.tsx
    │   │       ├── dropdown-menu.tsx
    │   │       ├── form.tsx
    │   │       ├── hover-card.tsx
    │   │       ├── input-otp.tsx
    │   │       ├── input.tsx
    │   │       ├── label.tsx
    │   │       ├── menubar.tsx
    │   │       ├── navigation-menu.tsx
    │   │       ├── pagination.tsx
    │   │       ├── popover.tsx
    │   │       ├── progress.tsx
    │   │       ├── radio-group.tsx
    │   │       ├── resizable.tsx
    │   │       ├── scroll-area.tsx
    │   │       ├── select.tsx
    │   │       ├── separator.tsx
    │   │       ├── sheet.tsx
    │   │       ├── sidebar.tsx
    │   │       ├── skeleton.tsx
    │   │       ├── slider.tsx
    │   │       ├── sonner.tsx
    │   │       ├── switch.tsx
    │   │       ├── table.tsx
    │   │       ├── tabs.tsx
    │   │       ├── textarea.tsx
    │   │       ├── toggle-group.tsx
    │   │       ├── toggle.tsx
    │   │       ├── tooltip.tsx
    │   │       ├── use-mobile.ts
    │   │       └── utils.ts
    │   │
    │   └── pages/                # Page components (routed pages)
    │       ├── HomePage.tsx              # Home/landing page
    │       ├── MedicinesPage.tsx         # Medicines listing page
    │       ├── ShopsPage.tsx             # Shops directory page
    │       ├── CategoriesPage.tsx        # Medicine categories page
    │       └── RootLayout.tsx            # Root layout wrapper
    │
    └── styles/                   # Global styles
        ├── animations.css        # Custom animations
        ├── fonts.css             # Font definitions
        ├── globals.css           # Global CSS
        ├── index.css             # CSS index/imports
        ├── tailwind.css          # Tailwind directives
        └── theme.css             # Theme variables & customization
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16.x or higher
- **npm** or **pnpm**: Package manager
- **Git**: For version control

### System Requirements

- OS: Windows, macOS, or Linux
- RAM: Minimum 2GB (4GB recommended)
- Storage: 500MB free space

---

## 📦 Installation

### Step 1: Clone/Navigate to Project

```bash
cd c:\Users\adity\Desktop\Medicine\frontend
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using pnpm (recommended):
```bash
pnpm install
```

### Step 3: Verify Installation

```bash
npm run dev --version
```

---

## 💻 Development

### Start Development Server

```bash
npm run dev
# or
npm start
```

The development server will start at `http://localhost:5173` (or another port if 5173 is in use).

**Development Features:**
- Hot Module Replacement (HMR) for instant updates
- Fast refresh on file changes
- Source maps for debugging
- Type checking with TypeScript

### Development Workflow

1. Make changes to files in `src/`
2. Changes automatically compile and refresh in browser
3. Use browser DevTools for debugging
4. Check terminal for TypeScript/ESLint errors

### Running ESLint

```bash
npm run lint
```

---

## 🏗️ Building for Production

### Build Command

```bash
npm run build
```

This command:
- Compiles TypeScript to JavaScript
- Optimizes and minifies code
- Bundles assets with Vite
- Outputs production files to `dist/` directory

### Build Output

- Production-ready files in `dist/` folder
- Optimized bundle sizes
- Asset fingerprinting for cache busting
- Source maps (optional) for debugging

### Production Deployment

1. Build the project: `npm run build`
2. Deploy `dist/` folder to your hosting platform
3. Configure server for SPA routing (redirect all routes to `index.html`)

---

## 🏛️ Project Architecture

### Application Flow

```
index.html → main.tsx → App.tsx → RouterProvider
                                    ↓
                            RootLayout (wrapper)
                                    ↓
        ┌───────┬───────────┬──────────┴──────┐
        ↓       ↓           ↓                   ↓
    HomePage  MedicinesPage ShopsPage  CategoriesPage
```

### Component Hierarchy

```
App
└── RootLayout
    ├── Header (Navigation)
    ├── Cart (Shopping Cart)
    └── Page Content
        ├── MedicineCard (product display)
        ├── ShopCard (pharmacy info)
        └── AvailabilityModal (availability details)
```

### Data Flow

- **Context API**: Outlet context for passing `onAddToCart` callback
- **React Router**: Client-side routing
- **Component Props**: Data passing through component hierarchy
- **Local State**: Component-level state management

---

## 🧩 Key Components

### LoginPage
- **Location**: [src/app/pages/LoginPage.tsx](src/app/pages/LoginPage.tsx)
- **Purpose**: Authentication and access control
- **Features**:
  - Dual login options: User and Admin
  - Email validation with regex pattern matching
  - Password visibility toggle
  - Beautiful green-themed design with smooth animations
  - Loading states and success feedback
  - Form error handling and display
  - Role-based local storage for session management
  - Responsive design with modern UI elements

### MedicineCard
- **Location**: [src/app/components/MedicineCard.tsx](src/app/components/MedicineCard.tsx)
- **Purpose**: Displays a single medicine with details, availability, and actions
- **Props**: 
  - `medicine`: Medicine object with details
  - `onAddToCart`: Callback to add to cart
  - `onCheckAvailability`: Callback to check availability
- **Features**: 
  - Shows price, generic name, category
  - Displays prescription requirement (Rx)
  - Shows availability at different shops

### Header
- **Location**: [src/app/components/Header.tsx](src/app/components/Header.tsx)
- **Purpose**: Navigation and branding
- **Features**:
  - Active route highlighting
  - Shopping cart counter
  - Navigation links to all pages
  - Responsive mobile menu

### Cart
- **Location**: [src/app/components/Cart.tsx](src/app/components/Cart.tsx)
- **Purpose**: Shopping cart management
- **Features**:
  - Add/remove medicines
  - Quantity adjustment
  - Price calculation

### AvailabilityModal
- **Location**: [src/app/components/AvailabilityModal.tsx](src/app/components/AvailabilityModal.tsx)
- **Purpose**: Shows detailed availability info for a medicine
- **Features**:
  - List all shops with stock status
  - Distance information
  - Price comparison

### ShopCard
- **Location**: [src/app/components/ShopCard.tsx](src/app/components/ShopCard.tsx)
- **Purpose**: Displays pharmacy/shop information
- **Features**:
  - Shop name and location
  - Distance from user
  - Operating status

---

## 📄 Pages & Routes

### Route Configuration

All routes are defined in [src/app/routes.tsx](src/app/routes.tsx)

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | LoginPage | Authentication page with user and admin login options |
| `/home` | HomePage | Landing page with featured medicines |
| `/home/medicines` | MedicinesPage | Complete medicine catalog |
| `/home/shops` | ShopsPage | Pharmacy/shop directory |
| `/home/categories` | CategoriesPage | Browse by medicine category |

### Root Layout
- **Location**: [src/app/pages/RootLayout.tsx](src/app/pages/RootLayout.tsx)
- **Purpose**: Main wrapper for all pages
- **Contains**: Header, navigation, cart management
- **Provides**: Outlet context for child routes

---

## 📚 Dependencies

### Production Dependencies (Major)

#### UI Component Libraries
- `@radix-ui/*`: Headless UI components (30+ packages)
- `@mui/material`: Material Design components
- `lucide-react`: Icon library

#### Framework & Routing
- `react`: React library
- `react-dom`: React DOM rendering
- `react-router`: Client-side routing

#### Styling
- `tailwindcss`: Utility-first CSS framework
- `emotion`: CSS-in-JS
- `class-variance-authority`: Component variants

#### Form & Data
- `react-hook-form`: Form state management
- `date-fns`: Date utilities

#### UI Enhancements
- `sonner`: Toast notifications
- `motion`: Animation library
- `canvas-confetti`: Confetti effects

#### Advanced Features
- `react-dnd`: Drag and drop
- `react-resizable-panels`: Resizable layouts
- `recharts`: Data visualization
- `react-slick`: Carousel component

### Development Dependencies

- `vite`: Build tool
- `@vitejs/plugin-react`: React support for Vite
- `@tailwindcss/vite`: Tailwind CSS Vite plugin
- TypeScript support

For complete dependencies, see [package.json](frontend/package.json)

---

## ⚙️ Configuration

### Vite Configuration
- **Location**: [vite.config.ts](frontend/vite.config.ts)
- **Key Settings**:
  - React plugin for JSX/TSX support
  - Tailwind CSS integration
  - Path alias `@` pointing to `src/` directory
  - Asset includes for SVG and CSV files

### TypeScript Configuration
- **Base**: [tsconfig.json](frontend/tsconfig.json) - Base compiler options
- **App**: [tsconfig.app.json](frontend/tsconfig.app.json) - App-specific settings
- **Node**: [tsconfig.node.json](frontend/tsconfig.node.json) - Build tool settings

### Tailwind CSS
- **Location**: [src/styles/tailwind.css](src/styles/tailwind.css)
- **Theme**: Customized in [src/styles/theme.css](src/styles/theme.css)
- **Version**: 4.1.12 with latest features

### ESLint
- **Location**: [eslint.config.js](frontend/eslint.config.js)
- **Purpose**: Code quality and consistency

---

## 🎨 Styling System

### Global Styles
- **[globals.css](src/styles/globals.css)**: Global CSS resets and base styles
- **[theme.css](src/styles/theme.css)**: Theme variables (colors, spacing, etc.)
- **[animations.css](src/styles/animations.css)**: Custom animations
- **[fonts.css](src/styles/fonts.css)**: Font imports and declarations

### Design System
- **Color Scheme**: Green/Emerald gradient (medical theme)
- **Components**: Shadows, borders, and rounded corners from Radix UI
- **Responsive**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode Support**: Next Themes integration ready

---

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically use the next available port. Check terminal output for the actual URL.

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npm run build
```

### Hot Module Replacement Not Working
- Check browser console for errors
- Refresh the page manually (F5)
- Restart development server

---

## 📝 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with HMR |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Build optimized production bundle |
| `npm run lint` | Run ESLint for code quality |

---

## 🤝 Contributing

When working on this project:

1. Ensure TypeScript compiles without errors
2. Follow the existing component structure
3. Use Radix UI components from the `ui/` folder
4. Keep styling consistent with Tailwind CSS
5. Test responsive design on multiple screen sizes
6. Use meaningful component and variable names

---

## 📞 Support & Documentation

### Helpful Resources

- **React Documentation**: https://react.dev
- **Vite Guide**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com
- **React Router**: https://reactrouter.com

### Project-Specific Questions

Refer to component files for implementation details and comments.

---

## 📄 License

This project is private and for internal use only.

---

## 📊 Project Statistics

- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Components**: 40+ Radix UI components
- **Total Dependencies**: 50+
- **Code Style**: ESLint enforced

---

**Last Updated**: May 5, 2026

For questions or issues, refer to the component implementations in the `src/app/components/` and `src/app/pages/` directories.
