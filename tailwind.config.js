/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors:{
        primary:{
          DEFAULT: '#00006B',
          'light': '#4F56B2',
          'dark':'#01194C'
        },
        secondary:{
          DEFAULT: '#AC0000',
          'light': '#EF0000',
          'dark':'#720000'
        },
        'neutral':{
          DEFAULT: '#F2EFFA',
          'text': '#444444',
          'hover': '#F6F6F6'
        },
        'error':{
          DEFAULT:'#FFDBCC',
          'light':'#FFDBCC',
          'dark': '#8D3800',
          'text': '#361000'
        },
        'success':{
          DEFAULT:'#D8EFD1',
          'light':'#D8EFD1',
          'dark': '#249337',
          'text': '#103717'
        },
        'info':{
          DEFAULT:'#D6E2FF',
          'light':'#D6E2FF',
          'dark': '#0053A0',
          'text': '#003062'
        },
        'alert':{
          DEFAULT:'#E0E0FF',
          'light':'#E0E0FF',
          'dark': '#373D92',
          'text': '#1E257B'
        },
        'grays':{

          DEFAULT: "#E4E1EC",
          'light': "#FBF8FF",
          'dark': "#928F9A",

        }
      }
    },
  },
  plugins: [
    function({addUtilities}){
      const newUtilities = {
        '.scrollbar-thin':{
          scrollbarWidth: 'thin',
          scrollbarcolor: 'rgb(31 29 29) white',
        },
        '.scrollbar-webkit':{
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track' :{
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb':{
            backgroundColor: 'rgb(67 67 67)',
            borderRadius: '10px',
            border: '1px solid white'
          }
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

