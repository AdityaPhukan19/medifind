import { useState } from 'react';
import { Search } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { MedicineCard } from '../components/MedicineCard';
import type { Medicine } from '../components/MedicineCard';
import { AvailabilityModal } from '../components/AvailabilityModal';
import type { OutletContext } from '../routes';

export function MedicinesPage() {
  const { onAddToCart, nearbyShops, medicines } = useOutletContext<OutletContext>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'prescription' | 'otc'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

  const categories = ['All', ...Array.from(new Set(medicines.map(m => m.category)))];

  const filteredMedicines = medicines
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
              nearbyShops={nearbyShops}
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
        nearbyShops={nearbyShops}
      />
    </>
  );
}
