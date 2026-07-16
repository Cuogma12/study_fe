/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4848e5',
          100: '#eef2ff', // Example shade for primary/10 or background
        },
        background: {
          light: '#f6f6f8', // from bg-background-light
          dark: '#111121',  // from bg-background-dark
        }
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      keyframes: {
        'quiz-ai-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'quiz-ai-shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
        'quiz-ai-pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'quiz-ai-orbit': {
          '0%': { transform: 'rotate(0deg) translateX(22px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(22px) rotate(-360deg)' },
        },
        'quiz-ai-tip-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'quiz-ai-float': 'quiz-ai-float 2.4s ease-in-out infinite',
        'quiz-ai-shimmer': 'quiz-ai-shimmer 1.6s ease-in-out infinite',
        'quiz-ai-pop-in': 'quiz-ai-pop-in 0.35s ease-out both',
        'quiz-ai-orbit': 'quiz-ai-orbit 3s linear infinite',
        'quiz-ai-tip-in': 'quiz-ai-tip-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};