/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#F8EEDC',
        plum: '#38241B',
        gold: '#B98535',
        cream: '#38241B',
        mist: '#38241B',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(185, 133, 53, 0.18)',
        soft: '0 18px 45px rgba(75, 43, 28, 0.14)',
      },
      backgroundImage: {
        aura:
          'radial-gradient(circle at top, rgba(185, 133, 53, 0.16), transparent 35%), radial-gradient(circle at 20% 20%, rgba(135, 82, 53, 0.22), transparent 30%), linear-gradient(180deg, #FFF9F0 0%, #E8D1B4 100%)',
      },
    },
  },
  plugins: [],
}
