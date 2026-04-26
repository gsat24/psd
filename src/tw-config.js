tailwind.config = {
  theme: {
    extend: {
      colors: {
        'psd-green': '#0A5C4F',
        'psd-yellow': '#F4C430',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        blob: "blob 7s infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};
