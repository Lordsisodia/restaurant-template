/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        "background-position-spin":
          "background-position-spin 3000ms infinite alternate",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "shine-pulse": "shine-pulse var(--shine-pulse-duration) infinite linear",
      },
      keyframes: {
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        "border-beam": {
          "100%": { offsetDistance: "100%" },
        },
        "shine-pulse": {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
      },
    },
  },
};
