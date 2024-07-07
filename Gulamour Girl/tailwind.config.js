/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'max-786': { 'max': '786px' },
      },
    },
  },
  plugins: [],
  theme: {
    extend: {
      backgroundColor: {
        'common': '#ecf2fc',
        'login':'#00215E',
         'navbar' : '#615EFC',
         'button' : '#1D24CA',
         'button-hover' : '#211C6A',
         'card' : '#ffffff',
         'card-header' : '#FEFDED',
         'card-header-hover' : '#FFB74D ',
          'card-hover' : '#b8cdf4',
          'input' : '#ecf2fc',
          'input-focus' : 'white',
          'footer' : '#6190E6',
          'common-dark' : '#0F1035',
          'sidebar':'#B7C9F2',
          'category-hover':'#A3D8FF',
          'category-selected':'#83B4FF',
      },
      textColor: {
        'warning' : 'red',
        'common': '#0F1035',
        'nav': '#0F1035',
        'nav-active'  : '#DCF2F1',
        'nav-hover': '#ffffff',
        'button' : '#DCF2F1',
        'button-hover' : '#7FC7D9',
        'card-hover' : '',
      },
      borderColor: {
        'common': '#0F1035',
        'nav': '#0F1035',
        'nav-hover': '#DCF2F1',
        'button' : 'white',
        'button-hover' : '#7FC7D9',
        'card-hover' : '#FFB74D',
        'card' : '#6190E6', 
      },

      fontFamily: {
        'common' : ['Roboto Condensed', 'sans-serif'],
        'sans': ['Nunito', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
        'title': ['sevillana']
      },
    }
  }
};
