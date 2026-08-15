import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import AOS from "aos";
import "aos/dist/aos.css";
import { router } from "./router/Router";
import { WishlistProvider } from "./context/WishlistContext";
import WishlistToast from "./components/WishlistToast/WishlistToast";
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

const mountStartTime = performance.now();

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <WishlistProvider>
      <RouterProvider router={router} />
      <WishlistToast />
    </WishlistProvider>
  </CartProvider>
);

// Gracefully dismiss initial HTML preloader once React mounts
const dismissPreloader = () => {
  const preloader = document.getElementById("initial-preloader");
  if (preloader && !preloader.classList.contains("fade-out")) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 320);
  }
};

const elapsed = performance.now() - mountStartTime;
const minDisplayMs = 350;
const delay = Math.max(0, minDisplayMs - elapsed);

setTimeout(dismissPreloader, delay);

// Maximum fallback timer (800ms cap)
setTimeout(dismissPreloader, 800);