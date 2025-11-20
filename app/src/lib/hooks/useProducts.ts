'use client';

import { useState, useCallback, useMemo } from 'react';
import { Product, products as defaultProducts, categories } from '@/src/lib/api/data/products';

export function useProducts(initialProducts: Product[] = defaultProducts) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  const handleCategoryChange = useCallback((categoryKey: string) => {
    setSelectedCategory(categoryKey);

    if (categoryKey === 'all') {
      setFilteredProducts(initialProducts);
    } else {
      setFilteredProducts(
        initialProducts.filter((p) => p.category === categoryKey)
      );
    }
  }, [initialProducts]);

  const searchProducts = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = initialProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );

    setFilteredProducts(results);
  }, [initialProducts]);

  const getCategoryInfo = useCallback((categoryKey: string) => {
    return categories.find((c) => c.key === categoryKey);
  }, []);

  const stats = useMemo(
    () => ({
      total: initialProducts.length,
      filtered: filteredProducts.length,
      averagePrice:
        initialProducts.length > 0
          ? initialProducts.reduce((sum, p) => sum + p.price, 0) /
            initialProducts.length
          : 0,
      minPrice: initialProducts.length > 0 ? Math.min(...initialProducts.map((p) => p.price)) : 0,
      maxPrice: initialProducts.length > 0 ? Math.max(...initialProducts.map((p) => p.price)) : 0,
    }),
    [initialProducts, filteredProducts]
  );

  return {
    products: filteredProducts,
    selectedCategory,
    handleCategoryChange,
    searchProducts,
    getCategoryInfo,
    stats,
    categories,
  };
}
