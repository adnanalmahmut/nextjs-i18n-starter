import localFont from "next/font/local";

export const geometric = localFont({
  variable: "--font-geometric",
  display: "swap",
  src: [
    { path: "./Geometric-Thin.woff2", weight: "100", style: "normal" },
    { path: "./Geometric-Light.woff2", weight: "300", style: "normal" },
    { path: "./Geometric-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Geometric-Medium.woff2", weight: "500", style: "normal" },
    { path: "./Geometric-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./Geometric-Bold.woff2", weight: "700", style: "normal" },
    { path: "./Geometric-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./Geometric-Black.woff2", weight: "900", style: "normal" },
    { path: "./Geometric-Italic.woff2", weight: "400", style: "italic" },
    { path: "./Geometric-Alt-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Geometric-Alt-Bold.woff2", weight: "700", style: "normal" },
    { path: "./Geometric-Display.woff2", weight: "400", style: "normal" },
  ],
  fallback: ["Inter", "Open Sans", "sans-serif"],
});
