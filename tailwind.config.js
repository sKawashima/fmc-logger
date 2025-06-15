/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#1070ca',
          600: '#0d5aa7',
          700: '#0a4482',
        },
        danger: {
          50: '#fef2f2',
          500: '#d14343',
          600: '#b91c1c',
          700: '#991b1b',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      spacing: {
        'major-1': '8px',
        'major-2': '16px',
        'major-3': '24px',
        'major-4': '32px',
        'major-5': '40px',
        'major-6': '48px',
        'major-8': '64px',
        'major-10': '80px',
        'major-12': '96px',
        'major-16': '128px',
        'major-20': '160px',
        'major-24': '192px',
        'major-60': '480px',
      },
    },
  },
  plugins: [],
}