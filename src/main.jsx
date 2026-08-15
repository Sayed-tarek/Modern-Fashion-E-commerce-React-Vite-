import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import AOS from "aos";
import "aos/dist/aos.css";
import { router } from "./router/Router";
import "./css/variables.css";
import "./i18n";

// Initialize AOS globally
AOS.init({
  duration: 800,
  once: true,
  offset: 80,
  easing: "ease-out-cubic",
  mirror: false,
  disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);