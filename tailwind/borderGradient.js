const plugin = require("tailwindcss/plugin");

export const borderGradient = plugin(function ({ matchUtilities }) {
  matchUtilities(
    {
      "border-gradient": ([c1, c2, c3]) => ({
        background: `linear-gradient(180deg, ${c1} 0%, ${c2} 35%, ${c3} 100%)`,
      }),
    },
    {
      values: {
        blue: ["rgb(9, 0, 162)", "rgb(105, 105, 245)", "rgb(0, 212, 255)"],
        green: ["rgb(0, 162, 0)", "rgb(0, 255, 0)", "rgb(105, 245, 105)"],
        red: ["rgb(162, 12, 0)", "rgb(255, 0, 0)", "rgb(245, 105, 105)"],
        yellow: ["rgb(160, 162, 0)", "rgb(241, 245, 105)", "rgb(243, 255, 0)"],
        purple: ["rgb(162, 0, 162)", "rgb(255, 0, 255)", "rgb(245, 105, 245)"],
      },
      type: "color",
    }
  );
});
