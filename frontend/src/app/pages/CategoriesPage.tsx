import { useState } from 'react';
import { Link } from 'react-router';
import { Heart, Activity, Pill, Droplet, Brain, Bone, Eye, Baby, Leaf, Plus, X } from 'lucide-react';
import { MedicineCard } from '../components/MedicineCard';
import type { Medicine } from '../components/MedicineCard';
import paracetamolImg from '../components/paracetamol500mg.webp';
import amoxicillinImg from '../components/Amoxicillin250mg.webp';
import ibuprofenImg from '../components/ibuprofen400mg.webp';
import cetirizineImg from '../components/cetirizine10mg.webp';
import metforminImg from '../components/metformin500mg.webp';
import vitaminD3Img from '../components/vitaminD3100iu.jpg';
import aspirinImg from '../components/aspirin100mg.webp';
import omeprazoleImg from '../components/omeprazole20mg.webp';
import lisinoprilImg from '../components/lisinopril10mg.webp';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  medicineCount: number;
}

// Medicine data
const allMedicines: Medicine[] = [
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
    category: 'Antibiotics',
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
    category: 'Pain Relief',
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
    category: 'Allergy & Sinus',
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
    category: 'Diabetes Care',
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
    category: 'Vitamins & Supplements',
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

const categories: Category[] = [
  {
    id: '1',
    name: 'Pain Relief',
    description: 'Headaches, muscle pain, fever',
    icon: <Heart className="w-8 h-8" />,
    color: 'from-rose-400 to-pink-500',
    medicineCount: 3,
  },
  {
    id: '2',
    name: 'Antibiotics',
    description: 'Bacterial infections treatment',
    icon: <Droplet className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    medicineCount: 1,
  },
  {
    id: '3',
    name: 'Digestive Health',
    description: 'Stomach, acid reflux, digestion',
    icon: <Activity className="w-8 h-8" />,
    color: 'from-amber-400 to-orange-500',
    medicineCount: 1,
  },
  {
    id: '4',
    name: 'Diabetes Care',
    description: 'Blood sugar management',
    icon: <Pill className="w-8 h-8" />,
    color: 'from-emerald-400 to-green-500',
    medicineCount: 1,
  },
  {
    id: '5',
    name: 'Vitamins & Supplements',
    description: 'Daily nutrition support',
    icon: <Leaf className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500',
    medicineCount: 1,
  },
  {
    id: '6',
    name: 'Blood Pressure',
    description: 'Hypertension management',
    icon: <Activity className="w-8 h-8" />,
    color: 'from-red-400 to-rose-500',
    medicineCount: 1,
  },
  {
    id: '7',
    name: 'Allergy & Sinus',
    description: 'Antihistamines, decongestants',
    icon: <Leaf className="w-8 h-8" />,
    color: 'from-lime-400 to-green-500',
    medicineCount: 1,
  },
];

export function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredMedicines = selectedCategory
    ? allMedicines.filter((med) => med.category === selectedCategory.name)
    : [];

  const handleAddToCart = (medicine: Medicine, shop: string) => {
    // This is a placeholder - would need to be passed from parent
    console.log(`Added ${medicine.name} from ${shop} to cart`);
  };

  const handleCheckAvailability = (medicine: Medicine) => {
    // This is a placeholder
    console.log(`Checking availability for ${medicine.name}`);
  };
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 text-white py-12">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-green-50 text-lg">Browse medicines by health condition or type</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="group block text-left"
            >
              <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 transform group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative z-10">{category.icon}</div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {category.medicineCount} products
                    </span>
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 transition-colors shadow-sm">
                      <Plus className="w-4 h-4 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 border border-green-200">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-muted-foreground mb-6">
              Use our search feature to find specific medicines by name, ingredient, or condition.
              Our comprehensive database includes thousands of products.
            </p>
            <Link
              to="/home/medicines"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-colors shadow-lg shadow-green-500/30"
            >
              Search All Medicines
            </Link>
          </div>
        </div>
      </div>

      {/* Category Medicines Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-1">{selectedCategory.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedCategory.description}</p>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              {filteredMedicines.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedicines.map((medicine) => (
                    <MedicineCard
                      key={medicine.id}
                      medicine={medicine}
                      onAddToCart={handleAddToCart}
                      onCheckAvailability={handleCheckAvailability}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No medicines found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
