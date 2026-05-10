import type { Medicine } from '../components/MedicineCard';
import amoxicillinImg from '../components/Amoxicillin250mg.webp';
import paracetamolImg from '../components/paracetamol500mg.webp';
import ibuprofenImg from '../components/ibuprofen400mg.webp';
import cetirizineImg from '../components/cetirizine10mg.webp';
import metforminImg from '../components/metformin500mg.webp';
import vitaminD3Img from '../components/vitaminD3100iu.jpg';
import aspirinImg from '../components/aspirin100mg.webp';
import omeprazoleImg from '../components/omeprazole20mg.webp';
import lisinoprilImg from '../components/lisinopril10mg.webp';

export interface SellerInventoryItem {
  id: number;
  name: string;
  genericName: string;
  category: string;
  batch: string;
  expiry: string;
  stock: number;
  price: number;
  prescription: boolean;
  listed: boolean;
  draft: boolean;
  imageUrl: string;
  discount: number;
  minStock: number;
  sales: number;
  deliveryEligible: boolean;
}

export interface SellerOrder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  deliveryMode: 'Delivery' | 'Pickup';
  medicine: string;
  amount: number;
  quantity: number;
  status: 'New' | 'Accepted' | 'Packed' | 'Out for Delivery' | 'Completed';
  prescription: boolean;
}

export const catalogMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    price: 5.99,
    image: paracetamolImg,
    category: 'Pain Relief',
    prescription: false,
    availability: [
      { shopName: 'HealthPlus Pharmacy', distance: '0.5 mi', stock: 45, price: 5.99 },
      { shopName: 'MediCare Center', distance: '0.8 mi', stock: 23, price: 6.49 },
      { shopName: 'Quick Meds', distance: '1.2 mi', stock: 67, price: 5.79 },
    ],
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    price: 12.99,
    image: amoxicillinImg,
    category: 'Antibiotic',
    prescription: true,
    availability: [
      { shopName: 'HealthPlus Pharmacy', distance: '0.5 mi', stock: 12, price: 12.99 },
      { shopName: 'City Pharmacy', distance: '1.5 mi', stock: 8, price: 13.49 },
    ],
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    price: 7.49,
    image: ibuprofenImg,
    category: 'Anti-inflammatory',
    prescription: false,
    availability: [
      { shopName: 'MediCare Center', distance: '0.8 mi', stock: 34, price: 7.49 },
      { shopName: 'Quick Meds', distance: '1.2 mi', stock: 56, price: 7.29 },
      { shopName: 'Family Pharmacy', distance: '2.0 mi', stock: 41, price: 7.99 },
    ],
  },
  {
    id: '4',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine HCl',
    price: 8.99,
    image: cetirizineImg,
    category: 'Antihistamine',
    prescription: false,
    availability: [
      { shopName: 'HealthPlus Pharmacy', distance: '0.5 mi', stock: 28, price: 8.99 },
      { shopName: 'Quick Meds', distance: '1.2 mi', stock: 19, price: 8.49 },
    ],
  },
  {
    id: '5',
    name: 'Metformin 500mg',
    genericName: 'Metformin HCl',
    price: 15.99,
    image: metforminImg,
    category: 'Diabetes',
    prescription: true,
    availability: [
      { shopName: 'MediCare Center', distance: '0.8 mi', stock: 15, price: 15.99 },
      { shopName: 'City Pharmacy', distance: '1.5 mi', stock: 22, price: 16.49 },
      { shopName: 'HealthPlus Pharmacy', distance: '0.5 mi', stock: 11, price: 15.79 },
    ],
  },
  {
    id: '6',
    name: 'Vitamin D3 1000 IU',
    genericName: 'Cholecalciferol',
    price: 9.99,
    image: vitaminD3Img,
    category: 'Supplement',
    prescription: false,
    availability: [
      { shopName: 'Quick Meds', distance: '1.2 mi', stock: 78, price: 9.99 },
      { shopName: 'Family Pharmacy', distance: '2.0 mi', stock: 92, price: 9.49 },
    ],
  },
  {
    id: '7',
    name: 'Aspirin 100mg',
    genericName: 'Acetylsalicylic Acid',
    price: 4.99,
    image: aspirinImg,
    category: 'Pain Relief',
    prescription: false,
    availability: [
      { shopName: 'HealthPlus Pharmacy', distance: '0.5 mi', stock: 52, price: 4.99 },
      { shopName: 'Quick Meds', distance: '1.2 mi', stock: 38, price: 4.79 },
    ],
  },
  {
    id: '8',
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    price: 11.49,
    image: omeprazoleImg,
    category: 'Digestive Health',
    prescription: false,
    availability: [
      { shopName: 'MediCare Center', distance: '0.8 mi', stock: 21, price: 11.49 },
      { shopName: 'City Pharmacy', distance: '1.5 mi', stock: 16, price: 11.99 },
    ],
  },
  {
    id: '9',
    name: 'Lisinopril 10mg',
    genericName: 'Lisinopril',
    price: 13.99,
    image: lisinoprilImg,
    category: 'Blood Pressure',
    prescription: true,
    availability: [
      { shopName: 'HealthPlus Pharmacy', distance: '0.5 mi', stock: 18, price: 13.99 },
      { shopName: 'MediCare Center', distance: '0.8 mi', stock: 25, price: 14.49 },
    ],
  },
];

