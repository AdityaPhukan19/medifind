import { createBrowserRouter } from 'react-router';
import { RootLayout } from './pages/RootLayout';
import { HomePage } from './pages/HomePage';
import { MedicinesPage } from './pages/MedicinesPage';
import { ShopsPage } from './pages/ShopsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { LoginPage } from './pages/LoginPage';
import type { Medicine } from './components/MedicineCard';

export interface OutletContext {
  onAddToCart: (medicine: Medicine, shop: string) => void;
  nearbyShops: string[];
  setNearbyShops: (shops: string[]) => void;
}

export const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    Component: LoginPage,
  },
  {
    path: '/home',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'medicines',
        Component: MedicinesPage,
      },
      {
        path: 'shops',
        Component: ShopsPage,
      },
      {
        path: 'categories',
        Component: CategoriesPage,
      },
    ],
  },
]);
