export type Language = 'bn' | 'en';

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  descriptionBn: string;
  descriptionEn: string;
  isAiVerified: boolean;
  isHandmade?: boolean;
  inStock: boolean;
  stockQuantity: number;
  origin: string;
  sellerNameBn: string;
  sellerNameEn: string;
  sellerVerified: boolean;
  specsBn?: { key: string; value: string }[];
  specsEn?: { key: string; value: string }[];
  tags?: string[];
  isCustom?: boolean; // indicates added via admin
}

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  icon: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  paymentStatus: 'paid' | 'pending';
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  deliveryFee: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedBuyer: boolean;
}
