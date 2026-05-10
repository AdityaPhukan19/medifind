import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bell,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  Eye,
  EyeOff,
  FileText,
  Image,
  IndianRupee,
  Lock,
  LogOut,
  Mail,
  MapPin,
  PackageCheck,
  PackagePlus,
  Percent,
  Phone,
  Pill,
  Plus,
  Save,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Upload,
  User,
} from 'lucide-react';
import type { OutletContext } from '../routes';
import type { SellerInventoryItem, SellerOrder } from '../data/medicineData';

interface InventoryForm {
  name: string;
  genericName: string;
  category: string;
  batch: string;
  expiry: string;
  stock: string;
  price: string;
  prescription: boolean;
  imageUrl: string;
  discount: string;
  minStock: string;
  draft: boolean;
  deliveryEligible: boolean;
}

interface SellerLoginForm {
  email: string;
  password: string;
  license: string;
}

interface PharmacyProfile {
  pharmacyName: string;
  pharmacistName: string;
  phone: string;
  address: string;
  openingHours: string;
  deliveryRadius: string;
  license: string;
  gst: string;
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
}

interface DeliverySlot {
  id: number;
  label: string;
  enabled: boolean;
}

const verifiedSeller = {
  email: 'seller@medifind.com',
  password: 'seller123',
  license: 'MF-ASSAM-2026',
  pharmacyName: 'MediFind Verified Pharmacy',
};

const categories = [
  'Pain Relief',
  'Antibiotic',
  'Antihistamine',
  'Diabetes',
  'Digestive Health',
  'Supplement',
  'First Aid',
];

const emptyForm: InventoryForm = {
  name: '',
  genericName: '',
  category: 'Pain Relief',
  batch: '',
  expiry: '',
  stock: '',
  price: '',
  prescription: false,
  imageUrl: '',
  discount: '',
  minStock: '15',
  draft: false,
  deliveryEligible: true,
};

const initialProfile: PharmacyProfile = {
  pharmacyName: verifiedSeller.pharmacyName,
  pharmacistName: 'Dr. Ananya Sharma',
  phone: '+91 98765 43210',
  address: 'Dhemaji, Assam 787057',
  openingHours: '8:00 AM - 10:00 PM',
  deliveryRadius: '8 km',
  license: verifiedSeller.license,
  gst: '18ABCDE1234F1Z5',
  pickupEnabled: true,
  deliveryEnabled: true,
};

const orderStatuses: SellerOrder['status'][] = [
  'New',
  'Accepted',
  'Packed',
  'Out for Delivery',
  'Completed',
];

const initialDeliverySlots: DeliverySlot[] = [
  { id: 1, label: '9 AM - 12 PM', enabled: true },
  { id: 2, label: '12 PM - 3 PM', enabled: true },
  { id: 3, label: '3 PM - 6 PM', enabled: false },
  { id: 4, label: '6 PM - 9 PM', enabled: true },
];

