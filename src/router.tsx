import { createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, SelectSubjectPage } from "@/pages";
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
      {
        path: "/selectSubject",
        element: <SelectSubjectPage />,
      },
    ],
  },
]);

export default router;
