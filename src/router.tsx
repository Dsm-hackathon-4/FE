import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SelectAbilityPage,
  SelectDailyGoalPage,
  SelectSubjectPage,
  SelectStudyTypePage,
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
        path: "selectSubject", // /selectSubject
        element: <SelectSubjectPage />,
      },
      {
        path: "selectAbility", // /selectAbility
        element: <SelectAbilityPage />,
      },
      {
        path: "selectDailyGoal", // /selectDailyGoal
        element: <SelectDailyGoalPage />,
      },
      {
        path: "selectStudyType", // /selectStudyType
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
        path: "ranking", // /learning/ranking
        element: <div>랭킹 페이지</div>, // 임시 컴포넌트
      },
      {
        path: "profile", // /learning/profile
        element: <div>프로필 페이지</div>, // 임시 컴포넌트
      },
      {
        path: "review", // /learning/review
        element: <div>복습 페이지</div>, // 임시 컴포넌트
      },
    ],
  },
]);

export default router;
