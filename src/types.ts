export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  is_veg: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  qr_code_url: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name?: string;
}
