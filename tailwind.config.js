import { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
} satisfies Config