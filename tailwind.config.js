/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans':['Roboto', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        "home": "url(https://images2.imgbox.com/ce/5b/ToJzmFeW_o.png)"
      },
      filter: {
        'brightness-70': 'brightness(0.7)',
      },
    },
  },
  plugins: [],
}

