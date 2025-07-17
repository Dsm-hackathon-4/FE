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
  OAuthSuccessPage,
} from "@/pages";
import { HeaderLayout, SideBarLayout } from "@/components/layouts";

const router = createBrowserRouter([
  {
    path: "/result",
    element: <ResultPage />,
  },
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
        path: "blankProblem/:idx/:param",
        element: <BlankProblem />,
      },
      {
        path: "defineProblem/:idx/:param",
        element: <DefineProblem />,
      },
      {
        path: "selectProblem/:idx/:param",
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
    path: "/oauth/success",
    element: <OAuthSuccessPage />,
  },
]);

export default router;
