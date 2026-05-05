import { createBrowserRouter } from 'react-router';
import { RootLayout } from './pages/RootLayout';
import { HomePage } from './pages/HomePage';
import { MedicinesPage } from './pages/MedicinesPage';
import { ShopsPage } from './pages/ShopsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { LoginPage } from './pages/LoginPage';
import { useOutletContext } from 'react-router';
import type { Medicine } from './components/MedicineCard';

export interface OutletContext {
  onAddToCart: (medicine: Medicine, shop: string) => void;
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
        Component: () => {
          const { onAddToCart } = useOutletContext<OutletContext>();
          return <HomePage onAddToCart={onAddToCart} />;
        },
      },
      {
        path: 'medicines',
        Component: () => {
          const { onAddToCart } = useOutletContext<OutletContext>();
          return <MedicinesPage onAddToCart={onAddToCart} />;
        },
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
