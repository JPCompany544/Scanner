/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'void': '#000000',
        'crimson': {
          DEFAULT: '#C3162C',
          pulse: '#E8173A',
          hover: '#D61D3A',
          flash: '#FF2848',
        },
        'steel': '#2A1B1B',
        'ember': '#5A0F19',
        'night': '#1E1E1E',
        'ghost': 'rgba(255, 0, 0, 0.08)',
        'text': {
          white: '#FFFFFF',
          body: '#C8C8C8',
          whisper: '#B87474',
          sub: '#949191',
        },
        'indicator': {
          hot: '#FF2848',
          cold: '#4C4143',
          frozen: '#6F6B70',
        },
      },
      animation: {
        'sweep': 'sweep 0.7s linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 1.3s infinite',
        'ring-hot': 'ring-hot 1.5s ease-out infinite',
        'ring-cold': 'ring-cold 3s ease-in-out infinite',
        'ring-frozen': 'ring-frozen 2s steps(6) infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'press': 'press 0.12s ease-out',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0' },
        },
        'ring-hot': {
          '0%': { 'box-shadow': '0 0 0 0 rgba(255, 40, 72, 0.6)' },
          '70%': { 'box-shadow': '0 0 0 8px rgba(255, 40, 72, 0)' },
          '100%': { 'box-shadow': '0 0 0 0 rgba(255, 40, 72, 0)' },
        },
        'ring-cold': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '0.4' },
        },
        'ring-frozen': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        press: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
        },
      },
    },
  },
  plugins: [],
}
