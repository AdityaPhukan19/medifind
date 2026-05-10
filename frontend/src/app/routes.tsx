import { createBrowserRouter } from 'react-router';
import type { Dispatch, SetStateAction } from 'react';
import { RootLayout } from './pages/RootLayout';
import { HomePage } from './pages/HomePage';
import { MedicinesPage } from './pages/MedicinesPage';
import { ShopsPage } from './pages/ShopsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { LoginPage } from './pages/LoginPage';
import { SellerPage } from './pages/SellerPage';
import type { Medicine } from './components/MedicineCard';
import type { SellerInventoryItem, SellerOrder } from './data/medicineData';

export interface OutletContext {
  onAddToCart: (medicine: Medicine, shop: string) => void;
  nearbyShops: string[];
  setNearbyShops: (shops: string[]) => void;
  medicines: Medicine[];
  sellerInventory: SellerInventoryItem[];
  setSellerInventory: Dispatch<SetStateAction<SellerInventoryItem[]>>;
  sellerOrders: SellerOrder[];
  setSellerOrders: Dispatch<SetStateAction<SellerOrder[]>>;
  sellerShopName: string;
  setSellerShopName: (shopName: string) => void;
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
      {
        path: 'seller',
        Component: SellerPage,
      },
    ],
  },
]);
