import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import Wallet from "@/pages/Wallet";
import TradingBot from "@/pages/trading-bot/TradingBot";
import CustomerInput from "@/pages/trading-bot/CustomerInput";
import CustomerConfiguration from "@/pages/trading-bot/CustomerConfiguration";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";
import Market from "@/pages/Market";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/wallet",
        element: (
          <PrivateRoute>
            <Wallet />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/market",
        element: <Market />,
      },
    ],
  },
  {
    path: "/trading-bot",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <TradingBot />
          </PrivateRoute>
        ),
      },
      {
        path: "customer-input",
        element: (
          <PrivateRoute>
            <CustomerInput />
          </PrivateRoute>
        ),
      },
      {
        path: "customer-configuration",
        element: (
          <PrivateRoute>
            <CustomerConfiguration />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

export default router;
