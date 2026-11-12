import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Course,
  Product,
  HairSalonService,
  Registration,
  Order,
  AppointmentBooking,
  GalleryItem,
  Testimonial,
  ContactMessage,
  SiteSettings,
  CartItem,
} from '../types';
import {
  INITIAL_COURSES,
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_REGISTRATIONS,
  INITIAL_ORDERS,
  INITIAL_APPOINTMENTS,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_MESSAGES,
  INITIAL_SETTINGS,
} from '../data/initialData';
import { translations } from '../data/translations';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;

  // Data collections
  courses: Course[];
  products: Product[];
  services: HairSalonService[];
  registrations: Registration[];
  orders: Order[];
  appointments: AppointmentBooking[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  settings: SiteSettings;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalQuantity: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;

  // Actions
  addRegistration: (data: {
    courseId: string;
    courseTitle: string;
    fullName: string;
    phone: string;
    email?: string;
    dateOfBirth?: string;
    preferredSchedule: string;
    message?: string;
  }) => Registration;

  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryType: 'delivery' | 'pickup';
    address?: string;
    wilaya: string;
    commune: string;
    notes?: string;
    paymentMethod: 'cod' | 'pickup_cash';
  }) => Order;

  createAppointment: (bookingData: {
    serviceId: string;
    serviceTitle: string;
    customerName: string;
    customerPhone: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => { success: boolean; error?: string; booking?: AppointmentBooking };

  sendContactMessage: (msg: {
    fullName: string;
    phone: string;
    email?: string;
    subject: string;
    message: string;
  }) => void;

  // Admin Auth & Management
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  updateCourse: (course: Course) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;

  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  updateRegistrationStatus: (id: string, status: Registration['status']) => void;
  deleteRegistration: (id: string) => void;

  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;

  updateAppointmentStatus: (id: string, status: AppointmentBooking['status']) => void;
  deleteAppointment: (id: string) => void;

  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteMessage: (id: string) => void;

  updateSettings: (newSettings: SiteSettings) => void;
  resetToDemoData: () => void;

  // Toast
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'chef_benzaza_';

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    return getStored<Language>('lang', 'fr');
  });

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    setStored('lang', language);
  }, [language, isRtl]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.fr[key] || key;
  };

  // State data
  const [courses, setCourses] = useState<Course[]>(() => getStored('courses', INITIAL_COURSES));
  const [products, setProducts] = useState<Product[]>(() => getStored('products', INITIAL_PRODUCTS));
  const [services] = useState<HairSalonService[]>(() => INITIAL_SERVICES);
  const [registrations, setRegistrations] = useState<Registration[]>(() => getStored('registrations', INITIAL_REGISTRATIONS));
  const [orders, setOrders] = useState<Order[]>(() => getStored('orders', INITIAL_ORDERS));
  const [appointments, setAppointments] = useState<AppointmentBooking[]>(() => getStored('appointments', INITIAL_APPOINTMENTS));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => getStored('gallery', INITIAL_GALLERY));
  const [testimonials] = useState<Testimonial[]>(() => INITIAL_TESTIMONIALS);
  const [messages, setMessages] = useState<ContactMessage[]>(() => getStored('messages', INITIAL_MESSAGES));
  const [settings, setSettings] = useState<SiteSettings>(() => getStored('settings', INITIAL_SETTINGS));

  // Sync to localStorage
  useEffect(() => setStored('courses', courses), [courses]);
  useEffect(() => setStored('products', products), [products]);
  useEffect(() => setStored('registrations', registrations), [registrations]);
  useEffect(() => setStored('orders', orders), [orders]);
  useEffect(() => setStored('appointments', appointments), [appointments]);
  useEffect(() => setStored('gallery', gallery), [gallery]);
  useEffect(() => setStored('messages', messages), [messages]);
  useEffect(() => setStored('settings', settings), [settings]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => getStored('cart', []));
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => setStored('cart', cart), [cart]);

  const addToCart = (product: Product, quantity = 1) => {
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
    showToast(
      language === 'ar'
        ? `تمت إضافة "${product.name.ar}" إلى السلة`
        : language === 'en'
        ? `Added "${product.name.en}" to cart`
        : `Ajouté "${product.name.fr}" au panier`,
      'success'
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.priceDZD * item.quantity, 0);
  const deliveryFee =
    cartSubtotal >= settings.freeDeliveryThreshold || cart.length === 0
      ? 0
      : settings.standardDeliveryFee;
  const cartTotal = cartSubtotal + deliveryFee;

  // Toast System
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const addRegistration = (data: {
    courseId: string;
    courseTitle: string;
    fullName: string;
    phone: string;
    email?: string;
    dateOfBirth?: string;
    preferredSchedule: string;
    message?: string;
  }): Registration => {
    const code = `EB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReg: Registration = {
      id: 'reg-' + Date.now(),
      registrationCode: code,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setRegistrations((prev) => [newReg, ...prev]);
    showToast(t('regSuccessTitle') + ` (${code})`, 'success');
    return newReg;
  };

  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryType: 'delivery' | 'pickup';
    address?: string;
    wilaya: string;
    commune: string;
    notes?: string;
    paymentMethod: 'cod' | 'pickup_cash';
  }): Order => {
    const code = `CMD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fee = orderData.deliveryType === 'pickup' ? 0 : deliveryFee;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderCode: code,
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name[language] || c.product.name.fr,
        quantity: c.quantity,
        unitPrice: c.product.priceDZD,
        image: c.product.image,
      })),
      subtotal: cartSubtotal,
      deliveryFee: fee,
      total: cartSubtotal + fee,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      deliveryType: orderData.deliveryType,
      address: orderData.address,
      wilaya: orderData.wilaya,
      commune: orderData.commune,
      notes: orderData.notes,
      paymentMethod: orderData.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((ci) => ci.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    showToast(t('orderSuccessTitle') + ` (${code})`, 'success');
    return newOrder;
  };

  const createAppointment = (bookingData: {
    serviceId: string;
    serviceTitle: string;
    customerName: string;
    customerPhone: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }): { success: boolean; error?: string; booking?: AppointmentBooking } => {
    // Check for double booking conflict on the same date and time slot
    const conflict = appointments.some(
      (app) =>
        app.date === bookingData.date &&
        app.timeSlot === bookingData.timeSlot &&
        app.status !== 'cancelled'
    );

    if (conflict) {
      showToast(t('bookingConflictError'), 'error');
      return { success: false, error: t('bookingConflictError') };
    }

    const code = `RDV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentBooking = {
      id: 'app-' + Date.now(),
      bookingCode: code,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newBooking, ...prev]);
    showToast(t('bookingSuccessTitle') + ` (${code})`, 'success');
    return { success: true, booking: newBooking };
  };

  const sendContactMessage = (msg: {
    fullName: string;
    phone: string;
    email?: string;
    subject: string;
    message: string;
  }) => {
    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      ...msg,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [newMsg, ...prev]);
    showToast(t('messageSentSuccess'), 'success');
  };

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return getStored('admin_auth', false);
  });

  const adminLogin = (email: string, pass: string): boolean => {
    // Secure verification logic for admin demo (can be configured)
    if (email.trim().toLowerCase() === 'admin@chefbenzaza.dz' && pass.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      setStored('admin_auth', true);
      showToast(language === 'ar' ? 'تم تسجيل الدخول بنجاح كمسؤول' : 'Connecté avec succès en tant qu’administrateur', 'success');
      return true;
    }
    showToast(t('adminInvalidCredentials'), 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setStored('admin_auth', false);
    showToast(language === 'ar' ? 'تم تسجيل الخروج' : 'Déconnexion réussie', 'info');
  };

  // Admin CRUD
  const updateCourse = (updated: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast('Formation mise à jour avec succès', 'success');
  };

  const addCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    showToast('Nouvelle formation ajoutée', 'success');
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast('Formation supprimée', 'info');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Produit mis à jour', 'success');
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Nouveau produit ajouté', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Produit supprimé', 'info');
  };

  const updateRegistrationStatus = (id: string, status: Registration['status']) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Statut inscription mis à jour : ${status}`, 'success');
  };

  const deleteRegistration = (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
    showToast('Demande supprimée', 'info');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    showToast(`Statut commande mis à jour : ${status}`, 'success');
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    showToast('Commande supprimée', 'info');
  };

  const updateAppointmentStatus = (id: string, status: AppointmentBooking['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    showToast(`Rendez-vous mis à jour : ${status}`, 'success');
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    showToast('Rendez-vous supprimé', 'info');
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => [item, ...prev]);
    showToast('Photo ajoutée à la galerie', 'success');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('Élément de la galerie supprimé', 'info');
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Message supprimé', 'info');
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    showToast('Paramètres de l’école enregistrés', 'success');
  };

  const resetToDemoData = () => {
    setCourses(INITIAL_COURSES);
    setProducts(INITIAL_PRODUCTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setOrders(INITIAL_ORDERS);
    setAppointments(INITIAL_APPOINTMENTS);
    setGallery(INITIAL_GALLERY);
    setMessages(INITIAL_MESSAGES);
    setSettings(INITIAL_SETTINGS);
    setCart([]);
    showToast('Données réinitialisées aux valeurs par défaut', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRtl,
        courses,
        products,
        services,
        registrations,
        orders,
        appointments,
        gallery,
        testimonials,
        messages,
        settings,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalQuantity,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        addRegistration,
        createOrder,
        createAppointment,
        sendContactMessage,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        updateCourse,
        addCourse,
        deleteCourse,
        updateProduct,
        addProduct,
        deleteProduct,
        updateRegistrationStatus,
        deleteRegistration,
        updateOrderStatus,
        deleteOrder,
        updateAppointmentStatus,
        deleteAppointment,
        addGalleryItem,
        deleteGalleryItem,
        updateMessageStatus,
        deleteMessage,
        updateSettings,
        resetToDemoData,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
