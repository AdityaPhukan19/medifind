import { ShoppingCart, MapPin, Menu, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-white text-xl">💊</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                MediFind
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/home"
                className={`text-sm transition-colors ${
                  isActive('/home')
                    ? 'text-green-600 font-medium'
                    : 'text-foreground hover:text-green-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/home/medicines"
                className={`text-sm transition-colors ${
                  isActive('/medicines')
                    ? 'text-green-600 font-medium'
                    : 'text-foreground hover:text-green-600'
                }`}
              >
                Medicines
              </Link>
              <Link
                to="/home/shops"
                className={`text-sm transition-colors ${
                  isActive('/shops')
                    ? 'text-green-600 font-medium'
                    : 'text-foreground hover:text-green-600'
                }`}
              >
                Nearby Shops
              </Link>
              <Link
                to="/home/categories"
                className={`text-sm transition-colors ${
                  isActive('/categories')
                    ? 'text-green-600 font-medium'
                    : 'text-foreground hover:text-green-600'
                }`}
              >
                Categories
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm">Assam, India</span>
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-600 to-emerald-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
