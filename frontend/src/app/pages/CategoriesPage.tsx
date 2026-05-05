import { Link } from 'react-router';
import { Heart, Activity, Pill, Droplet, Brain, Bone, Eye, Baby, Leaf, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  medicineCount: number;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Pain Relief',
    description: 'Headaches, muscle pain, fever',
    icon: <Heart className="w-8 h-8" />,
    color: 'from-rose-400 to-pink-500',
    medicineCount: 48,
  },
  {
    id: '2',
    name: 'Antibiotics',
    description: 'Bacterial infections treatment',
    icon: <Droplet className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    medicineCount: 32,
  },
  {
    id: '3',
    name: 'Digestive Health',
    description: 'Stomach, acid reflux, digestion',
    icon: <Activity className="w-8 h-8" />,
    color: 'from-amber-400 to-orange-500',
    medicineCount: 41,
  },
  {
    id: '4',
    name: 'Diabetes Care',
    description: 'Blood sugar management',
    icon: <Pill className="w-8 h-8" />,
    color: 'from-emerald-400 to-green-500',
    medicineCount: 28,
  },
  {
    id: '5',
    name: 'Mental Health',
    description: 'Anxiety, depression, sleep',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-indigo-400 to-blue-500',
    medicineCount: 36,
  },
  {
    id: '6',
    name: 'Blood Pressure',
    description: 'Hypertension management',
    icon: <Activity className="w-8 h-8" />,
    color: 'from-red-400 to-rose-500',
    medicineCount: 25,
  },
  {
    id: '7',
    name: 'Vitamins & Supplements',
    description: 'Daily nutrition support',
    icon: <Leaf className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500',
    medicineCount: 89,
  },
  {
    id: '8',
    name: 'Eye Care',
    description: 'Vision health products',
    icon: <Eye className="w-8 h-8" />,
    color: 'from-teal-400 to-cyan-500',
    medicineCount: 22,
  },
  {
    id: '9',
    name: 'Bone & Joint',
    description: 'Arthritis, osteoporosis',
    icon: <Bone className="w-8 h-8" />,
    color: 'from-gray-400 to-slate-500',
    medicineCount: 31,
  },
  {
    id: '10',
    name: 'Baby & Child',
    description: 'Pediatric medications',
    icon: <Baby className="w-8 h-8" />,
    color: 'from-pink-400 to-rose-500',
    medicineCount: 44,
  },
  {
    id: '11',
    name: 'Allergy & Sinus',
    description: 'Antihistamines, decongestants',
    icon: <Leaf className="w-8 h-8" />,
    color: 'from-lime-400 to-green-500',
    medicineCount: 37,
  },
  {
    id: '12',
    name: 'First Aid',
    description: 'Bandages, ointments, antiseptics',
    icon: <Plus className="w-8 h-8" />,
    color: 'from-red-500 to-orange-600',
    medicineCount: 56,
  },
];

export function CategoriesPage() {
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
            <Link
              key={category.id}
              to="/medicines"
              className="group block"
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
            </Link>
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
              to="/medicines"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-colors shadow-lg shadow-green-500/30"
            >
              Search All Medicines
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
