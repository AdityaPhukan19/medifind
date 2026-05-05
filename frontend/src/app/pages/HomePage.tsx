import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { MedicineCard } from '../components/MedicineCard';
import type { Medicine } from '../components/MedicineCard';
import { AvailabilityModal } from '../components/AvailabilityModal';
import type { CartItem } from '../components/Cart';

const mockMedicines: Medicine[] = [
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
];

interface HomePageProps {
  onAddToCart: (medicine: Medicine, shop: string) => void;
}

export function HomePage({ onAddToCart }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [filteredMedicines, setFilteredMedicines] = useState(mockMedicines);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredMedicines(mockMedicines);
    } else {
      const filtered = mockMedicines.filter(
        (med) =>
          med.name.toLowerCase().includes(query.toLowerCase()) ||
          med.genericName.toLowerCase().includes(query.toLowerCase()) ||
          med.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedicines(filtered);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/hero-bg.avif')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 via-emerald-500/30 to-teal-600/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzMGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTI0IDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Health,
              <br />
              <span className="bg-gradient-to-r from-lime-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Delivered Fast
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-green-50 max-w-2xl mx-auto mb-10">
              Search, compare prices, and order medicines from verified pharmacies across Assam
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for medicines by name, category, or condition..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-foreground placeholder:text-muted-foreground shadow-2xl outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {['Pain Relief', 'Antibiotic', 'Vitamins', 'Diabetes', 'Cold & Flu'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleSearch(category)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/30">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Popular Medicines</h2>
            <p className="text-muted-foreground">Most searched in your area</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onAddToCart={onAddToCart}
              onCheckAvailability={setSelectedMedicine}
            />
          ))}
        </div>
      </main>

      <AvailabilityModal
        medicine={selectedMedicine}
        onClose={() => setSelectedMedicine(null)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
