import { useState } from 'react';
import { MapPin, Clock, Star, Phone, Navigation, Search } from 'lucide-react';
import maamedicos from '../components/maamedicos.jpg';
import pronima from '../components/pronima.jpg';
import nayajeevan from '../components/nayajeevan.jpg';
import borahmedical from '../components/borahmedical.jpg';
import joyguru from '../components/joyguru.jpg';
import maagunalata from '../components/maagunalata.jpg';

interface Shop {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  openUntil: string;
  image: string;
  phone: string;
  available24h: boolean;
  services: string[];
}

const allShops: Shop[] = [
  {
    id: '1',
    name: 'M/S MAA MEDICOS',
    address: 'GG4G 7M3,Dhemaji,Jamguri Panchali,Assam 787057',
    distance: '8 km',
    rating: 4.8,
    openUntil: 'Open until 10 PM',
    image: '🏥',
    phone: '+91 98765 43210',
    available24h: false,
    services: ['Prescription Filling', 'Delivery', 'Health Consultation'],
  },
  {
    id: '2',
    name: 'Pronima Medical Hall',
    address: 'Karichuk Bazar, FHH2 885, kulpathar, Dhemaji, Assam 787057',
    distance: '9.2 km',
    rating: 4.6,
    openUntil: 'Open until 9 PM',
    image: '⚕️',
    phone: '+91 98765 43211',
    available24h: false,
    services: ['Prescription Filling', 'Vaccinations', 'Blood Pressure Check'],
  },
  {
    id: '3',
    name: 'Naya Jeevan Medical',
    address: 'Panch Ali Road, Panch Ali, Dhemaji, Jamguri Panchali, Assam 787057',
    distance: '8.8 km',
    rating: 4.9,
    openUntil: 'Open 24 hours',
    image: '💚',
    phone: '+91 98765 43212',
    available24h: true,
    services: ['24/7 Service', 'Express Delivery', 'Online Orders'],
  },
  {
    id: '4',
    name: 'Borah Medical',
    address: 'No. 1 Bishnupur, Assam 787057',
    distance: '9.3 km',
    rating: 4.5,
    openUntil: 'Open until 8 PM',
    image: '🏪',
    phone: '+91 98765 43213',
    available24h: false,
    services: ['Prescription Filling', 'Compounding', 'Home Delivery'],
  },
  {
    id: '5',
    name: 'Joyguru Medical Store',
    address: '09 Karisuk, Dhemaji Station Rd, Dhemaji, Assam 787057',
    distance: '9.0 km',
    rating: 4.7,
    openUntil: 'Open until 9 PM',
    image: '👨‍⚕️',
    phone: '+91 98765 43214',
    available24h: false,
    services: ['Senior Discounts', 'Insurance Billing', 'Medication Therapy'],
  },
  {
    id: '6',
    name: 'Maa Gunalata Medical',
    address: 'Station Road,Near BSNL Telephone exchange, Dhemaji, Assam 787057',
    distance: '8.5 km',
    rating: 4.4,
    openUntil: 'Open until 11 PM',
    image: '⚡',
    phone: '+91 98765 43215',
    available24h: false,
    services: ['Fast Delivery', 'Drive-through', 'Mobile App'],
  },
];

const getDirectionsUrl = (shop: Shop) => {
  const destination = `${shop.name}, ${shop.address}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
};

export function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [filter24h, setFilter24h] = useState(false);

  const filteredShops = allShops
    .filter((shop) => {
      const matchesSearch = searchQuery.trim() === '' ||
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matches24h = !filter24h || shop.available24h;

      return matchesSearch && matches24h;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') {
        return parseFloat(a.distance) - parseFloat(b.distance);
      }
      return b.rating - a.rating;
    });

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 text-white py-12">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold mb-2">Partner Pharmacies</h2>
          <p className="text-green-50 text-lg">Find trusted pharmacies in your neighborhood</p>
          <p className="text-green-50 text-lg">Currently based only in Dhemaji</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pharmacies by name or location..."
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
                <option value="distance">Sort by Distance</option>
                <option value="rating">Sort by Rating</option>
              </select>

              <button
                onClick={() => setFilter24h(!filter24h)}
                className={`px-4 py-3 rounded-xl transition-all ${
                  filter24h
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-input-background hover:bg-accent'
                }`}
              >
                24/7 Only
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">
            Found {filteredShops.length} {filteredShops.length === 1 ? 'pharmacy' : 'pharmacies'} nearby
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-40">
                {shop.id === '1' ? (
                  <img 
                    src={maamedicos} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : shop.id === '2' ? (
                  <img 
                    src={pronima} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : shop.id === '3' ? (
                  <img 
                    src={nayajeevan} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : shop.id === '4' ? (
                  <img 
                    src={borahmedical} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : shop.id === '5' ? (
                  <img 
                    src={joyguru} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : shop.id === '6' ? (
                  <img 
                    src={maagunalata} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-40 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-7xl">
                    {shop.image}
                  </div>
                )}
                {shop.available24h && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-amber-400 text-amber-900 text-xs rounded-full font-medium">
                    24/7
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{shop.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{shop.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{shop.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <Navigation className="w-4 h-4" />
                    <span className="font-medium">{shop.distance}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{shop.openUntil}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{shop.phone}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a 
                    href={getDirectionsUrl(shop)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">No pharmacies found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </>
  );
}
