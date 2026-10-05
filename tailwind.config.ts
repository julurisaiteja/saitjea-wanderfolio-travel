import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    keyframes: {
      marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      pulseSoft: { "0%,100%": { opacity: ".55" }, "50%": { opacity: "1" } },
      floatIn: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
    },
    animation: {
      marquee: "marquee 28s linear infinite",
      pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
      floatIn: "floatIn .7s ease both",
    },
  } },
  plugins: [],
};
export default config;
