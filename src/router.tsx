import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SelectAbilityPage,
  SelectDailyGoalPage,
  SelectSubjectPage,
  SelectStudyTypePage,
} from "@/pages";
import { HeaderLayout, SideBar } from "@/components/layouts";

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
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
      {
        path: "/selectStudyType",
        element: <SelectStudyTypePage />,
      },
    ],
  },
  {
    element: <SideBar />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
