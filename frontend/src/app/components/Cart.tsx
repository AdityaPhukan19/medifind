import { useState } from 'react';
import { X, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';

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
  onCheckout: (details: {
    customer: string;
    phone: string;
    address: string;
    deliveryMode: 'Delivery' | 'Pickup';
  }) => void;
}

export function Cart({ isOpen, items, onClose, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutDetails, setCheckoutDetails] = useState({
    customer: 'Demo Buyer',
    phone: '+91 90000 11111',
    address: 'Dhemaji, Assam',
    deliveryMode: 'Delivery' as 'Delivery' | 'Pickup',
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!checkoutDetails.customer || !checkoutDetails.phone || !checkoutDetails.address) {
      setCheckoutError('Please fill in name, phone, and address.');
      return;
    }

    setCheckoutError('');
    onCheckout(checkoutDetails);
    setIsCheckingOut(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={() => {
              setIsCheckingOut(false);
              onClose();
            }}
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
          ) : isCheckingOut ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <div className="flex items-center gap-2 font-medium text-green-900 mb-1">
                  <CheckCircle2 className="w-5 h-5" />
                  Checkout Details
                </div>
                <p className="text-sm text-green-800">This will create seller orders for medicines from verified sellers.</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" htmlFor="checkout-name">Full name</label>
                <input
                  id="checkout-name"
                  value={checkoutDetails.customer}
                  onChange={(event) => setCheckoutDetails({ ...checkoutDetails, customer: event.target.value })}
                  className="w-full px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" htmlFor="checkout-phone">Phone</label>
                <input
                  id="checkout-phone"
                  value={checkoutDetails.phone}
                  onChange={(event) => setCheckoutDetails({ ...checkoutDetails, phone: event.target.value })}
                  className="w-full px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" htmlFor="checkout-address">Address</label>
                <textarea
                  id="checkout-address"
                  value={checkoutDetails.address}
                  onChange={(event) => setCheckoutDetails({ ...checkoutDetails, address: event.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['Delivery', 'Pickup'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCheckoutDetails({ ...checkoutDetails, deliveryMode: mode })}
                    className={`px-4 py-3 rounded-xl border transition-colors ${
                      checkoutDetails.deliveryMode === mode
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-border hover:bg-accent'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {checkoutError && (
                <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
                  {checkoutError}
                </div>
              )}
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
            {isCheckingOut ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="py-3 bg-white border border-border hover:bg-accent rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-colors shadow-lg shadow-green-500/30"
                >
                  Place Order
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-colors shadow-lg shadow-green-500/30"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
