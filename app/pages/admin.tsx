import { useState } from 'react';

interface AdminProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface Order {
  id: number;
  customer: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
}

// Simula productos usando la misma estructura que index.tsx
const initialProducts: AdminProduct[] = [
  { id: 1, name: 'PR-24 Tonfa Profesional', price: 45.0, category: 'defense', stock: 10 },
  { id: 2, name: 'Arma de Salva Calibre 9mm', price: 150.0, category: 'defense', stock: 5 },
  { id: 3, name: 'Pistola de Balines 4.5mm', price: 85.0, category: 'defense', stock: 8 },
  { id: 4, name: 'Arma Traumática T4E', price: 320.0, category: 'defense', stock: 2 },
  { id: 5, name: 'Bulto Táctico 40L', price: 75.0, category: 'tactical', stock: 12 },
  // ...agrega más si quieres
];

export default function AdminPanel() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  
  // Demo data for orders and customers
  const orders: Order[] = [
    { id: 101, customer: 'Juan Perez', total: 320, status: 'Pending' },
    { id: 102, customer: 'Ana Gomez', total: 85, status: 'Shipped' },
  ];
  const customers: Customer[] = [
    { id: 1, name: 'Juan Perez', email: 'juan@example.com', orders: 2 },
    { id: 2, name: 'Ana Gomez', email: 'ana@example.com', orders: 1 },
  ];

  // Maqueta: solo muestra y elimina productos
  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="admin-panel-container">
      <h1 className="admin-title">Admin Panel</h1>
      <div className="admin-dashboard">
        {/* Products Section */}
        <div className="admin-section">
          <h2>Products</h2>
          <button className="admin-btn" onClick={() => setShowForm(true)}>Add Product</button>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button className="admin-btn" onClick={() => setSelectedProduct(product)}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Orders Section */}
        <div className="admin-section">
          <h2>Orders</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Customers Section */}
        <div className="admin-section">
          <h2>Customers</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(cust => (
                <tr key={cust.id}>
                  <td>{cust.id}</td>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Settings Section (Demo) */}
        <div className="admin-section">
          <h2>Settings</h2>
          <div style={{ color: '#888', margin: '16px 0' }}>
            Demo: Aquí puedes configurar banners, colores, textos, políticas, etc.
          </div>
        </div>
        {/* Maqueta de formulario para agregar/editar producto */}
        {showForm && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <button className="admin-modal-close" onClick={() => setShowForm(false)}>&times;</button>
              <h3>{selectedProduct ? 'Edit Product' : 'Add Product'}</h3>
              {/* Aquí iría el formulario real */}
              <div style={{ margin: '24px 0', color: '#888' }}>
                Demo: Formulario para agregar/editar producto
              </div>
              <button className="admin-btn" onClick={() => setShowForm(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
