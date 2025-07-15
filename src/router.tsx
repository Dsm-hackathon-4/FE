import { createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage } from "@/pages";
import MainLayout from "@/components/layouts/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
