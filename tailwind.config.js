export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "pulse-loader": {
          "0%": {
            boxShadow: "0 0 0 0 #69ffa8",
          },
          "100%": {
            boxShadow: "0 0 0 14px rgba(105, 255, 168, 0)",
          },
        },
      },
      animation: {
        "pulse-loader": "pulse-loader 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
