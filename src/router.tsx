import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SelectAbilityPage,
  SelectDailyGoalPage,
  SelectSubjectPage,
} from "@/pages";
import { MainLayout } from "@/components/layouts";

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
      {
        path: "/selectAbility",
        element: <SelectAbilityPage />,
      },
      {
        path: "/selectDailyGoal",
        element: <SelectDailyGoalPage />,
      },
    ],
  },
]);

export default router;
