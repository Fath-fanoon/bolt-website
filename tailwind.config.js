/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#050608',
          900: '#0A0C10',
          850: '#0E1117',
          800: '#141821',
          700: '#1C2230',
          600: '#283040',
        },
        accent: {
          50: '#E6F5FF',
          100: '#B8E0FF',
          200: '#8ACCFE',
          300: '#5CB8FA',
          400: '#2EA4F5',
          500: '#0090F0',
          600: '#0073C2',
          700: '#005690',
          800: '#003A5E',
          900: '#001D32',
        },
        signal: {
          green: '#00E5A0',
          amber: '#FFB84D',
          red: '#FF5C5C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['14rem', { lineHeight: '0.85' }],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'ultra': '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
