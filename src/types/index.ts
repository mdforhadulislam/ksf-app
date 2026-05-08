export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  createdAt?: Date;

  discountPercent?: number;
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
  paymentMethod: string;
  createdAt?: Date;
}

export interface Category {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: Date;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  password?: string;
  createdAt?: Date;
}
