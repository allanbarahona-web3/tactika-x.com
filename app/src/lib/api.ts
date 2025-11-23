'use client';

import { useCallback } from 'react';
import { STORAGE_KEYS } from './api/config';

export function useApi() {
  const request = useCallback(
    async (method: string, endpoint: string, body?: any) => {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Obtener token del localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      const response = await fetch(`/api/v1${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return response.json();
    },
    [],
  );

  const get = useCallback(
    (endpoint: string) => request('GET', endpoint),
    [request],
  );

  const post = useCallback(
    (endpoint: string, body: any) => request('POST', endpoint, body),
    [request],
  );

  const put = useCallback(
    (endpoint: string, body: any) => request('PUT', endpoint, body),
    [request],
  );

  const patch = useCallback(
    (endpoint: string, body: any) => request('PATCH', endpoint, body),
    [request],
  );

  const del = useCallback(
    (endpoint: string) => request('DELETE', endpoint),
    [request],
  );

  return { get, post, put, patch, delete: del };
}
