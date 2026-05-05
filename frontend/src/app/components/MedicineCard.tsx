import { Plus, MapPin, Package } from 'lucide-react';

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  price: number;
  image: string;
  category: string;
  prescription: boolean;
  availability: {
    shopName: string;
    distance: string;
    stock: number;
    price: number;
  }[];
}

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine, shop: string) => void;
  onCheckAvailability: (medicine: Medicine) => void;
}

export function MedicineCard({ medicine, onAddToCart, onCheckAvailability }: MedicineCardProps) {
  const lowestPrice = Math.min(...medicine.availability.map(a => a.price));

  return (
    <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
        <div className="w-full h-full flex items-center justify-center text-6xl">
          {medicine.image}
        </div>
        {medicine.prescription && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
            Rx
          </span>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/80 backdrop-blur-sm text-xs rounded-full border border-border">
          {medicine.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-foreground mb-1">{medicine.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{medicine.genericName}</p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm text-muted-foreground">From </span>
            <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{(lowestPrice * 80).toFixed(0)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>{medicine.availability.length} shops</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onCheckAvailability(medicine)}
            className="flex-1 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg text-sm transition-colors"
          >
            Check Availability
          </button>
          <button
            onClick={() => onAddToCart(medicine, medicine.availability[0].shopName)}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-colors shadow-lg shadow-green-500/30"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
