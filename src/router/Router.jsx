import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import AllHome from "../pages/home/AllHome";
import ProductSkeleton from "../pages/product/ProductSkeleton";
import ScrollToTop from "../components/common/ScrollToTop";
import PageLoader from "../components/common/PageLoader";

// Lazy load non-critical routes for fast initial bundle loading
const Shop = lazy(() => import("../pages/shop/Shop"));
const BestSellers = lazy(() => import("../pages/best-sellers/BestSellers"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Product = lazy(() => import("../pages/product/Product"));

// Lazy load dashboard pages
const DashboardLayout = lazy(() => import("../dashboard/layout/DashboardLayout"));
const DashboardHome = lazy(() => import("../dashboard/pages/DashboardHome/DashboardHome"));
const ProductsPage = lazy(() => import("../dashboard/pages/Products/ProductsPage"));
const CategoriesPage = lazy(() => import("../dashboard/pages/Categories/CategoriesPage"));
const OrdersPage = lazy(() => import("../dashboard/pages/Orders/OrdersPage"));
const CustomersPage = lazy(() => import("../dashboard/pages/Customers/CustomersPage"));
const ReviewsPage = lazy(() => import("../dashboard/pages/Reviews/ReviewsPage"));
const CouponsPage = lazy(() => import("../dashboard/pages/Coupons/CouponsPage"));
const AnalyticsPage = lazy(() => import("../dashboard/pages/Analytics/AnalyticsPage"));
const MessagesPage = lazy(() => import("../dashboard/pages/Messages/MessagesPage"));
const SettingsPage = lazy(() => import("../dashboard/pages/Settings/SettingsPage"));
const ProfilePage = lazy(() => import("../dashboard/pages/Profile/ProfilePage"));

const LazyComponent = ({ Component }) => (
  <Suspense fallback={<PageLoader isManualLoading={true} />}>
    <Component />
  </Suspense>
);

const RootLayout = () => (
  <>
    <ScrollToTop />
    <PageLoader />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <AllHome />,
      },
      {
        path: "/shop",
        element: <LazyComponent Component={Shop} />,
      },
      {
        path: "/best-sellers",
        element: <LazyComponent Component={BestSellers} />,
      },
      {
        path: "/cart",
        element: <LazyComponent Component={Cart} />,
      },
      {
        path: "/login",
        element: <LazyComponent Component={Login} />,
      },
      {
        path: "/register",
        element: <LazyComponent Component={Register} />,
      },
      {
        path: "/product/:slug",
        element: <LazyComponent Component={Product} />,
      },
      {
        path: "/dashboard",
        element: <LazyComponent Component={DashboardLayout} />,
        children: [
          {
            index: true,
            element: <LazyComponent Component={DashboardHome} />,
          },
          {
            path: "products",
            element: <LazyComponent Component={ProductsPage} />,
          },
          {
            path: "categories",
            element: <LazyComponent Component={CategoriesPage} />,
          },
          {
            path: "orders",
            element: <LazyComponent Component={OrdersPage} />,
          },
          {
            path: "customers",
            element: <LazyComponent Component={CustomersPage} />,
          },
          {
            path: "reviews",
            element: <LazyComponent Component={ReviewsPage} />,
          },
          {
            path: "coupons",
            element: <LazyComponent Component={CouponsPage} />,
          },
          {
            path: "analytics",
            element: <LazyComponent Component={AnalyticsPage} />,
          },
          {
            path: "messages",
            element: <LazyComponent Component={MessagesPage} />,
          },
          {
            path: "settings",
            element: <LazyComponent Component={SettingsPage} />,
          },
          {
            path: "profile",
            element: <LazyComponent Component={ProfilePage} />,
          },
        ],
      },
    ],
  },
]);