function getDaysUntilExpiry(expiry: string) {
  const [year, month] = expiry.split('-').map(Number);
  if (!year || !month) return Number.POSITIVE_INFINITY;
  const expiryDate = new Date(year, month, 0);
  const today = new Date();
  const diff = expiryDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getAvailabilityStatus(item: InventoryItem) {
  if (item.stock === 0) return 'Out of stock';
  if (item.stock <= item.minStock) return 'Limited stock';
  return 'Available now';
}

function parseNumber(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function SellerPage() {
  const {
    sellerInventory: inventory,
    setSellerInventory: setInventory,
    sellerOrders: orders,
    setSellerOrders: setOrders,
    sellerShopName,
    setSellerShopName,
  } = useOutletContext<OutletContext>();
  const [isSellerVerified, setIsSellerVerified] = useState(
    () => localStorage.getItem('sellerVerified') === 'true'
  );
  const [sellerLogin, setSellerLogin] = useState<SellerLoginForm>({
    email: '',
    password: '',
    license: '',
  });
  const [sellerLoginError, setSellerLoginError] = useState('');
  const [showSellerPassword, setShowSellerPassword] = useState(false);
  const [form, setForm] = useState<InventoryForm>(emptyForm);
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'listed' | 'draft' | 'rx' | 'expiring'>('all');
  const [message, setMessage] = useState('');
  const [bulkText, setBulkText] = useState('ORS Sachet,Oral Rehydration Salts,Supplement,ORS-1001,2027-12,35,18');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [profile, setProfile] = useState<PharmacyProfile>({
    ...initialProfile,
    pharmacyName: sellerShopName,
  });
  const [deliverySlots, setDeliverySlots] = useState<DeliverySlot[]>(initialDeliverySlots);

  const lowStockItems = inventory.filter((item) => item.stock <= item.minStock);
  const expiringItems = inventory.filter((item) => getDaysUntilExpiry(item.expiry) <= 90);
  const listedItems = inventory.filter((item) => item.listed && !item.draft).length;
  const draftItems = inventory.filter((item) => item.draft).length;
  const inventoryValue = inventory.reduce((total, item) => total + item.stock * item.price, 0);
  const activeOrders = orders.filter((order) => order.status !== 'Completed').length;
  const isErrorMessage = message.startsWith('Please') || message.startsWith('Enter') || message.startsWith('Could not');

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.batch.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        stockFilter === 'all' ||
        (stockFilter === 'low' && item.stock <= item.minStock) ||
        (stockFilter === 'listed' && item.listed && !item.draft) ||
        (stockFilter === 'draft' && item.draft) ||
        (stockFilter === 'rx' && item.prescription) ||
        (stockFilter === 'expiring' && getDaysUntilExpiry(item.expiry) <= 90);

      return matchesSearch && matchesFilter;
    });
  }, [inventory, searchQuery, stockFilter]);

  const topSellingItems = [...inventory].sort((a, b) => b.sales - a.sales).slice(0, 3);
  const dailyRevenue = orders.reduce((total, order) => total + order.amount, 0);
  const notificationItems = [
    ...lowStockItems.slice(0, 2).map((item) => `${item.name} is below its reorder point.`),
    ...expiringItems.slice(0, 2).map((item) => `${item.name} expires in ${Math.max(getDaysUntilExpiry(item.expiry), 0)} days.`),
    `${orders.filter((order) => order.status === 'New').length} new order needs review.`,
  ];

  const handleSellerLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSellerLoginError('');

    if (!sellerLogin.email || !sellerLogin.password || !sellerLogin.license) {
      setSellerLoginError('Please enter email, password, and license number.');
      return;
    }

    const isVerified =
      sellerLogin.email.trim().toLowerCase() === verifiedSeller.email &&
      sellerLogin.password === verifiedSeller.password &&
      sellerLogin.license.trim().toUpperCase() === verifiedSeller.license;

    if (!isVerified) {
      setSellerLoginError('Seller verification failed. Check your credentials and pharmacy license.');
      return;
    }

    localStorage.setItem('sellerVerified', 'true');
    localStorage.setItem('sellerPharmacyName', verifiedSeller.pharmacyName);
    setSellerShopName(verifiedSeller.pharmacyName);
    setProfile((current) => ({ ...current, pharmacyName: verifiedSeller.pharmacyName }));
    setIsSellerVerified(true);
  };

  const handleDemoSellerLogin = () => {
    localStorage.setItem('sellerVerified', 'true');
    localStorage.setItem('sellerPharmacyName', verifiedSeller.pharmacyName);
    setSellerShopName(verifiedSeller.pharmacyName);
    setProfile((current) => ({ ...current, pharmacyName: verifiedSeller.pharmacyName }));
    setSellerLogin({
      email: verifiedSeller.email,
      password: verifiedSeller.password,
      license: verifiedSeller.license,
    });
    setSellerLoginError('');
    setIsSellerVerified(true);
  };

  const handleSellerLogout = () => {
    localStorage.removeItem('sellerVerified');
    localStorage.removeItem('sellerPharmacyName');
    setIsSellerVerified(false);
    setSellerLogin({ email: '', password: '', license: '' });
    setMessage('');
  };

  const addInventoryItem = (item: SellerInventoryItem) => {
    setInventory((items) => [item, ...items]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSellerVerified) {
      setMessage('Please verify your seller account before listing medicines.');
      return;
    }

    const nextItem: SellerInventoryItem = {
      id: Date.now(),
      name: form.name.trim(),
      genericName: form.genericName.trim(),
      category: form.category,
      batch: form.batch.trim(),
      expiry: form.expiry.trim(),
      stock: parseNumber(form.stock),
      price: parseNumber(form.price),
      prescription: form.prescription,
      listed: !form.draft,
      draft: form.draft,
      imageUrl: form.imageUrl.trim(),
      discount: parseNumber(form.discount),
      minStock: parseNumber(form.minStock, 15),
      sales: 0,
      deliveryEligible: form.deliveryEligible,
    };

    if (!nextItem.name || !nextItem.genericName || !nextItem.batch || !nextItem.expiry) {
      setMessage('Please complete medicine name, generic name, batch number, and expiry.');
      return;
    }

    if (nextItem.stock < 0 || nextItem.price <= 0) {
      setMessage('Enter a valid stock quantity and selling price.');
      return;
    }

    addInventoryItem(nextItem);
    setForm(emptyForm);
    setMessage(`${nextItem.name} was ${nextItem.draft ? 'saved as a draft' : 'added to live inventory'}.`);
  };

  const updateStock = (id: number, amount: number) => {
    setInventory((items) =>
      items.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
      )
    );
  };

  const setExactStock = (id: number, stock: string) => {
    setInventory((items) =>
      items.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, parseNumber(stock, item.stock)) } : item
      )
    );
  };

  const updateDiscount = (id: number, discount: string) => {
    setInventory((items) =>
      items.map((item) =>
        item.id === id ? { ...item, discount: Math.max(0, parseNumber(discount, item.discount)) } : item
      )
    );
  };

  const toggleListed = (id: number) => {
    if (!isSellerVerified) {
      setMessage('Please verify your seller account before listing medicines.');
      return;
    }

    setInventory((items) =>
      items.map((item) =>
        item.id === id ? { ...item, listed: !item.listed, draft: item.listed ? item.draft : false } : item
      )
    );
  };

  const publishDraft = (id: number) => {
    setInventory((items) =>
      items.map((item) => (item.id === id ? { ...item, draft: false, listed: true } : item))
    );
  };

  const handleBulkImport = () => {
    const rows = bulkText
      .split('\n')
      .map((row) => row.trim())
      .filter(Boolean);

    const importedItems = rows
      .map((row, index) => {
        const [name, genericName, category, batch, expiry, stock, price] = row.split(',').map((cell) => cell.trim());
        if (!name || !genericName || !batch || !expiry || !stock || !price) return null;

        return {
          id: Date.now() + index,
          name,
          genericName,
          category: category || 'Supplement',
          batch,
          expiry,
          stock: parseNumber(stock),
          price: parseNumber(price),
          prescription: false,
          listed: true,
          draft: false,
          imageUrl: '',
          discount: 0,
          minStock: 15,
          sales: 0,
          deliveryEligible: true,
        };
      })
      .filter((item): item is SellerInventoryItem => Boolean(item));

    if (importedItems.length === 0) {
      setMessage('Could not import medicines. Use name,generic,category,batch,expiry,stock,price.');
      return;
    }

    setInventory((items) => [...importedItems, ...items]);
    setMessage(`${importedItems.length} medicines imported from bulk upload.`);
  };

  const handleCsvFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBulkText(String(reader.result || ''));
      setMessage(`${file.name} loaded. Review the rows, then import.`);
    };
    reader.readAsText(file);
  };

  const handleBarcodeScan = () => {
    const code = barcodeInput.trim();
    if (!code) {
      setMessage('Enter a barcode, QR code, or batch number to scan.');
      return;
    }

    const match = inventory.find(
      (item) =>
        item.batch.toLowerCase() === code.toLowerCase() ||
        item.name.toLowerCase().includes(code.toLowerCase())
    );

    if (match) {
      setSearchQuery(match.batch);
      setMessage(`${match.name} found. Inventory search has been filtered to this item.`);
      return;
    }

    setForm((current) => ({ ...current, batch: code }));
    setMessage('No existing medicine matched. Batch number copied into the add form.');
  };

  const updateOrderStatus = (id: string, status: SellerOrder['status']) => {
    setOrders((items) => items.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const toggleDeliverySlot = (id: number) => {
    setDeliverySlots((slots) =>
      slots.map((slot) => (slot.id === id ? { ...slot, enabled: !slot.enabled } : slot))
    );
  };

  if (!isSellerVerified) {
    return (
      <>
        <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.28),transparent_35%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-green-50">Verified Seller Access</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">Login Before Listing Medicines</h1>
              <p className="text-green-50 text-lg">
                Only verified pharmacies can publish medicine stock, prices, and availability on MediFind.
              </p>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
            <section className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-100 text-green-700">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Seller Login</h2>
                  <p className="text-sm text-muted-foreground">Verify your pharmacy before listing inventory</p>
                </div>
              </div>

              <form onSubmit={handleSellerLogin} className="space-y-4">
                <FieldShell label="Seller email" htmlFor="seller-email">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                  <input
                    id="seller-email"
                    type="email"
                    value={sellerLogin.email}
                    onChange={(event) => setSellerLogin({ ...sellerLogin, email: event.target.value })}
                    placeholder="seller@medifind.com"
                    className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </FieldShell>

                <FieldShell label="Password" htmlFor="seller-password">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                  <input
                    id="seller-password"
                    type={showSellerPassword ? 'text' : 'password'}
                    value={sellerLogin.password}
                    onChange={(event) => setSellerLogin({ ...sellerLogin, password: event.target.value })}
                    placeholder="Enter seller password"
                    className="w-full pl-12 pr-12 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSellerPassword(!showSellerPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-800"
                    aria-label={showSellerPassword ? 'Hide password' : 'Show password'}
                  >
                    {showSellerPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </FieldShell>

                <div>
                  <label className="text-sm font-medium mb-2 block" htmlFor="seller-license">
                    Pharmacy license number
                  </label>
                  <input
                    id="seller-license"
                    value={sellerLogin.license}
                    onChange={(event) => setSellerLogin({ ...sellerLogin, license: event.target.value })}
                    placeholder="MF-ASSAM-2026"
                    className="w-full px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {sellerLoginError && (
                  <InlineMessage isError message={sellerLoginError} />
                )}

                <button
                  type="submit"
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Verify Seller
                </button>

                <button
                  type="button"
                  onClick={handleDemoSellerLogin}
                  className="w-full px-5 py-3 rounded-xl bg-green-50 border border-green-100 text-green-800 font-medium hover:bg-green-100 transition-all flex items-center justify-center gap-2"
                >
                  <BadgeCheck className="w-5 h-5" />
                  Use Demo Seller
                </button>
              </form>

              <div className="mt-5 rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-green-900">
                <p className="font-semibold mb-2">Demo verified seller</p>
                <p>Email: seller@medifind.com</p>
                <p>Password: seller123</p>
                <p>License: MF-ASSAM-2026</p>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <VerificationStep icon={ShieldCheck} title="License Check" text="Match the pharmacy license before sellers can publish medicines." />
              <VerificationStep icon={Store} title="Pharmacy Profile" text="Attach listings to one verified pharmacy name and location." />
              <VerificationStep icon={Pill} title="Controlled Listing" text="Only verified sellers can add, publish, or hide medicine inventory." />
              <VerificationStep icon={BadgeCheck} title="Buyer Trust" text="Verified status helps customers identify trusted local pharmacies." />
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.28),transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <span className="text-green-50">Seller Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">Manage Your Pharmacy Inventory</h1>
              <p className="text-green-50 text-lg max-w-2xl">
                Add medicines, update stock, manage orders, control delivery, and keep buyer-facing pharmacy details accurate.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge text={`Verified as ${profile.pharmacyName}`} icon={BadgeCheck} />
                <Badge text={profile.license} icon={ShieldCheck} />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              <MetricCard icon={Pill} label="Medicines" value={String(inventory.length)} />
              <MetricCard icon={BadgeCheck} label="Listed" value={String(listedItems)} />
              <MetricCard icon={FileText} label="Drafts" value={String(draftItems)} />
              <MetricCard icon={AlertTriangle} label="Alerts" value={String(lowStockItems.length + expiringItems.length)} />
              <MetricCard icon={ShoppingBag} label="Orders" value={String(activeOrders)} />
              <MetricCard icon={IndianRupee} label="Value" value={`Rs. ${inventoryValue.toLocaleString('en-IN')}`} />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            <AlertPanel icon={AlertTriangle} title="Low Stock" value={`${lowStockItems.length} items`} tone="amber" />
            <AlertPanel icon={CalendarClock} title="Expiring Soon" value={`${expiringItems.length} items`} tone="rose" />
            <AlertPanel icon={Bell} title="Notifications" value={`${notificationItems.length} active`} tone="green" />
          </div>
          <button
            onClick={handleSellerLogout}
            className="px-4 py-3 rounded-xl bg-white border border-border hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Seller Logout
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8 items-start">
          <section className="space-y-6">
            <Panel icon={PackagePlus} title="Add Medicine" subtitle="Create a live listing or save a draft">
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput id="medicine-name" label="Medicine name" value={form.name} placeholder="e.g. Azithromycin 500mg" onChange={(value) => setForm({ ...form, name: value })} />
                <TextInput id="generic-name" label="Generic name" value={form.genericName} placeholder="e.g. Azithromycin" onChange={(value) => setForm({ ...form, genericName: value })} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block" htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={form.category}
                      onChange={(event) => setForm({ ...form, category: event.target.value })}
                      className="w-full px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <TextInput id="batch" label="Batch no." value={form.batch} placeholder="BTH-1026" onChange={(value) => setForm({ ...form, batch: value })} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <TextInput id="expiry" label="Expiry" value={form.expiry} placeholder="2027-12" onChange={(value) => setForm({ ...form, expiry: value })} />
                  <TextInput id="stock" label="Stock" value={form.stock} placeholder="50" onChange={(value) => setForm({ ...form, stock: value })} />
                  <TextInput id="price" label="Price" value={form.price} placeholder="85" onChange={(value) => setForm({ ...form, price: value })} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <TextInput id="discount" label="Discount %" value={form.discount} placeholder="10" onChange={(value) => setForm({ ...form, discount: value })} />
                  <TextInput id="min-stock" label="Reorder at" value={form.minStock} placeholder="15" onChange={(value) => setForm({ ...form, minStock: value })} />
                  <TextInput id="image-url" label="Image URL" value={form.imageUrl} placeholder="https://..." onChange={(value) => setForm({ ...form, imageUrl: value })} />
                </div>

                <ToggleRow label="Prescription required" description="Flag regulated medicines before checkout" checked={form.prescription} onChange={(checked) => setForm({ ...form, prescription: checked })} />
                <ToggleRow label="Delivery eligible" description="Allow this medicine in home-delivery orders" checked={form.deliveryEligible} onChange={(checked) => setForm({ ...form, deliveryEligible: checked })} />
                <ToggleRow label="Save as draft" description="Keep hidden until you publish it" checked={form.draft} onChange={(checked) => setForm({ ...form, draft: checked })} />

                {message && <InlineMessage isError={isErrorMessage} message={message} />}

                <button type="submit" className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2">
                  {form.draft ? <Save className="w-5 h-5" /> : <PackagePlus className="w-5 h-5" />}
                  {form.draft ? 'Save Draft' : 'Add to Inventory'}
                </button>
              </form>
            </Panel>

            <Panel icon={Upload} title="Bulk Upload" subtitle="Paste CSV rows or upload a CSV file">
              <textarea
                value={bulkText}
                onChange={(event) => setBulkText(event.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                placeholder="name,generic,category,batch,expiry,stock,price"
              />
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <label className="flex-1 px-4 py-3 rounded-xl border border-border hover:bg-accent transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Load CSV File
                  <input type="file" accept=".csv,text/csv" onChange={handleCsvFile} className="hidden" />
                </label>
                <button onClick={handleBulkImport} className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-sm">
                  Import Rows
                </button>
              </div>
            </Panel>

            <Panel icon={ScanLine} title="Barcode / QR Scan" subtitle="Use batch codes for fast lookup">
              <div className="flex gap-3">
                <input
                  value={barcodeInput}
                  onChange={(event) => setBarcodeInput(event.target.value)}
                  placeholder="Scan or type batch code"
                  className="flex-1 px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <button onClick={handleBarcodeScan} className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                  Scan
                </button>
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <Panel icon={ClipboardList} title="Inventory" subtitle="Search, filter, price, publish, and restock">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search inventory by medicine, generic name, or batch..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    ['all', 'All'],
                    ['low', 'Low Stock'],
                    ['expiring', 'Expiring'],
                    ['rx', 'Rx'],
                    ['draft', 'Drafts'],
                    ['listed', 'Listed'],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setStockFilter(value as typeof stockFilter)}
                      className={`px-4 py-3 rounded-xl text-sm transition-all ${
                        stockFilter === value
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                          : 'bg-input-background hover:bg-accent'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredInventory.map((item) => (
                  <article key={item.id} className="border border-border rounded-xl p-4 hover:border-green-200 hover:shadow-sm transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="w-full lg:w-20 h-20 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center overflow-hidden shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <Image className="w-7 h-7 text-green-700" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          {item.prescription && <PillBadge text="Rx" tone="amber" />}
                          {item.draft && <PillBadge text="Draft" tone="slate" />}
                          <PillBadge text={item.listed && !item.draft ? 'Live' : 'Hidden'} tone={item.listed && !item.draft ? 'green' : 'slate'} />
                          <PillBadge text={getAvailabilityStatus(item)} tone={item.stock <= item.minStock ? 'amber' : 'green'} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.genericName} | {item.category} | Batch {item.batch} | Exp {item.expiry}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-3 text-sm">
                          <InfoChip icon={IndianRupee} text={`${item.price}`} />
                          <InfoChip icon={Percent} text={`${item.discount}% off`} />
                          <InfoChip icon={PackageCheck} text={`${item.stock} stock`} />
                          <InfoChip icon={Truck} text={item.deliveryEligible ? 'Delivery' : 'Pickup only'} />
                          <InfoChip icon={Activity} text={`${item.sales} sold`} />
                        </div>
                      </div>

                      <div className="flex flex-wrap lg:flex-col gap-2 lg:w-36">
                        <div className="flex gap-2">
                          <button onClick={() => updateStock(item.id, -1)} className="w-10 h-10 rounded-lg bg-input-background hover:bg-accent transition-colors font-semibold" aria-label={`Reduce stock for ${item.name}`}>-</button>
                          <input
                            value={item.stock}
                            onChange={(event) => setExactStock(item.id, event.target.value)}
                            className="w-16 h-10 text-center rounded-lg bg-input-background outline-none focus:ring-2 focus:ring-green-500"
                            aria-label={`Stock quantity for ${item.name}`}
                          />
                          <button onClick={() => updateStock(item.id, 1)} className="w-10 h-10 rounded-lg bg-input-background hover:bg-accent transition-colors font-semibold" aria-label={`Increase stock for ${item.name}`}>+</button>
                        </div>
                        <input
                          value={item.discount}
                          onChange={(event) => updateDiscount(item.id, event.target.value)}
                          className="w-full h-10 text-center rounded-lg bg-input-background outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          aria-label={`Discount for ${item.name}`}
                        />
                        {item.draft ? (
                          <button onClick={() => publishDraft(item.id)} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                            Publish
                          </button>
                        ) : (
                          <button onClick={() => toggleListed(item.id)} className={`px-4 py-2 rounded-lg transition-colors ${item.listed ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>
                            {item.listed ? 'Hide' : 'Publish'}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}

                {filteredInventory.length === 0 && (
                  <div className="text-center py-12 border border-dashed border-border rounded-xl">
                    <ClipboardList className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-semibold mb-1">No inventory matched</h3>
                    <p className="text-sm text-muted-foreground">Try another search or filter.</p>
                  </div>
                )}
              </div>
            </Panel>
          </section>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Panel icon={AlertTriangle} title="Inventory Alerts" subtitle="Expiry, stock, and reorder reminders">
            <div className="space-y-3">
              {notificationItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-900">
                  <Bell className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={BarIcon} title="Sales Analytics" subtitle="Quick view of demand and revenue">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatBlock label="Today" value={`Rs. ${dailyRevenue}`} />
              <StatBlock label="Completed" value={String(orders.filter((order) => order.status === 'Completed').length)} />
            </div>
            <div className="space-y-3">
              {topSellingItems.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.sales}</span>
                  </div>
                  <div className="h-2 rounded-full bg-green-100 overflow-hidden">
                    <div className="h-full bg-emerald-600" style={{ width: `${Math.min(100, item.sales / 2)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={PackageCheck} title="Reorder Suggestions" subtitle="Items below their minimum stock">
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-4">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">Stock {item.stock}, reorder point {item.minStock}</div>
                  <button onClick={() => updateStock(item.id, item.minStock * 2)} className="mt-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                    Add suggested stock
                  </button>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Panel icon={Store} title="Pharmacy Profile" subtitle="Buyer-facing trust and contact details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                id="profile-name"
                label="Pharmacy name"
                value={profile.pharmacyName}
                onChange={(value) => {
                  setProfile({ ...profile, pharmacyName: value });
                  setSellerShopName(value);
                  localStorage.setItem('sellerPharmacyName', value);
                }}
              />
              <TextInput id="pharmacist-name" label="Pharmacist name" value={profile.pharmacistName} onChange={(value) => setProfile({ ...profile, pharmacistName: value })} />
              <TextInput id="profile-phone" label="Phone" value={profile.phone} onChange={(value) => setProfile({ ...profile, phone: value })} />
              <TextInput id="profile-hours" label="Opening hours" value={profile.openingHours} onChange={(value) => setProfile({ ...profile, openingHours: value })} />
              <TextInput id="profile-radius" label="Delivery radius" value={profile.deliveryRadius} onChange={(value) => setProfile({ ...profile, deliveryRadius: value })} />
              <TextInput id="profile-gst" label="GST" value={profile.gst} onChange={(value) => setProfile({ ...profile, gst: value })} />
            </div>
            <div className="mt-4">
              <TextInput id="profile-address" label="Address" value={profile.address} onChange={(value) => setProfile({ ...profile, address: value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <ToggleRow label="Pickup enabled" description="Customers can collect from your shop" checked={profile.pickupEnabled} onChange={(checked) => setProfile({ ...profile, pickupEnabled: checked })} />
              <ToggleRow label="Home delivery" description="Show delivery options to buyers" checked={profile.deliveryEnabled} onChange={(checked) => setProfile({ ...profile, deliveryEnabled: checked })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-sm">
              <InfoChip icon={User} text={profile.pharmacistName} />
              <InfoChip icon={Phone} text={profile.phone} />
              <InfoChip icon={MapPin} text={profile.address} />
            </div>
          </Panel>

          <Panel icon={Clock} title="Delivery Slots" subtitle="Choose pickup and delivery windows">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deliverySlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => toggleDeliverySlot(slot.id)}
                  className={`rounded-xl border px-4 py-4 text-left transition-all ${
                    slot.enabled
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-border bg-white text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{slot.label}</span>
                    {slot.enabled ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
              ))}
            </div>
          </Panel>
        </div>

        <Panel icon={ShoppingBag} title="Order Queue" subtitle="Accept, pack, dispatch, and complete orders">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <article key={order.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  {order.prescription && <PillBadge text="Rx check" tone="amber" />}
                </div>
                <p className="text-sm mb-2">{order.medicine} x {order.quantity}</p>
                <p className="text-xs text-muted-foreground mb-3">{order.deliveryMode} | {order.phone}</p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="font-medium">Rs. {order.amount}</span>
                  <PillBadge text={order.status} tone={order.status === 'Completed' ? 'green' : 'slate'} />
                </div>
                <select
                  value={order.status}
                  onChange={(event) => updateOrderStatus(order.id, event.target.value as SellerOrder['status'])}
                  className="w-full px-3 py-2 rounded-lg bg-input-background outline-none focus:ring-2 focus:ring-green-500"
                >
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </article>
            ))}
          </div>
        </Panel>
      </main>
    </>
  );
}

const BarIcon = Activity;

function MetricCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur border border-white/20 p-4 min-w-[135px]">
      <div className="flex items-center gap-2 text-green-50 text-sm mb-2">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function Panel({ icon: Icon, title, subtitle, children }: { icon: LucideIcon; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-xl bg-green-100 text-green-700">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function TextInput({ id, label, value, placeholder, onChange }: { id: string; label: string; value: string; placeholder?: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block" htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-input-background rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
      />
    </div>
  );
}

function FieldShell({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block" htmlFor={htmlFor}>{label}</label>
      <div className="relative">{children}</div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl bg-green-50 border border-green-100 px-4 py-3 cursor-pointer">
      <span>
        <span className="block font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="w-5 h-5 accent-green-600" />
    </label>
  );
}

function InlineMessage({ isError, message }: { isError: boolean; message: string }) {
  return (
    <div className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${isError ? 'bg-amber-50 border-amber-100 text-amber-800' : 'bg-emerald-50 border-emerald-100 text-emerald-800'}`}>
      {isError ? <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
      <span>{message}</span>
    </div>
  );
}

function AlertPanel({ icon: Icon, title, value, tone }: { icon: LucideIcon; title: string; value: string; tone: 'amber' | 'rose' | 'green' }) {
  const styles = {
    amber: 'bg-amber-50 border-amber-100 text-amber-900',
    rose: 'bg-rose-50 border-rose-100 text-rose-900',
    green: 'bg-emerald-50 border-emerald-100 text-emerald-900',
  };

  return (
    <div className={`rounded-2xl border p-4 ${styles[tone]}`}>
      <div className="flex items-center gap-2 text-sm mb-1">
        <Icon className="w-4 h-4" />
        {title}
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function PillBadge({ text, tone }: { text: string; tone: 'green' | 'amber' | 'slate' }) {
  const styles = {
    green: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    slate: 'bg-slate-100 text-slate-700',
  };

  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[tone]}`}>{text}</span>;
}

function InfoChip({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 min-w-0">
      <Icon className="w-4 h-4 text-green-700 shrink-0" />
      <span>{text}</span>
    </span>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-green-50 border border-green-100 p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold text-green-900">{value}</div>
    </div>
  );
}

function Badge({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-white/15 border border-white/20 px-4 py-2 text-sm text-green-50">
      <Icon className="w-4 h-4" />
      {text}
    </div>
  );
}

function VerificationStep({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
