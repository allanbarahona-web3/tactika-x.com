'use client';

import { useState, useRef } from 'react';
import { Product, categories, products } from '@/src/lib/api/data/products';
import LoginModalContent from '@/src/components/auth/LoginModalContent';

// Theme components - se cargan dinámicamente según el tenant
import {
  ArmasHeader,
  ArmasFooter,
  ArmasHero,
  ArmasProductCard,
  armasThemeConfig,
} from '@/src/themes/armas';

export default function StorefrontPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // TODO: En el futuro, esto se obtendrá del TenantProvider o server component
  // const { theme } = useTenant();
  // const theme = 'armas'; // Hardcoded por ahora - removed unused var

  const filteredProducts: Product[] =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCategoryClick = (catKey: string) => {
    setSelectedCategory(catKey);
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <main>
        {/* HEADER - Theme specific */}
        <ArmasHeader
          cartCount={cartCount}
          onCartClick={() => setShowCart(true)}
          onLoginClick={() => setShowLogin(true)}
        />

        {/* NAVIGATION */}
        <nav>
          <div className="container">
            <div className="nav-container">
              {categories.map((cat) => (
                <a
                  key={cat.key}
                  className={`nav-item${
                    selectedCategory === cat.key ? ' active' : ''
                  }`}
                  onClick={() => handleCategoryClick(cat.key)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={cat.icon}></i> {cat.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* HERO - Theme specific */}
        <ArmasHero onCategoryClick={handleCategoryClick} />

        {/* FEATURES SECTION */}
        <section className="features">
          <div className="container">
            <div className="features-grid">
              {armasThemeConfig.features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">NUESTRAS CATEGORÍAS</span>
              <h2>Explora Nuestro Catálogo</h2>
              <p>
                Encuentra exactamente lo que necesitas en nuestras categorías
                especializadas
              </p>
            </div>
            <div className="categories-grid">
              {categories.slice(0, -1).map((cat) => (
                <div
                  key={cat.key}
                  className="category-card"
                  onClick={() => handleCategoryClick(cat.key)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="category-image">{cat.icon}</div>
                  <div className="category-content">
                    <h3>{cat.label}</h3>
                    <p>{cat.description || `Productos de ${cat.label}`}</p>
                    <span className="category-badge">
                      {products.filter((p) => p.category === cat.key).length}+ productos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="products-section" ref={productsRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">NUESTROS PRODUCTOS</span>
              <h2>Calidad y Variedad en Equipamiento</h2>
              <p>
                Descubre nuestra amplia gama de productos seleccionados
                especialmente para ti
              </p>
            </div>
            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <p className="no-results">No se encontraron productos.</p>
              ) : (
                filteredProducts.map((product) => (
                  <ArmasProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    categoryLabel={
                      categories.find((c) => c.key === product.category)?.label ||
                      product.category
                    }
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* FOOTER - Theme specific */}
        <ArmasFooter />

        {/* MODAL DEL CARRITO */}
        {showCart && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>
                  <i className="fas fa-shopping-cart"></i> Carrito de Compras
                </h2>
                <button
                  className="close-modal"
                  onClick={() => setShowCart(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {cart.length === 0 ? (
                  <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h3>Tu carrito está vacío</h3>
                    <p>Agrega productos para comenzar tu compra</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowCart(false)}
                      style={{ marginTop: 25 }}
                    >
                      <i className="fas fa-shopping-bag"></i> Ir a Comprar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                          <div className="cart-item-image">{item.icon}</div>
                          <div className="cart-item-details">
                            <h4>{item.name}</h4>
                            <span className="cart-item-price">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <div className="cart-item-actions">
                            <div className="quantity-control">
                              <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                −
                              </button>
                              <span className="quantity-display">{item.quantity}</span>
                              <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="remove-btn"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-summary">
                      <div className="cart-total">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 15 }}>
                        <button className="btn btn-primary" style={{ flex: 1 }}>
                          <i className="fas fa-credit-card"></i> Proceder al Pago
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setShowCart(false)}
                        >
                          <i className="fas fa-shopping-bag"></i> Seguir Comprando
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LOGIN MODAL */}
        {showLogin && (
          <div className="login-modal-overlay">
            <div className="login-modal">
              <button
                className="login-modal-close"
                onClick={() => setShowLogin(false)}
              >
                &times;
              </button>
              <h2>Customer Login</h2>
              <LoginModalContent />
            </div>
          </div>
        )}
      </main>

      {/* WhatsApp Floating CTA */}
      <a
        href={`https://wa.me/${armasThemeConfig.contact.whatsapp}?text=Hola%20quiero%20información%20de%20productos%20TACTIKA-X`}
        className="whatsapp-float whatsapp-bounce"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Tactika-X"
      >
        <img
          src="/Whatsapp.png"
          alt="WhatsApp"
          width="56"
          height="56"
          style={{ display: 'block' }}
        />
      </a>
    </>
  );
}
