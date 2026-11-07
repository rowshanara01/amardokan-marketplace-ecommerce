import { Order, User } from '../types';

export const ADMIN_USER: User = {
  id: 'admin-1',
  name: 'AmarDokan Admin',
  email: 'admin@amardokan.com',
  role: 'admin',
  phone: '+880 1711-000000',
  address: 'গুলশান ১, ঢাকা - ১২১২, বাংলাদেশ',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

export const DEMO_CUSTOMER: User = {
  id: 'user-101',
  name: 'রওশন আরা বেগম',
  email: 'rowshanaraakhter9@gmail.com',
  role: 'customer',
  phone: '01812345678',
  address: 'বাড়ি #৪৫, রোড #১২, ধানমন্ডি, ঢাকা',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-901',
    date: '২০২৬-০৮-০৪',
    customerName: 'রওশন আরা বেগম',
    phone: '01812345678',
    address: 'বাড়ি #৪৫, রোড #১২, ধানমন্ডি',
    city: 'ঢাকা',
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    items: [
      {
        productId: 'prod-jamdani-100',
        productName: 'আসল রূপগঞ্জের ১০০ কাউন্ট ঢাকাই জামদানি',
        price: 14500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 14560,
    deliveryFee: 60,
    status: 'processing'
  },
  {
    id: 'ORD-2026-902',
    date: '২০২৬-০৮-০২',
    customerName: 'তানভীর আহমেদ',
    phone: '01798765432',
    address: 'জিইসি মোড়, সিডিএ এলাকা',
    city: 'চট্টগ্রাম',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    items: [
      {
        productId: 'prod-sundarban-honey',
        productName: 'সুন্দরবনের খাঁটি প্রাকৃতিক মধু (৫০০ গ্রাম)',
        price: 950,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 2020,
    deliveryFee: 120,
    status: 'delivered'
  }
];
