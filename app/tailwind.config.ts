import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#7C3AED',
        accent: '#EC4899',
        success: '#10B981',
        warning: '#F59E0B',
        dark: '#0F172A',
        light: '#F8FAFC',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        'gradient-hero': 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #F093FB 100%)',
      },
      zIndex: {
        '60': '60',
        '65': '65',
        '70': '70',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 40px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 60px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s infinite',
      },
    },
  },
  plugins: [],
}
export default config