export const initialSellerInventory: SellerInventoryItem[] = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    batch: 'PCM-0526',
    expiry: '2027-04',
    stock: 82,
    price: 28,
    prescription: false,
    listed: true,
    draft: false,
    imageUrl: '',
    discount: 5,
    minStock: 25,
    sales: 154,
    deliveryEligible: true,
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    category: 'Antibiotic',
    batch: 'AMX-2201',
    expiry: '2026-11',
    stock: 14,
    price: 96,
    prescription: true,
    listed: true,
    draft: false,
    imageUrl: '',
    discount: 0,
    minStock: 20,
    sales: 81,
    deliveryEligible: false,
  },
  {
    id: 3,
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine HCl',
    category: 'Antihistamine',
    batch: 'CTZ-9014',
    expiry: '2027-08',
    stock: 46,
    price: 42,
    prescription: false,
    listed: true,
    draft: false,
    imageUrl: '',
    discount: 8,
    minStock: 18,
    sales: 109,
    deliveryEligible: true,
  },
  {
    id: 4,
    name: 'Metformin 500mg',
    genericName: 'Metformin HCl',
    category: 'Diabetes',
    batch: 'MTF-7710',
    expiry: '2026-09',
    stock: 9,
    price: 74,
    prescription: true,
    listed: false,
    draft: true,
    imageUrl: '',
    discount: 0,
    minStock: 24,
    sales: 67,
    deliveryEligible: false,
  },
];

export const initialSellerOrders: SellerOrder[] = [
  {
    id: 'ORD-1204',
    customer: 'Riya Das',
    phone: '+91 90000 12004',
    address: 'Dhemaji town, Assam',
    deliveryMode: 'Delivery',
    medicine: 'Paracetamol 500mg',
    amount: 84,
    quantity: 3,
    status: 'New',
    prescription: false,
  },
  {
    id: 'ORD-1205',
    customer: 'Amit Borah',
    phone: '+91 90000 12005',
    address: 'Station Road, Dhemaji',
    deliveryMode: 'Pickup',
    medicine: 'Amoxicillin 250mg',
    amount: 192,
    quantity: 2,
    status: 'Accepted',
    prescription: true,
  },
  {
    id: 'ORD-1206',
    customer: 'Neha Saikia',
    phone: '+91 90000 12006',
    address: 'Kulpathar, Dhemaji',
    deliveryMode: 'Delivery',
    medicine: 'Cetirizine 10mg',
    amount: 42,
    quantity: 1,
    status: 'Packed',
    prescription: false,
  },
];

export function sellerInventoryToMedicines(inventory: SellerInventoryItem[], shopName: string): Medicine[] {
  return inventory
    .filter((item) => item.listed && !item.draft && item.stock > 0)
    .map((item) => {
      const discountedPrice = item.price * (1 - item.discount / 100);
      const cardPrice = discountedPrice / 80;

      return {
        id: `seller-${item.id}`,
        name: item.name,
        genericName: item.genericName,
        price: cardPrice,
        image: item.imageUrl || '/favicon.svg',
        category: item.category,
        prescription: item.prescription,
        availability: [
          {
            shopName,
            distance: 'Verified seller',
            stock: item.stock,
            price: cardPrice,
          },
        ],
      };
    });
}
