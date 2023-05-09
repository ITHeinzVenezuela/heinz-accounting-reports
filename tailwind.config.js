/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#e42221",
        secondary: "#17396d",

        black: "#141414",
        dark_grey: "#222327",
        light_grey: "#9AA3AE",
        
        // Semantic Colors
        error: {
          light: "#D83232",
          base: "#B01212",
          dark: "#8C0000",
        },
        warning: {
          light: "#FFDE81",
          base: "#EFB008",
          dark: "#976400",
        },
        info: {
          light: "#4D82F3",
          base: "#2563EB",
          dark: "#0037B3",
        },
        success: {
          light: "#419E6A",
          base: "#00632B",
          dark: "#00401C",
        },
      }
    },
  },
  plugins: [],
}
