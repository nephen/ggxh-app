import type { Config } from 'tailwindcss'
export default <Config>{
  content: ['./components/**/*.{vue,js}', './pages/**/*.{vue,js}', './app.vue'],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
      },
    },
  },
  plugins: [],
}
