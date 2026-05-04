export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: 'cod' | 'card' | 'upi';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  uid?: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: string;
  name: string;
  image?: string;
}
