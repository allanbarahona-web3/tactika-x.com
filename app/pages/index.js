import Head from 'next/head';
import { useState, useRef } from 'react';

const products = [
	// DEFENSA PERSONAL
	{
		id: 1,
		name: 'PR-24 Tonfa Profesional',
		category: 'defense',
		price: 45.0,
		icon: '🚔',
		description: 'Tonfa policial de uso profesional, material resistente',
		badge: 'popular',
	},
	{
		id: 2,
		name: 'Arma de Salva Calibre 9mm',
		category: 'defense',
		price: 150.0,
		icon: '🔫',
		description: 'Arma de fogueo para defensa y entrenamiento',
		badge: 'new',
	},
	{
		id: 3,
		name: 'Pistola de Balines 4.5mm',
		category: 'defense',
		price: 85.0,
		icon: '🎯',
		description: 'Pistola de CO2 para práctica y deporte',
		badge: null,
	},
	{
		id: 4,
		name: 'Arma Traumática T4E',
		category: 'defense',
		price: 320.0,
		icon: '🔴',
		description: 'Marcadora de defensa con proyectiles de goma',
		badge: 'popular',
	},
	{
		id: 5,
		name: 'Rifle de Balines Benjamin',
		category: 'defense',
		price: 280.0,
		icon: '🎯',
		description: 'Rifle de precisión calibre 4.5mm',
		badge: null,
	},
	{
		id: 6,
		name: 'Ballesta Táctica 175 lbs',
		category: 'defense',
		price: 195.0,
		icon: '🏹',
		description: 'Ballesta compacta con mira telescópica',
		badge: 'new',
	},
	{
		id: 7,
		name: 'Esposas de Acero Inoxidable',
		category: 'defense',
		price: 25.0,
		icon: '⛓️',
		description: 'Esposas profesionales con doble seguro',
		badge: null,
	},
	{
		id: 8,
		name: 'Boqui-toquis (Boquitokis)',
		category: 'defense',
		price: 35.0,
		icon: '🥊',
		description: 'Manoplas de autodefensa',
		badge: null,
	},
	// EQUIPAMIENTO TÁCTICO
	{
		id: 9,
		name: 'Bulto Táctico 40L',
		category: 'tactical',
		price: 75.0,
		icon: '🎒',
		description: 'Mochila militar con sistema MOLLE',
		badge: 'popular',
	},
	{
		id: 10,
		name: 'Bulto Hidrapack 3L',
		category: 'tactical',
		price: 55.0,
		icon: '💧',
		description: 'Mochila con sistema de hidratación integrado',
		badge: 'new',
	},
	{
		id: 11,
		name: 'Bulto Asalto 60L',
		category: 'tactical',
		price: 95.0,
		icon: '🎖️',
		description: 'Mochila de gran capacidad para operaciones',
		badge: null,
	},
	{
		id: 12,
		name: 'Salveques Militar',
		category: 'tactical',
		price: 120.0,
		icon: '🦺',
		description: 'Chaleco porta placas táctico',
		badge: 'popular',
	},
	{
		id: 13,
		name: 'Chaleco Táctico MOLLE',
		category: 'tactical',
		price: 85.0,
		icon: '🎯',
		description: 'Chaleco modular con múltiples bolsillos',
		badge: null,
	},
	{
		id: 14,
		name: 'Chaleco para Pesca',
		category: 'tactical',
		price: 45.0,
		icon: '🎣',
		description: 'Chaleco multibolsillos para pesca deportiva',
		badge: null,
	},
	{
		id: 15,
		name: 'Cangureras Tácticas',
		category: 'tactical',
		price: 28.0,
		icon: '👜',
		description: 'Riñonera resistente con compartimentos',
		badge: null,
	},
	{
		id: 16,
		name: 'Musleras Tácticas (Par)',
		category: 'tactical',
		price: 35.0,
		icon: '🦵',
		description: 'Porta objetos para piernas con velcro',
		badge: null,
	},
	// VESTIMENTA
	{
		id: 17,
		name: 'Pantalón Militar Cargo',
		category: 'clothing',
		price: 48.0,
		icon: '👖',
		description: 'Pantalón táctico resistente con múltiples bolsillos',
		badge: 'popular',
	},
	{
		id: 18,
		name: 'Camisa Militar Ripstop',
		category: 'clothing',
		price: 38.0,
		icon: '👕',
		description: 'Camisa táctica de secado rápido',
		badge: null,
	},
	{
		id: 19,
		name: 'Jacket Militar M65',
		category: 'clothing',
		price: 95.0,
		icon: '🧥',
		description: 'Chaqueta militar clásica con forro removible',
		badge: 'popular',
	},
	{
		id: 20,
		name: 'Jacket Impermeable',
		category: 'clothing',
		price: 65.0,
		icon: '☔',
		description: 'Chaqueta táctica resistente al agua',
		badge: 'new',
	},
	{
		id: 21,
		name: 'Poncho Militar',
		category: 'clothing',
		price: 25.0,
		icon: '🌧️',
		description: 'Poncho impermeable multiuso',
		badge: null,
	},
	{
		id: 22,
		name: 'Zapatos Militares Botas',
		category: 'clothing',
		price: 85.0,
		icon: '👢',
		description: 'Botas tácticas con suela antideslizante',
		badge: 'popular',
	},
	{
		id: 23,
		name: 'Chacos Tácticos',
		category: 'clothing',
		price: 45.0,
		icon: '👡',
		description: 'Sandalias deportivas todo terreno',
		badge: null,
	},
	{
		id: 24,
		name: 'Pasamontañas Negro',
		category: 'clothing',
		price: 15.0,
		icon: '🎭',
		description: 'Máscara facial táctica transpirable',
		badge: null,
	},
	{
		id: 25,
		name: 'Guantes Tácticos Full Finger',
		category: 'clothing',
		price: 22.0,
		icon: '🧤',
		description: 'Guantes reforzados con protección nudillos',
		badge: 'popular',
	},
	{
		id: 26,
		name: 'Gorras Militares Ajustables',
		category: 'clothing',
		price: 18.0,
		icon: '🧢',
		description: 'Gorras tácticas con parche velcro',
		badge: null,
	},
	{
		id: 27,
		name: 'Sombreros Boonie',
		category: 'clothing',
		price: 20.0,
		icon: '👒',
		description: 'Sombrero militar de ala ancha',
		badge: null,
	},
	{
		id: 28,
		name: 'Mangas Protección Solar',
		category: 'clothing',
		price: 12.0,
		icon: '🌞',
		description: 'Mangas UV para brazos',
		badge: null,
	},
	// OUTDOOR & CAMPING
	{
		id: 29,
		name: 'Tienda de Campaña 4 Personas',
		category: 'outdoor',
		price: 120.0,
		icon: '⛺',
		description: 'Carpa resistente para camping',
		badge: 'popular',
	},
	{
		id: 30,
		name: 'Tienda Individual Táctica',
		category: 'outdoor',
		price: 65.0,
		icon: '🏕️',
		description: 'Tienda compacta militar',
		badge: null,
	},
	{
		id: 31,
		name: 'Cantimplora Militar 1L',
		category: 'outdoor',
		price: 18.0,
		icon: '🍶',
		description: 'Cantimplora de aluminio con funda',
		badge: null,
	},
	{
		id: 32,
		name: 'Bastones Senderismo (Par)',
		category: 'outdoor',
		price: 35.0,
		icon: '🥾',
		description: 'Bastones telescópicos ajustables',
		badge: null,
	},
	{
		id: 33,
		name: 'Foco LED Recargable 5000lm',
		category: 'outdoor',
		price: 45.0,
		icon: '🔦',
		description: 'Linterna táctica de alto poder',
		badge: 'popular',
	},
	{
		id: 34,
		name: 'Foco de Cabeza LED',
		category: 'outdoor',
		price: 28.0,
		icon: '💡',
		description: 'Linterna frontal recargable',
		badge: 'new',
	},
	{
		id: 35,
		name: 'Foco Mini EDC',
		category: 'outdoor',
		price: 15.0,
		icon: '🔍',
		description: 'Linterna compacta llavero',
		badge: null,
	},
	// ÓPTICA
	{
		id: 36,
		name: 'Binoculares 10x50',
		category: 'optics',
		price: 85.0,
		icon: '🔭',
		description: 'Binoculares profesionales con prisma',
		badge: 'popular',
	},
	{
		id: 37,
		name: 'Telescopio Terrestre 20-60x',
		category: 'optics',
		price: 150.0,
		icon: '🌌',
		description: 'Telescopio de observación con trípode',
		badge: null,
	},
	{
		id: 38,
		name: 'Mira Telescópica 3-9x40',
		category: 'optics',
		price: 120.0,
		icon: '🎯',
		description: 'Mira táctica con retícula iluminada',
		badge: 'popular',
	},
	{
		id: 39,
		name: 'Lentes Tácticos Disparo',
		category: 'optics',
		price: 35.0,
		icon: '🕶️',
		description: 'Gafas balísticas con filtro UV',
		badge: null,
	},
	{
		id: 40,
		name: 'Mira Punto Rojo',
		category: 'optics',
		price: 95.0,
		icon: '🔴',
		description: 'Visor red dot con montaje rápido',
		badge: 'new',
	},
	// PROTECCIÓN
	{
		id: 41,
		name: 'Chaleco Antibalas Nivel IIIA',
		category: 'protection',
		price: 450.0,
		icon: '🛡️',
		description: 'Chaleco balístico certificado',
		badge: 'popular',
	},
	{
		id: 42,
		name: 'Placas Balísticas (Par)',
		category: 'protection',
		price: 280.0,
		icon: '⚔️',
		description: 'Placas nivel III standalone',
		badge: null,
	},
	{
		id: 43,
		name: 'Funda Táctica Rifle',
		category: 'protection',
		price: 55.0,
		icon: '📦',
		description: 'Funda acolchada con correas MOLLE',
		badge: null,
	},
	{
		id: 44,
		name: 'Funda Pistola Kydex',
		category: 'protection',
		price: 38.0,
		icon: '🔐',
		description: 'Funda rígida con retención ajustable',
		badge: 'new',
	},
	// ACCESORIOS
	{
		id: 45,
		name: 'Brújula Militar Lensatic',
		category: 'accessories',
		price: 25.0,
		icon: '🧭',
		description: 'Brújula profesional con visor',
		badge: null,
	},
	{
		id: 46,
		name: 'Reloj Táctico Digital',
		category: 'accessories',
		price: 45.0,
		icon: '⌚',
		description: 'Reloj militar resistente al agua',
		badge: 'popular',
	},
	{
		id: 47,
		name: 'Scanner Radio Portátil',
		category: 'accessories',
		price: 150.0,
		icon: '📻',
		description: 'Radio escáner multibanda',
		badge: null,
	},
	{
		id: 48,
		name: 'Walkie-Talkie Set (Par)',
		category: 'accessories',
		price: 65.0,
		icon: '📞',
		description: 'Radios de comunicación 10km alcance',
		badge: 'popular',
	},
	{
		id: 49,
		name: 'Kit Supervivencia 10 en 1',
		category: 'accessories',
		price: 35.0,
		icon: '🔧',
		description: 'Kit multiherramienta de emergencia',
		badge: 'new',
	},
	{
		id: 50,
		name: 'Accesorios Tácticos Set',
		category: 'accessories',
		price: 28.0,
		icon: '⚙️',
		description: 'Set de clips, mosquetones y cordones',
		badge: null,
	},
];

