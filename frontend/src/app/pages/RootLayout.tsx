import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Cart } from '../components/Cart';
import type { CartItem } from '../components/Cart';
import type { Medicine } from '../components/MedicineCard';
import {
  catalogMedicines,
  initialSellerInventory,
  initialSellerOrders,
  sellerInventoryToMedicines,
} from '../data/medicineData';
import type { SellerInventoryItem, SellerOrder } from '../data/medicineData';

function readStoredState<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
}

export function RootLayout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sellerShopName, setSellerShopName] = useState(
    () => localStorage.getItem('sellerPharmacyName') || 'MediFind Verified Pharmacy'
  );
  const [sellerInventory, setSellerInventory] = useState<SellerInventoryItem[]>(
    () => readStoredState('sellerInventory', initialSellerInventory)
  );
  const [sellerOrders, setSellerOrders] = useState<SellerOrder[]>(
    () => readStoredState('sellerOrders', initialSellerOrders)
  );
  const [nearbyShops, setNearbyShops] = useState<string[]>([
    'M/S MAA MEDICOS',
    'Pronima Medical Hall',
    'Naya Jeevan Medical',
    'Borah Medical',
    'Joyguru Medical Store',
    'Maa Gunalata Medical',
  ]);
  const sellerMedicines = sellerInventoryToMedicines(sellerInventory, sellerShopName);
  const mergedCatalogMedicines = catalogMedicines.map((medicine) => {
      const sellerMatch = sellerMedicines.find(
        (sellerMedicine) => sellerMedicine.name.toLowerCase() === medicine.name.toLowerCase()
      );

      if (!sellerMatch) return medicine;

      return {
        ...medicine,
        availability: [...sellerMatch.availability, ...medicine.availability],
        price: Math.min(sellerMatch.price, medicine.price),
      };
    });
  const sellerOnlyMedicines = sellerMedicines.filter(
    (sellerMedicine) =>
      !catalogMedicines.some(
        (medicine) => medicine.name.toLowerCase() === sellerMedicine.name.toLowerCase()
      )
  );
  const medicines = [...sellerOnlyMedicines, ...mergedCatalogMedicines];

  useEffect(() => {
    localStorage.setItem('sellerInventory', JSON.stringify(sellerInventory));
  }, [sellerInventory]);

  useEffect(() => {
    localStorage.setItem('sellerOrders', JSON.stringify(sellerOrders));
  }, [sellerOrders]);

  useEffect(() => {
    localStorage.setItem('sellerPharmacyName', sellerShopName);
  }, [sellerShopName]);

  const handleAddToCart = (medicine: Medicine, shop: string) => {
    const shopAvailability = medicine.availability.find((a) => a.shopName === shop);
    if (!shopAvailability) return;

    const existingItem = cartItems.find(
      (item) => item.id === `${medicine.id}-${shop}`
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === `${medicine.id}-${shop}`
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: `${medicine.id}-${shop}`,
          name: medicine.name,
          shop,
          price: shopAvailability.price,
          quantity: 1,
          image: medicine.image,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = (details: {
    customer: string;
    phone: string;
    address: string;
    deliveryMode: 'Delivery' | 'Pickup';
  }) => {
    const sellerCartItems = cartItems.filter((item) => item.shop === sellerShopName);
    const newOrders = sellerCartItems.map((item, index) => {
      const inventoryItem = sellerInventory.find(
        (medicine) => medicine.name.toLowerCase() === item.name.toLowerCase()
      );

      return {
        id: `ORD-${Date.now()}-${index + 1}`,
        customer: details.customer,
        phone: details.phone,
        address: details.address,
        deliveryMode: details.deliveryMode,
        medicine: item.name,
        amount: Math.round(item.price * item.quantity * 80),
        quantity: item.quantity,
        status: 'New' as const,
        prescription: Boolean(inventoryItem?.prescription),
      };
    });

    if (newOrders.length > 0) {
      setSellerOrders((orders) => [...newOrders, ...orders]);
      setSellerInventory((items) =>
        items.map((item) => {
          const cartItem = sellerCartItems.find(
            (cartItem) => cartItem.name.toLowerCase() === item.name.toLowerCase()
          );

          if (!cartItem) return item;

          return {
            ...item,
            stock: Math.max(0, item.stock - cartItem.quantity),
            sales: item.sales + cartItem.quantity,
          };
        })
      );
    }

    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/30">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Outlet
        context={{
          onAddToCart: handleAddToCart,
          nearbyShops,
          setNearbyShops,
          medicines,
          sellerInventory,
          setSellerInventory,
          sellerOrders,
          setSellerOrders,
          sellerShopName,
          setSellerShopName,
        }}
      />

      <footer className="bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💊</span>
                </div>
                <span className="text-xl font-semibold">MediFind</span>
              </div>
              <p className="text-green-200 text-sm">
                Your trusted partner for finding and ordering medicines from verified pharmacies across India.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">License</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 mt-8 pt-8 text-center text-sm text-green-200">
            © 2026 MediFind. All rights reserved.
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
