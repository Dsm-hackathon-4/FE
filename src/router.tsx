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
  LinkReviewPage,
  BlankProblem,
  DefineProblem,
  SelectProblem,
  ResultPage,
} from "@/pages";
import { HeaderLayout, SideBarLayout } from "@/components/layouts";

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "login",
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
      {
        path: "blankProblem",
        element: <BlankProblem />,
      },
      {
        path: "defineProblem",
        element: <DefineProblem />,
      },
      {
        path: "selectProblem",
        element: <SelectProblem />,
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
      {
        path: "review/link",
        element: <LinkReviewPage />,
      },
    ],
  },
  {
    path: "result",
    element: <ResultPage />,
  },
]);

export default router;
