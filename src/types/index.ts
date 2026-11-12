export type Language = 'fr' | 'ar' | 'en';

export interface LocalizedString {
  fr: string;
  ar: string;
  en: string;
}

export type CourseCategory = 'pastry' | 'pizza' | 'culinary' | 'barber' | 'hairdressing' | 'it';

export interface CourseModule {
  title: LocalizedString;
  content: LocalizedString;
}

export interface Course {
  id: string;
  slug: string;
  category: CourseCategory;
  title: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  image: string;
  priceDZD: number;
  duration: LocalizedString;
  schedules: {
    fr: string[];
    ar: string[];
    en: string[];
  };
  objectives: {
    fr: string[];
    ar: string[];
    en: string[];
  };
  modules: CourseModule[];
  instructor: {
    name: string;
    role: LocalizedString;
    experience: LocalizedString;
  };
  featured?: boolean;
}

export interface Registration {
  id: string;
  registrationCode: string;
  courseId: string;
  courseTitle: string;
  fullName: string;
  phone: string;
  email?: string;
  dateOfBirth?: string;
  preferredSchedule: string;
  message?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export type ProductCategory = 'pastry' | 'pizza' | 'meals' | 'bakery' | 'handmade';

export interface Product {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  priceDZD: number;
  category: ProductCategory;
  image: string;
  stock: number;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderCode: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    image: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  wilaya: string;
  commune: string;
  notes?: string;
  paymentMethod: 'cod' | 'pickup_cash';
  status: 'pending' | 'preparing' | 'in_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface HairSalonService {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  priceDZD: number;
  durationMinutes: number;
  category: 'men' | 'women';
  image: string;
}

export interface AppointmentBooking {
  id: string;
  bookingCode: string;
  serviceId: string;
  serviceTitle: string;
  customerName: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00"
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  category: 'pastry' | 'culinary' | 'pizza' | 'hair' | 'it';
  image: string;
  studentName?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: LocalizedString;
  comment: LocalizedString;
  rating: number;
  year: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface SiteSettings {
  schoolName: string;
  slogan: LocalizedString;
  address: string;
  city: string;
  country: string;
  phone: string;
  phoneSecondary: string;
  whatsapp: string;
  email: string;
  openingHours: LocalizedString;
  standardDeliveryFee: number;
  freeDeliveryThreshold: number;
  mapLat: number;
  mapLng: number;
}
