import { X, Trash2, ShoppingBag } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  shop: string;
  price: number;
  quantity: number;
  image: string | { default: string };
}

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function Cart({ isOpen, items, onClose, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add medicines to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-accent/50 rounded-xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                    {typeof item.image === 'object' ? (
                      <img src={item.image.default} alt={item.name} className="w-full h-full object-cover" />
                    ) : typeof item.image === 'string' && item.image.includes('.') ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      item.image
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-1 truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.shop}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 bg-white rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-white rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ₹{(item.price * item.quantity * 80).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors h-fit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">₹{(total * 80).toFixed(0)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Free</span>
            </div>
            <div className="flex items-center justify-between mb-6 pt-4 border-t border-border">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{(total * 80).toFixed(0)}</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-colors shadow-lg shadow-green-500/30">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
