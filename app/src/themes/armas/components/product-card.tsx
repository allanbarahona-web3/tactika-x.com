'use client';

import { Product } from '@/src/lib/api/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  categoryLabel?: string;
}

export function ArmasProductCard({ product, onAddToCart, categoryLabel }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.icon}
        {product.badge && (
          <span className="product-badge">
            {product.badge === 'new'
              ? 'NUEVO'
              : product.badge === 'popular'
              ? 'POPULAR'
              : product.badge}
          </span>
        )}
      </div>
      <div className="product-content">
        <div className="product-category">{categoryLabel || product.category}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
            <i className="fas fa-cart-plus"></i> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
