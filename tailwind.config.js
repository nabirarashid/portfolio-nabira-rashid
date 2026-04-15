/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Coffee theme palette
        coffee: {
          50: '#faf8f6',
          100: '#f5f5dc',  // Cream
          200: '#e8e3d3',
          300: '#d4c9b8',
          400: '#c0b5a4',
          500: '#8b7355',  
          600: '#6b5344',
          700: '#4a3728',
          800: '#302421',  // Espresso
          900: '#1a0f0a',
        },
        matcha: '#A4B494',
        terracotta: '#E2725B',
        'cafe-cream': '#F5F5DC',
        'cafe-espresso': '#302421',
        'cafe-matcha': '#A4B494',
        'cafe-terracotta': '#E2725B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Nunito', 'sans-serif'],
      },
      animation: {
        steam: 'steam 3s ease-in infinite',
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(0px) translateX(0px) scale(0.8)' 
          },
          '50%': { 
            opacity: '0.6',
            transform: 'translateY(-40px) translateX(10px) scale(1)',
          },
          '100%': { 
            opacity: '0', 
            transform: 'translateY(-80px) translateX(-10px) scale(0.8)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
