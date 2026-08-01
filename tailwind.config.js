/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          blue: {
            50: '#f0f7ff',
            100: '#e0effe',
            500: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            600: '#16a34a',
            800: '#166534',
          },
          wood: {
            100: '#fdf8f0',
            200: '#f6ebda',
            300: '#e7d3b8',
            700: '#8c5b36',
            900: '#4a2e18',
          }
        }
      },
      fontFamily: {
        serif: ['Outfit', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        wobble: 'wobble 0.6s ease-in-out infinite',
        popIn: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }
    },
  },
  plugins: [],
}
