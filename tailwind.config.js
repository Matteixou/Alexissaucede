/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display:  ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        heading:  ['"Rajdhani"', 'system-ui', 'sans-serif'],
        sans:     ['"Inter"', 'system-ui', 'sans-serif'],
        stats:    ['"Bebas Neue"', 'Impact', 'sans-serif'],
        marker:   ['"Permanent Marker"', 'cursive'],
      },
      colors: {
        void:     '#050508',
        abyss:    '#0A0A0F',
        obsidian: '#111118',
        shadow:   '#1C1C26',
        ember:    '#C0392B',
        lava:     '#8B0000',
        spark:    '#E85D04',
        bone:     '#D4D4DC',
        ash:      '#7A7A8E',
        ghost:    '#2A2A38',
        steel:    '#3A3A4A',
        chrome:   '#7A7A8E',
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
        'forge':      '0.35em',
      },
      boxShadow: {
        'ember-glow': '0 0 24px rgba(255, 255, 255, 0.12)',
        'ember-sm':   '0 0 10px rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [],
}
