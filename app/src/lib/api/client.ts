// API base configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export class ApiClient {
  static async request<T>(
    endpoint: string,
    options: RequestInit & { token?: string } = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `API error: ${response.status}`);
    }

    return response.json();
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string, tenantId: string) =>
    ApiClient.request<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, tenantId }),
    }),
};

// Products API
export const productsApi = {
  list: (token: string) =>
    ApiClient.request<any>('/products', {
      token,
      method: 'GET',
    }),

  getOne: (token: string, id: string) =>
    ApiClient.request<any>(`/products/${id}`, { token }),

  getBySlug: (token: string, slug: string) =>
    ApiClient.request<any>(`/products/${slug}`, { token }),

  create: (token: string, data: any) =>
    ApiClient.request<any>('/admin/products', {
      token,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (token: string, id: string, data: any) =>
    ApiClient.request<any>(`/admin/products/${id}`, {
      token,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (token: string, id: string) =>
    ApiClient.request<any>(`/admin/products/${id}`, {
      token,
      method: 'DELETE',
    }),
};

// Categories API
export const categoriesApi = {
  list: (token: string) =>
    ApiClient.request<any>('/admin/categories', { token }),

  getActive: (token: string) =>
    ApiClient.request<any>('/admin/categories/active', { token }),

  getOne: (token: string, id: string) =>
    ApiClient.request<any>(`/admin/categories/${id}`, { token }),

  create: (token: string, data: any) =>
    ApiClient.request<any>('/admin/categories', {
      token,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (token: string, id: string, data: any) =>
    ApiClient.request<any>(`/admin/categories/${id}`, {
      token,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (token: string, id: string) =>
    ApiClient.request<any>(`/admin/categories/${id}`, {
      token,
      method: 'DELETE',
    }),
};

// Media API
export const mediaApi = {
  list: (token: string) =>
    ApiClient.request<any>('/admin/media', { token }),

  getOne: (token: string, id: string) =>
    ApiClient.request<any>(`/admin/media/${id}`, { token }),

  upload: (token: string, file: File, entityId?: string, entityType?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (entityId) formData.append('entityId', entityId);
    if (entityType) formData.append('entityType', entityType);

    return fetch(`${API_URL}/admin/media/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }
      return response.json();
    });
  },

  update: (token: string, id: string, data: any) =>
    ApiClient.request<any>(`/admin/media/${id}`, {
      token,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (token: string, id: string) =>
    ApiClient.request<any>(`/admin/media/${id}`, {
      token,
      method: 'DELETE',
    }),
};

// Orders API
export const ordersApi = {
  list: (token: string) =>
    ApiClient.request<any>('/orders', { token }),

  getOne: (token: string, id: string) =>
    ApiClient.request<any>(`/orders/${id}`, { token }),

  create: (token: string, data: any) =>
    ApiClient.request<any>('/orders', {
      token,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (token: string, id: string, data: any) =>
    ApiClient.request<any>(`/orders/${id}`, {
      token,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  cancel: (token: string, id: string) =>
    ApiClient.request<any>(`/orders/${id}/cancel`, {
      token,
      method: 'PATCH',
    }),
};

// Payments API
export const paymentsApi = {
  list: (token: string) =>
    ApiClient.request<any>('/payments', { token }),

  getOne: (token: string, id: string) =>
    ApiClient.request<any>(`/payments/${id}`, { token }),

  getByOrder: (token: string, orderId: string) =>
    ApiClient.request<any>(`/payments/order/${orderId}`, { token }),

  create: (token: string, data: any) =>
    ApiClient.request<any>('/payments', {
      token,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (token: string, id: string, data: any) =>
    ApiClient.request<any>(`/payments/${id}`, {
      token,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  markPaid: (token: string, id: string) =>
    ApiClient.request<any>(`/payments/${id}/mark-paid`, {
      token,
      method: 'PATCH',
    }),

  markFailed: (token: string, id: string) =>
    ApiClient.request<any>(`/payments/${id}/mark-failed`, {
      token,
      method: 'PATCH',
    }),
};
