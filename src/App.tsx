import React, { useState, useEffect } from 'react';
import { Language, Product, CartItem, User, Order } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { INITIAL_ORDERS, DEMO_CUSTOMER } from './data/dashboardMockData';

import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { AISmartSearchModal } from './components/AISmartSearchModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amar_dokan_products_v8');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const customProds = parsed.filter((p) => p.isCustom);
        return [...customProds, ...INITIAL_PRODUCTS];
      }
    } catch (e) {}
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amar_dokan_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amar_dokan_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('amar_dokan_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEMO_CUSTOMER;
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isSmartSearchOpen, setIsSmartSearchOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('amar_dokan_products_v8', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('amar_dokan_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('amar_dokan_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('amar_dokan_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('amar_dokan_user');
    }
  }, [currentUser]);

  // Handlers
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...newProductData,
      id: `prod-custom-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setActiveInvoiceOrder(newOrder);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.nameBn.toLowerCase().includes(query) ||
      p.nameEn.toLowerCase().includes(query) ||
      p.descriptionBn.toLowerCase().includes(query) ||
      p.origin.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* Header */}
      <Header
        language={language}
        onLanguageToggle={handleToggleLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenUserDashboard={() => setIsUserDashboardOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        onOpenSmartSearch={() => setIsSmartSearchOpen(true)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner
        language={language}
        onOpenSmartSearch={() => setIsSmartSearchOpen(true)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        isAdmin={currentUser?.role === 'admin'}
      />

      {/* Category Navigation Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        language={language}
      />

      {/* Main Product Grid */}
      <main className="flex-1">
        <ProductGrid
          products={filteredProducts}
          language={language}
          onQuickView={(p) => setSelectedProductForDetail(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onDeleteProduct={handleDeleteProduct}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
          isAdmin={currentUser?.role === 'admin'}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForDetail}
        language={language}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        language={language}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        language={language}
        onOrderPlaced={handleOrderPlaced}
      />

      <InvoiceModal
        order={activeInvoiceOrder}
        language={language}
        onClose={() => setActiveInvoiceOrder(null)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setIsAdminPanelOpen(true);
          }
        }}
      />

      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        language={language}
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <UserDashboardModal
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        user={currentUser}
        orders={orders}
        language={language}
        onLogout={() => setCurrentUser(null)}
        onViewInvoice={(order) => setActiveInvoiceOrder(order)}
      />

      <AISmartSearchModal
        isOpen={isSmartSearchOpen}
        onClose={() => setIsSmartSearchOpen(false)}
        language={language}
        onSearchApply={(term) => setSearchQuery(term)}
      />

      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        language={language}
      />

    </div>
  );
}
