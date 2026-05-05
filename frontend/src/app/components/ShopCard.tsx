import { MapPin, Clock, Star } from 'lucide-react';

interface Shop {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  openUntil: string;
  image: string;
}

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="h-32 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-6xl">
        {shop.image}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-foreground">{shop.name}</h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{shop.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{shop.address}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-green-600">
            <MapPin className="w-4 h-4" />
            <span>{shop.distance}</span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{shop.openUntil}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
