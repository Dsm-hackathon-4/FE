import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Input, Button, CorrectModal } from "@/components";
import { Buttons } from "./BlankProblem";
import { useParams, useNavigate } from "react-router-dom";
import {
  useRoadmap,
  useDetailRoadmap,
  useGetAiProblem,
  useSolveAiProblem,
} from "@/hooks";
import { useSolveProblem } from "@/hooks/useProblemApi";
import { useState, useEffect } from "react";

export const DefineProblem = () => {
  const { idx } = useParams();
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [currentProblem, setCurrentProblem] = useState<any>(null); // currentProblem을 useState로 관리

  const navigate = useNavigate();

  const handleClick = () => {
    const randomUrl = problems[Math.floor(Math.random() * problems.length)];
    navigate(`/${randomUrl}/${idx}`);
  };

  const { data: roadmapData, isLoading: isRoadmapLoading } = useRoadmap();
  const roadmapId = roadmapData?.[0]?.id;
  const { data: RoadDetail, isLoading: isDetailRoadmapLoading } =
    useDetailRoadmap(roadmapId);

  const { data: aiRoadDetail, isLoading: isAiProblemLoading } =
    useGetAiProblem();
  const { mutate, data: solveData } = useSolveProblem();
  const { mutate: solveAiProblem, data: solveAiData } = useSolveAiProblem();
  useEffect(() => {
    if (idx !== "ai" && solveData?.chapter_complete) {
      navigate("/result", {
        state: { chapterComplete: solveData.chapter_complete },
      });
    }
  }, [solveData, navigate, idx]);

  useEffect(() => {
    let problemsSource: any[] | undefined;
    let targetProblemType: string = "";

    if (idx === "ai") {
      if (aiRoadDetail && !currentProblem) {
        problemsSource = aiRoadDetail?.content;
        targetProblemType = "ANSWER";
      }
    } else {
      if (RoadDetail && !currentProblem) {
        problemsSource =
          Number(idx) === 0
            ? RoadDetail.problems?.easy
            : Number(idx) === 1
            ? RoadDetail.problems?.medium
            : RoadDetail.problems?.hard;
        targetProblemType = "SUBJECTIVE";
      }
    }

    if (problemsSource && !currentProblem) {
      const filteredProblems = (problemsSource || []).filter((p: any) =>
        idx === "ai"
          ? p.problem_type === targetProblemType
          : p.type === targetProblemType
      );

      if (filteredProblems.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredProblems.length);
        const newProblem = filteredProblems[randomIndex];
        setCurrentProblem(newProblem);
        return;
      }

      const availableProblemTypes = [];
      if (
        (problemsSource || []).some(
          (p: any) => p.problemType === "BLANK_CHOICE"
        )
      ) {
        availableProblemTypes.push("blankProblem");
      }
      if (
        (problemsSource || []).some((p: any) => p.problemType === "WORD_CHOICE")
      ) {
        availableProblemTypes.push("selectProblem");
      }

      if (availableProblemTypes.length > 0) {
        const randomType =
          availableProblemTypes[
            Math.floor(Math.random() * availableProblemTypes.length)
          ];
        navigate(`/${randomType}/${idx}`);
      } else if (problemsSource.length > 0) {
        navigate("/result", { state: { chapterComplete: true } });
      } else {
        setCurrentProblem(null);
      }
    }
  }, [RoadDetail, aiRoadDetail, currentProblem, idx, navigate]);

  // ✅ 로딩 중일 때 early return으로 분기
  if (
    (idx === "ai" && isAiProblemLoading) ||
    (idx !== "ai" &&
      (isRoadmapLoading || isDetailRoadmapLoading || !RoadDetail || !idx))
  ) {
    return (
      <div
        style={{
          ...theme.font.h2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        Loading...
      </div>
    );
  }

  const onSubmit = () => {
    mutate({ problemId: currentProblem?.id, answer: answer });
    setModalOpen(true);
  };

  return (
    <Wrapper>
      <span style={theme.font.h2}>다음 정의에 해당하는 용어는?</span>
      <div>
        <Contents>
          <Problem>
            <span style={theme.font.t1}>{currentProblem?.content}</span>
          </Problem>
          <Input
            placeholder="답 입력"
            width="large"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />
        </Contents>
        <Buttons>
          {idx === "ai" && (
            <Button
              size="small"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              나가기
            </Button>
          )}
          <Button size="small" variant="secondary" onClick={handleClick}>
            건너뛰기
          </Button>
          <Button size="small" onClick={onSubmit}>
            제출하기
          </Button>
        </Buttons>
      </div>
      <CorrectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={
          idx === "ai"
            ? solveAiData?.is_correct
              ? "correct"
              : "wrong"
            : solveData?.is_correct
            ? "correct"
            : "wrong"
        }
        answer={answer}
        correctAnswer={
          idx === "ai" ? solveAiData?.correct_answer : solveData?.correct_answer
        }
        getXP={idx === "ai" ? solveAiData?.xp_earned : solveData?.xp_earned}
        idx={idx}
      />
    </Wrapper>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 108px;
`;

const Problem = styled.div`
  border-radius: 26px;
  border: 1px solid ${theme.color.green[500]};
  width: 930px;
  height: 226px;
  padding: 53px 74px 53px 74px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 65px;
  width: 100%;
  > div {
    gap: 153px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
