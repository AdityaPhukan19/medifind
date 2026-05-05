import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { MedicineCard } from '../components/MedicineCard';
import type { Medicine } from '../components/MedicineCard';
import { AvailabilityModal } from '../components/AvailabilityModal';

const allMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    price: 5.99,
    image: '💊',
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
    image: '💉',
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
    image: '💊',
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
    image: '🌿',
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
    image: '💊',
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
    image: '☀️',
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
    image: '💊',
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
    image: '💊',
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
    image: '💉',
    category: 'Blood Pressure',
    prescription: true,
    availability: [
      { shopName: 'HealthPlus Pharmacy', distance: '0.5 mi', stock: 18, price: 13.99 },
      { shopName: 'MediCare Center', distance: '0.8 mi', stock: 25, price: 14.49 },
    ],
  },
];

interface MedicinesPageProps {
  onAddToCart: (medicine: Medicine, shop: string) => void;
}

export function MedicinesPage({ onAddToCart }: MedicinesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'prescription' | 'otc'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

  const categories = ['All', ...Array.from(new Set(allMedicines.map(m => m.category)))];

  const filteredMedicines = allMedicines
    .filter((med) => {
      const matchesSearch = searchQuery.trim() === '' ||
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;

      const matchesPrescription =
        prescriptionFilter === 'all' ||
        (prescriptionFilter === 'prescription' && med.prescription) ||
        (prescriptionFilter === 'otc' && !med.prescription);

      return matchesSearch && matchesCategory && matchesPrescription;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 text-white py-12">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold mb-2">All Medicines</h2>
          <p className="text-green-50 text-lg">Explore our complete catalog of medicines and healthcare products</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <select
                value={prescriptionFilter}
                onChange={(e) => setPrescriptionFilter(e.target.value as any)}
                className="px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="otc">Over the Counter</option>
                <option value="prescription">Prescription Only</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-accent hover:bg-accent/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredMedicines.length} {filteredMedicines.length === 1 ? 'medicine' : 'medicines'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onAddToCart={onAddToCart}
              onCheckAvailability={setSelectedMedicine}
            />
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No medicines found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <AvailabilityModal
        medicine={selectedMedicine}
        onClose={() => setSelectedMedicine(null)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
