'use client';

import { useState } from 'react';

interface AdminProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface AdminOrder {
  id: number;
  customer: string;
  total: number;
  status: string;
}

interface AdminCustomer {
  id: number;
  name: string;
  email: string;
  orders: number;
}

export default function TenantAdminDashboard() {
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>([
    {
      id: 1,
      name: 'Taser Pulse+ Pro',
      price: 299.99,
      category: 'defense',
      stock: 15,
    },
    {
      id: 2,
      name: 'Spray de Pimienta 2OZ',
      price: 45.99,
      category: 'defense',
      stock: 45,
    },
    {
      id: 3,
      name: 'Bastón Táctica Extensible',
      price: 89.99,
      category: 'defense',
      stock: 22,
    },
    {
      id: 6,
      name: 'Chaleco Táctico Modular',
      price: 249.99,
      category: 'tactical',
      stock: 8,
    },
    {
      id: 7,
      name: 'Mochila Táctica 30L',
      price: 179.99,
      category: 'tactical',
      stock: 31,
    },
  ]);

  const [orders] = useState<AdminOrder[]>([
    {
      id: 1001,
      customer: 'Carlos Rodríguez',
      total: 549.99,
      status: 'Entregado',
    },
    {
      id: 1002,
      customer: 'María Fernández',
      total: 1289.98,
      status: 'En Tránsito',
    },
  ]);

  const [customers] = useState<AdminCustomer[]>([
    {
      id: 1,
      name: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      orders: 3,
    },
    {
      id: 2,
      name: 'María Fernández',
      email: 'maria@email.com',
      orders: 5,
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: number) => {
    setAdminProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <h1>Panel de Control Admin</h1>
          <p>Gestiona tu inventario, órdenes y clientes</p>
        </div>
      </div>

      <div className="container">
        {/* NAV TABS */}
        <div className="admin-nav">
          <button className="admin-nav-btn active">
            <i className="fas fa-boxes"></i> Productos
          </button>
          <button className="admin-nav-btn">
            <i className="fas fa-shopping-cart"></i> Órdenes
          </button>
          <button className="admin-nav-btn">
            <i className="fas fa-users"></i> Clientes
          </button>
          <button className="admin-nav-btn">
            <i className="fas fa-cogs"></i> Configuración
          </button>
        </div>

        {/* PRODUCTS SECTION */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Gestión de Productos</h2>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              <i className="fas fa-plus"></i> Nuevo Producto
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>
                      <strong>{product.name}</strong>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className="category-badge">{product.category}</span>
                    </td>
                    <td>
                      <span
                        className={`stock-badge${
                          product.stock < 10 ? ' low' : ''
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit"
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ORDERS SECTION */}
        <section className="admin-section">
          <h2>Órdenes Recientes</h2>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID Orden</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CUSTOMERS SECTION */}
        <section className="admin-section">
          <h2>Clientes</h2>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Órdenes</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>#{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.orders}</td>
                    <td>
                      <button className="action-btn">
                        <i className="fas fa-envelope"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SETTINGS SECTION */}
        <section className="admin-section">
          <h2>Configuración</h2>
          <div className="settings-grid">
            <div className="setting-card">
              <h3>Información de la Tienda</h3>
              <form>
                <div className="form-group">
                  <label>Nombre de la Tienda</label>
                  <input type="text" defaultValue="TACTIKA-X" />
                </div>
                <div className="form-group">
                  <label>Email de Contacto</label>
                  <input type="email" defaultValue="info@tactikax.com" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </form>
            </div>
            <div className="setting-card">
              <h3>Configuración de Envíos</h3>
              <form>
                <div className="form-group">
                  <label>Costo de Envío Base</label>
                  <input type="number" defaultValue="15.00" />
                </div>
                <div className="form-group">
                  <label>Envío Gratis en Compras Mayores a</label>
                  <input type="number" defaultValue="100.00" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                <i className="fas fa-plus"></i>{' '}
                {selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                className="close-modal"
                onClick={() => {
                  setShowForm(false);
                  setSelectedProduct(null);
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Nombre del Producto</label>
                  <input type="text" placeholder="Ej: Taser Pulse+ Pro" />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea placeholder="Describe el producto..."></textarea>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label>Precio</label>
                    <input type="number" placeholder="299.99" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input type="number" placeholder="15" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select>
                    <option>defense</option>
                    <option>tactical</option>
                    <option>protection</option>
                    <option>optics</option>
                    <option>accessories</option>
                    <option>clothing</option>
                    <option>outdoor</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 15 }}>
                  <button type="submit" className="btn btn-primary">
                    Guardar Producto
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedProduct(null);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
