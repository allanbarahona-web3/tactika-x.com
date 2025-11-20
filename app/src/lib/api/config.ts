// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: 30000,
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    OTP: '/auth/otp',
    VERIFY_2FA: '/auth/verify-2fa',
    
    // Products
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    CATEGORIES: '/categories',
    
    // Cart
    CART: '/cart',
    CART_ADD: '/cart/add',
    CART_REMOVE: '/cart/remove',
    CART_UPDATE: '/cart/update',
    CART_CLEAR: '/cart/clear',
    
    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: '/orders/:id',
    CREATE_ORDER: '/orders',
    
    // User
    USER_PROFILE: '/user/profile',
    USER_UPDATE: '/user/profile',
    USER_PASSWORD: '/user/password',
    
    // Admin
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_PRODUCTS_CREATE: '/admin/products',
    ADMIN_PRODUCTS_UPDATE: '/admin/products/:id',
    ADMIN_PRODUCTS_DELETE: '/admin/products/:id',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_CUSTOMERS: '/admin/customers',
    ADMIN_SETTINGS: '/admin/settings',
  },
};

// Headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  CART: 'cart',
  PREFERENCES: 'preferences',
};
