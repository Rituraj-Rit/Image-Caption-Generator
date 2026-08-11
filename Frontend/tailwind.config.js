export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0b0c13',
        muted: '#94a3b8',
        accent: '#8b5cf6',
        accent2: '#a855f7',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(139, 92, 246, 0.2)',
      },
    },
  },
  plugins: [],
};
