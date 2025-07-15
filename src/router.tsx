import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SelectAbilityPage,
  SelectDailyGoalPage,
  SelectSubjectPage,
  SelectStudyTypePage,
  RankPage,
  ProfilePage,
  ReviewPage,
} from "@/pages";
import { HeaderLayout, SideBarLayout } from "@/components/layouts";

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "selectSubject",
        element: <SelectSubjectPage />,
      },
      {
        path: "selectAbility",
        element: <SelectAbilityPage />,
      },
      {
        path: "selectDailyGoal",
        element: <SelectDailyGoalPage />,
      },
      {
        path: "selectStudyType",
        element: <SelectStudyTypePage />,
      },
    ],
  },
  {
    element: <SideBarLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "rank",
        element: <RankPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "review",
        element: <ReviewPage />,
      },
    ],
  },
]);

export default router;