const categories = [
	{ key: 'all', label: 'Todos', icon: 'fas fa-th' },
	{ key: 'defense', label: 'Defensa', icon: 'fas fa-shield-alt' },
	{ key: 'tactical', label: 'Táctico', icon: 'fas fa-vest' },
	{ key: 'clothing', label: 'Vestimenta', icon: 'fas fa-tshirt' },
	{ key: 'outdoor', label: 'Outdoor', icon: 'fas fa-mountain' },
	{ key: 'optics', label: 'Óptica', icon: 'fas fa-binoculars' },
	{ key: 'protection', label: 'Protección', icon: 'fas fa-user-shield' },
	{ key: 'accessories', label: 'Accesorios', icon: 'fas fa-tools' },
];

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [cart, setCart] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const productsRef = useRef(null);

	const filteredProducts =
		selectedCategory === 'all'
			? products
			: products.filter((p) => p.category === selectedCategory);

	const addToCart = (product) => {
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

	const removeFromCart = (productId) => {
		setCart((prev) => prev.filter((item) => item.id !== productId));
	};

	const updateQuantity = (productId, change) => {
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

	// Función para filtrar y hacer scroll al catálogo
	const handleCategoryClick = (catKey) => {
		setSelectedCategory(catKey);
		setTimeout(() => {
			if (productsRef.current) {
				productsRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		}, 100);
	};

	return (
		<>
			<Head>
				<title>TACTIKA-X | Equipamiento Táctico y Defensa No Letal</title>
				<meta
					name="description"
					content="Tienda especializada en equipamiento táctico y defensa personal no letal. Pepper spray, tasers, chalecos, kits completos y más."
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
				/>
			</Head>
			<main>
				{/* HEADER */}
				<header>
					<div className="header-top">
						<div className="container">
							<div className="header-top-content">
								<div className="header-top-left">
									<a href="tel:+50612345678">
										<i className="fas fa-phone"></i> +506 1234-5678
									</a>
									<a href="mailto:info@tactikax.com">
										<i className="fas fa-envelope"></i> info@tactikax.com
									</a>
								</div>
								<div className="social-links">
									<a href="#" aria-label="Facebook">
										<i className="fab fa-facebook-f"></i>
									</a>
									<a href="#" aria-label="Instagram">
										<i className="fab fa-instagram"></i>
									</a>
									<a href="#" aria-label="WhatsApp">
										<i className="fab fa-whatsapp"></i>
									</a>
									<a href="#" aria-label="TikTok">
										<i className="fab fa-tiktok"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="header-content">
							<div className="logo-container">
								<div className="logo">TX</div>
								<div className="brand-text">
									<h1>TACTIKA-X</h1>
									<p>Equipamiento Profesional</p>
								</div>
							</div>
							<div className="header-actions">
								<div className="search-box">
									<input type="text" placeholder="Buscar productos..." />
									<button>
										<i className="fas fa-search"></i>
									</button>
								</div>
								<button
									className="icon-btn"
									onClick={() => setShowCart(true)}
								>
									<i className="fas fa-shopping-cart"></i>
									<span className="cart-badge">{cartCount}</span>
								</button>
							</div>
						</div>
					</div>
				</header>
				{/* NAVIGATION */}
				<nav>
					<div className="container">
						<div className="nav-container">
							{categories.map((cat) => (
								<a
									key={cat.key}
									className={`nav-item${selectedCategory === cat.key ? ' active' : ''}`}
									onClick={() => handleCategoryClick(cat.key)}
									style={{ cursor: 'pointer' }}
								>
									<i className={cat.icon}></i> {cat.label}
								</a>
							))}
						</div>
					</div>
				</nav>
				{/* HERO SECTION */}
				<section className="hero">
					<div className="container">
						<div className="hero-content">
							<span className="hero-badge">
								🔥 PRODUCTOS CERTIFICADOS Y LEGALES
							</span>
							<h2>
								Equipamiento <span>Táctico</span> y
								<br />
								Defensa Personal Profesional
							</h2>
							<p>
								Equípate con lo mejor en defensa no letal, equipamiento táctico
								y accesorios outdoor. Calidad certificada, envíos rápidos y
								asesoría especializada.
							</p>
							<div className="hero-buttons">
								<a
									href="#products"
									className="btn btn-primary"
								>
									<i className="fas fa-shopping-bag"></i> Ver Catálogo
								</a>
								<a
									href="https://wa.me/50612345678"
									className="btn btn-secondary"
									target="_blank"
								>
									<i className="fab fa-whatsapp"></i> Asesoría WhatsApp
								</a>
							</div>
						</div>
					</div>
				</section>
				{/* FEATURES SECTION */}
				<section className="features">
					<div className="container">
						<div className="features-grid">
							<div className="feature-card">
								<div className="feature-icon">🚚</div>
								<h3>Envíos a Todo el País</h3>
								<p>Entrega rápida y segura. Recibe tu pedido en 48-72 horas.</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon">✅</div>
								<h3>Productos Certificados</h3>
								<p>
									Todo nuestro inventario cumple con normativas legales y de
									calidad.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon">🔒</div>
								<h3>Compra Segura</h3>
								<p>
									Pasarelas de pago verificadas. Tu información está protegida.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon">💬</div>
								<h3>Asesoría Experta</h3>
								<p>
									Nuestro equipo te ayuda a elegir el equipo ideal para ti.
								</p>
							</div>
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
							<div className="category-card" onClick={() => handleCategoryClick('defense')} style={{ cursor: 'pointer' }}>
								<div className="category-image">🛡️</div>
								<div className="category-content">
									<h3>Defensa Personal</h3>
									<p>Armas no letales, tasers, pepper spray y más</p>
									<span className="category-badge">15+ productos</span>
								</div>
							</div>
							<div className="category-card" onClick={() => handleCategoryClick('tactical')} style={{ cursor: 'pointer' }}>
								<div className="category-image">🎖️</div>
								<div className="category-content">
									<h3>Equipamiento Táctico</h3>
									<p>Bultos, chalecos, salveques y equipo profesional</p>
									<span className="category-badge">25+ productos</span>
								</div>
							</div>
							<div className="category-card" onClick={() => handleCategoryClick('clothing')} style={{ cursor: 'pointer' }}>
								<div className="category-image">👕</div>
								<div className="category-content">
									<h3>Vestimenta</h3>
									<p>Ropa militar, gorras, guantes y más</p>
									<span className="category-badge">30+ productos</span>
								</div>
							</div>
							<div className="category-card" onClick={() => handleCategoryClick('outdoor')} style={{ cursor: 'pointer' }}>
								<div className="category-image">⛺</div>
								<div className="category-content">
									<h3>Outdoor & Camping</h3>
									<p>Tiendas, cantimploras, focos y equipo de supervivencia</p>
									<span className="category-badge">20+ productos</span>
								</div>
							</div>
							<div className="category-card" onClick={() => handleCategoryClick('optics')} style={{ cursor: 'pointer' }}>
								<div className="category-image">🔭</div>
								<div className="category-content">
									<h3>Óptica</h3>
									<p>Binoculares, telescopios, miras y lentes tácticos</p>
									<span className="category-badge">12+ productos</span>
								</div>
							</div>
							<div className="category-card" onClick={() => handleCategoryClick('protection')} style={{ cursor: 'pointer' }}>
								<div className="category-image">🦺</div>
								<div className="category-content">
									<h3>Protección</h3>
									<p>Chalecos antibalas, fundas y equipo de protección</p>
									<span className="category-badge">10+ productos</span>
								</div>
							</div>
							<div className="category-card" onClick={() => handleCategoryClick('accessories')} style={{ cursor: 'pointer' }}>
								<div className="category-image">🔧</div>
								<div className="category-content">
									<h3>Accesorios</h3>
									<p>Brújulas, esposas, scanners y más</p>
									<span className="category-badge">18+ productos</span>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* PRODUCTS SECTION */}
				<section className="products-section" id="products" ref={productsRef}>
					<div className="container">
						<div className="section-header">
							<span className="section-badge">CATÁLOGO COMPLETO</span>
							<h2>Nuestros Productos</h2>
							<p>Equipamiento profesional para todas tus necesidades</p>
						</div>
						<div className="filter-tabs">
							{categories.map((cat) => (
								<button
									key={cat.key}
									className={`filter-btn${
										selectedCategory === cat.key ? ' active' : ''
									}`}
									onClick={() => setSelectedCategory(cat.key)}
								>
									<i className={cat.icon}></i> {cat.label}
								</button>
							))}
						</div>
						<div className="products-grid" id="products-container">
							{filteredProducts.length === 0 ? (
								<p
									style={{
										textAlign: 'center',
										padding: '40px',
										color: '#888',
									}}
								>
									No hay productos en esta categoría.
								</p>
							) : (
								filteredProducts.map((product) => (
									<div className="product-card" key={product.id}>
										<div className="product-image">
											{product.icon}
											{product.badge && (
												<span
													className={`product-badge ${product.badge}`}
												>
													{product.badge === 'new'
														? 'NUEVO'
														: product.badge === 'popular'
														? 'POPULAR'
														: product.badge}
												</span>
											)}
										</div>
										<div className="product-content">
											<div className="product-category">
												{categories.find(
													(c) => c.key === product.category
												)?.label || product.category}
											</div>
											<h3>{product.name}</h3>
											<p>{product.description}</p>
											<div className="product-footer">
												<span className="product-price">
													${product.price.toFixed(2)}
												</span>
												<button
													className="add-to-cart-btn"
													onClick={() => addToCart(product)}
												>
													<i className="fas fa-cart-plus"></i> Agregar
												</button>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</section>
				{/* FOOTER */}
				<footer>
					<div className="container">
						<div className="footer-content">
							<div className="footer-section">
								<h3>TACTIKA-X</h3>
								<p
									style={{
										color: 'rgba(255, 255, 255, 0.7)',
										marginBottom: 20,
									}}
								>
									Tu tienda de confianza para equipamiento táctico y defensa
									personal. Calidad garantizada y servicio profesional.
								</p>
								<div className="social-links">
									<a href="#">
										<i className="fab fa-facebook-f"></i>
									</a>
									<a href="#">
										<i className="fab fa-instagram"></i>
									</a>
									<a href="#">
										<i className="fab fa-whatsapp"></i>
									</a>
									<a href="#">
										<i className="fab fa-tiktok"></i>
									</a>
								</div>
							</div>
							<div className="footer-section">
								<h3>Categorías</h3>
								<ul>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Defensa Personal
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Equipamiento Táctico
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Vestimenta
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Outdoor & Camping
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Accesorios
										</a>
									</li>
								</ul>
							</div>
							<div className="footer-section">
								<h3>Información</h3>
								<ul>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Sobre Nosotros
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Políticas de Venta
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Términos y Condiciones
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Envíos y Devoluciones
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-chevron-right"></i> Preguntas Frecuentes
										</a>
									</li>
								</ul>
							</div>
							<div className="footer-section">
								<h3>Contacto</h3>
								<ul>
									<li>
										<a href="tel:+50612345678">
											<i className="fas fa-phone"></i> +506 1234-5678
										</a>
									</li>
									<li>
										<a href="mailto:info@tactikax.com">
											<i className="fas fa-envelope"></i> info@tactikax.com
										</a>
									</li>
									<li>
										<a href="#">
											<i className="fas fa-map-marker-alt"></i> San José, Costa Rica
										</a>
									</li>
									<li>
										<a href="https://wa.me/50612345678">
											<i className="fab fa-whatsapp"></i> WhatsApp 24/7
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="footer-bottom">
							<p>
								&copy; 2025 TACTIKA-X. Todos los derechos reservados. | Barmentech Web
								Developer
							</p>
						</div>
					</div>
				</footer>
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
			</main>
			{/* WhatsApp Floating CTA */}
			<a
  href="https://wa.me/50688888888?text=Hola%20quiero%20información%20de%20productos%20TACTIKA-X"
  className="whatsapp-float whatsapp-bounce"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp Tactika-X"
>
		<img src="/Whatsapp%20Logo%20Web.png" alt="WhatsApp" width="56" height="56" style={{ display: 'block' }} />
</a>
		</>
	);
}
