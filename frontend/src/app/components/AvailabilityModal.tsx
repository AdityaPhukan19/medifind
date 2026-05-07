import { X, MapPin, Package, Plus } from 'lucide-react';
import type { Medicine } from './MedicineCard';

interface AvailabilityModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onAddToCart: (medicine: Medicine, shop: string) => void;
  nearbyShops?: string[];
}

export function AvailabilityModal({ medicine, onClose, onAddToCart, nearbyShops }: AvailabilityModalProps) {
  if (!medicine) return null;

  const filteredAvailability = nearbyShops && nearbyShops.length > 0
    ? medicine.availability.filter((shop) => nearbyShops.includes(shop.shopName))
    : medicine.availability;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">{medicine.name}</h2>
            <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <h3 className="font-medium mb-4">Available at {filteredAvailability.length} nearby shops</h3>

          <div className="space-y-3">
            {filteredAvailability.map((shop, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h4 className="font-medium mb-2">{shop.shopName}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{shop.distance} away</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span className={shop.stock > 10 ? 'text-green-600' : 'text-amber-600'}>
                        {shop.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₹{(shop.price * 80).toFixed(0)}
                  </span>
                  <button
                    onClick={() => {
                      onAddToCart(medicine, shop.shopName);
                      onClose();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-green-500/30"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
