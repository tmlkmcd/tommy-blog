/** @type {import('tailwindcss').Config} */
const { flipCard } = require("./tailwind/flipCard");
const { borderGradient } = require("./tailwind/borderGradient");
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#111",
      white: "#fff",
      iceColdStare: {
        50: "#f9e8f4",
        100: "#ffeafe",
        200: "#f2e0ff",
        300: "#dcd5ff",
        400: "#c6ceff",
        500: "#b0c9f9",
        600: "#87acdb",
        700: "#5b81b1",
        800: "#324d7e",
        900: "#131d46",
      },
      pinkApotheosis: {
        50: "#f9ebe9",
        100: "#ffeaea",
        200: "#ffe1e8",
        300: "#ffd6e9",
        400: "#ffc7ed",
        500: "#f9b1ee",
        600: "#db88da",
        700: "#a95cb1",
        800: "#71337e",
        900: "#3a1346",
      },
      pasta: {
        50: "#f9f9e9",
        100: "#ffffea",
        200: "#fffde1",
        300: "#fffad6",
        400: "#fff3c7",
        500: "#f9e0b1",
        600: "#dbb088",
        700: "#b1725c",
        800: "#7e3433",
        900: "#461320",
      },
      lightMint: {
        50: "#ebf9e9",
        100: "#ebffea",
        200: "#e1ffe5",
        300: "#d6ffdf",
        400: "#c7ffd5",
        500: "#b1f9bc",
        600: "#8ddb88",
        700: "#7cb15c",
        800: "#6f7e33",
        900: "#463713",
      },
      sapphireSplendour: {
        50: "#efccdd",
        100: "#ebb3da",
        200: "#d784e2",
        300: "#9c5ad6",
        400: "#5b39c7",
        500: "#2721b3",
        600: "#131c99",
        700: "#0c177a",
        800: "#090d57",
        900: "#080631",
      },
      nobel: {
        50: "#f8f8f8",
        100: "#f0f0f0",
        200: "#e4e4e4",
        300: "#d1d1d1",
        400: "#b3b3b3",
        500: "#9a9a9a",
        600: "#818181",
        700: "#6a6a6a",
        800: "#5a5a5a",
        900: "#4e4e4e",
        950: "#282828",
      },
      snax: "#ffb700",
    },
    extend: {
      maxWidth: {
        xxxs: "10rem",
        xxs: "16rem",
      },
      backgroundImage: {
        page: 'url("images/background.jpg")',
        portrait: 'url("images/me.jpg")',
      },
      boxShadow: {
        main: "rgb(17, 17, 17) 4px 4px 8px 0px",
        casual: "rgba(17, 17, 17, 0.75) 4px 4px 8px 0px",
        casualLight: "rgba(17, 17, 17, 0.5) 4px 4px 8px 0px",
        gistTooltip: "rgba(0, 0, 0, 0.75) 0px 0px 24px 0px inset",
      },
      fontFamily: {
        metamorphous: ["Metamorphous", "sans-serif"],
        aleo: ["Aleo", "sans-serif"],
      },
      keyframes: {
        "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        "fade-out": { "0%": { opacity: 1 }, "100%": { opacity: 0 } },
        "slide-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-15%)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-15%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in-fancy": {
          "0%": { opacity: 0, transform: "translateY(1.5rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-out": "fade-out 200ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "slide-up": "slide-up 200ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "slide-down":
          "slide-down 200ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-in-fancy":
          "fade-in-fancy 400ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
      });
    },
    flipCard,
    borderGradient,
    require("@sira-ui/tailwind")({
      themes: [
        {
          name: "light",
          colorScheme: "light",
          colors: {
            success: "#8ddb88",
          },
        },
      ],
    }),
  ],
};
