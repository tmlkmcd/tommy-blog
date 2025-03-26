import plugin from "tailwindcss/plugin";

export const flipCard = plugin(function ({ addUtilities }) {
  addUtilities({
    ".-rotate-x-180": { transform: "rotateX(-180deg)" },
    ".flipCard-wrapper": {
      perspective: "40rem",
      "&:hover .flipCard-inner-wrapper": {
        transform: "rotateX(180deg)",
      },
      "&:active .flipCard-inner-wrapper": {
        transform: "rotateX(180deg)",
      },
      "&:focus .flipCard-inner-wrapper": {
        transform: "rotateX(180deg)",
      },
    },
    ".flipCard-inner-wrapper": {
      display: "flex",
      transformStyle: "preserve-3d",
      transition: "700ms transform",
      "& > *:nth-child(1)": {
        backfaceVisibility: "hidden",
        minWidth: "100%",
      },
      "& > *:nth-child(2)": {
        backfaceVisibility: "hidden",
        minWidth: "100%",
        transform: "rotateX(-180deg) translate(-100%, 0)",
      },
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  });
});
