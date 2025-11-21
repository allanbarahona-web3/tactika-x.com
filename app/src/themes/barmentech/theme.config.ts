export const barmentechConfig = {
  name: 'Barmentech Platform',
  domain: 'commerce.barmentech.com',
  theme: 'barmentech',
  colors: {
    primary: '#2563EB', // Blue
    secondary: '#7C3AED', // Purple
    accent: '#EC4899', // Pink
    success: '#10B981',
    warning: '#F59E0B',
    dark: '#0F172A',
    light: '#F8FAFC',
  },
  content: {
    heroTitle: 'Create Your Online Store in Minutes',
    heroSubtitle: 'No technical skills needed. Choose from professional templates, integrated payments, and powerful tools.',
    heroMainCTA: 'Start Free Trial',
    heroSecondaryCTA: 'View Demos',
    templates: [
      {
        id: 'amazon',
        title: 'E-Commerce Classic',
        description: 'Amazon-style template. Perfect for selling any type of product. Trusted, professional, and conversion-optimized.',
        badge: 'Most Popular',
        emoji: '🛒',
        tags: ['General Purpose', 'Trusted Design', 'Easy to Use'],
      },
      {
        id: 'minimal',
        title: 'Modern Minimalist',
        description: 'Clean and elegant design. Ideal for fashion, art, design, and premium lifestyle products.',
        badge: 'Premium',
        emoji: '✨',
        tags: ['Elegant', 'Premium Feel', 'Minimalist'],
      },
      {
        id: 'vibrant',
        title: 'Bold & Vibrant',
        description: 'High-energy design with neon colors. Perfect for gaming, tech gadgets, and young audiences.',
        badge: 'New',
        emoji: '🎮',
        tags: ['Gaming', 'Modern', 'Young Vibe'],
      },
      {
        id: 'digital',
        title: 'Digital Products',
        description: 'Specialized for digital codes, subscriptions, and instant delivery. Netflix, Spotify, gaming codes, gift cards.',
        badge: 'Special',
        emoji: '⚡',
        tags: ['Instant Delivery', 'Digital', 'Codes & Licenses'],
      },
    ],
    pricing: [
      {
        id: 'basic',
        name: 'Starter',
        description: 'Perfect for testing and small stores',
        price: 24.99,
        features: [
          { name: 'Up to 50 products', included: true },
          { name: '1 template included', included: true },
          { name: 'Payment gateway included', included: true },
          { name: '4% transaction fee', included: true },
          { name: 'Basic analytics', included: true },
          { name: 'Email support', included: true },
          { name: 'Custom domain', included: false },
          { name: 'API access', included: false },
        ],
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'For growing online businesses',
        price: 44.99,
        featured: true,
        features: [
          { name: 'Up to 200 products', included: true },
          { name: 'All 4 templates', included: true },
          { name: 'Payment gateway OR your own', included: true },
          { name: '2.5% transaction fee', included: true },
          { name: 'Advanced analytics', included: true },
          { name: 'Priority support', included: true },
          { name: 'Custom domain', included: true },
          { name: 'Logistics API', included: true },
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For high-volume stores',
        price: 79.95,
        features: [
          { name: 'Unlimited products', included: true },
          { name: 'All templates + custom design', included: true },
          { name: 'Your own payment gateway', included: true },
          { name: '1.5% transaction fee', included: true },
          { name: 'Full analytics + exports', included: true },
          { name: '24/7 dedicated support', included: true },
          { name: 'Multiple custom domains', included: true },
          { name: 'Full API access', included: true },
        ],
      },
    ],
    features: [
      {
        title: 'Instant Setup',
        description: 'Launch your store in minutes. No code. Just pick a template, add products and publish.',
        icon: '⚡',
      },
      {
        title: 'Integrated Payments',
        description: 'Accept credit cards, PayPal and more. Or connect your own Stripe account for lower fees.',
        icon: '💳',
      },
      {
        title: 'Mobile Optimized',
        description: 'All templates are fully responsive. Your store looks perfect on desktop, tablet and mobile.',
        icon: '📱',
      },
      {
        title: 'Logistics API',
        description: 'Integrate with couriers for automatic shipping labels and tracking. Save time and money.',
        icon: '🚚',
      },
      {
        title: 'Analytics Dashboard',
        description: 'Track sales, visitors and performance. Make data-driven decisions to grow your business.',
        icon: '📊',
      },
      {
        title: 'Safe & Reliable',
        description: 'SSL encryption, secure payments and 99.9% uptime. Your store is always safe and available.',
        icon: '🔒',
      },
    ],
    testimonials: [
      {
        text: 'I launched my store in less than 1 hour. The templates are beautiful and everything just works. Best decision for my business!',
        name: 'Maria Rodriguez',
        role: 'Fashion Store Owner',
        avatar: 'MR',
      },
      {
        text: 'The payment integration is perfect. I love that I can use my own Stripe account. Support is excellent too!',
        name: 'Juan Carlos',
        role: 'Tech Gadgets Seller',
        avatar: 'JC',
      },
      {
        text: 'Went from $0 to $5,000/month in 3 months. The platform is reliable, fast and templates convert really well.',
        name: 'Sofia Perez',
        role: 'Digital Products Store',
        avatar: 'SP',
      },
    ],
    faq: [
      {
        question: 'Do I need technical knowledge to use the platform?',
        answer: 'No! Our platform is designed for everyone. Pick a template, add your products and customize colors and text. It\'s as easy as using social media.',
      },
      {
        question: 'Can I use my own domain name?',
        answer: 'Yes! With Professional and Enterprise plans, you can connect your own domain (mystore.com). We provide step-by-step instructions to set it up.',
      },
      {
        question: 'What payment methods do you support?',
        answer: 'We include built-in payment processing for credit/debit cards and PayPal. With Professional and Enterprise plans, you can also connect your own Stripe or PayPal account for lower fees.',
      },
      {
        question: 'What happens if I don\'t pay my subscription?',
        answer: 'Your store will be suspended after 5 days of non-payment. Your data stays safe for 30 days, giving you time to update your payment method. After 30 days, the store and data are permanently deleted.',
      },
      {
        question: 'Can I change templates after launching?',
        answer: 'Yes! You can switch templates anytime. Your products and data are preserved. Just pick a new template, adjust colors and publish. Takes only minutes.',
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes! All plans include a 14-day free trial. No credit card required. Try all features, add products and see if it\'s right for you. Cancel anytime.',
      },
    ],
  },
};
