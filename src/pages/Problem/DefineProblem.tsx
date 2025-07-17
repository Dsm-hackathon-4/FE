import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Input, Button, CorrectModal } from "@/components";
import { Buttons } from "./BlankProblem";
import { useParams, useNavigate } from "react-router-dom";
import {
  useRoadmapChaptersProblems,
  useGetAiProblem,
  useSolveAiProblem,
} from "@/hooks";
import { useSolveProblem } from "@/hooks/useProblemApi";
import { useState, useEffect } from "react";
import { useSolve } from "@/contexts/SolveContext";

export const DefineProblem = () => {
  const { solveCount, setSolveCount } = useSolve();
  const { idx, param } = useParams();
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  const params = ["db", "sql", "table", "index"];

  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [currentProblem, setCurrentProblem] = useState<any>(null); // currentProblem을 useState로 관리

  const navigate = useNavigate();

  let randomUrl = problems[Math.floor(Math.random() * problems.length)];
  const currentPath = window.location.pathname;
  const handleClick = () => {
    while (
      (idx === "ai"
        ? `/${randomUrl}/${idx}`
        : `/${randomUrl}/${idx}/${param}`) === currentPath
    ) {
      randomUrl = problems[Math.floor(Math.random() * problems.length)];
    }

    if (idx === "ai") {
      navigate(`/${randomUrl}/${idx}`);
    } else {
      navigate(`/${randomUrl}/${idx}/${param}`);
    }
  };

  const roadmapId = params.indexOf(param) + 1;

  const shouldFetchChapters = idx !== "ai";

  const { data: chapterProblems, isLoading: isDetailRoadmapLoading } =
    useRoadmapChaptersProblems(
      shouldFetchChapters ? 1 : undefined,
      shouldFetchChapters ? roadmapId : undefined
    );

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
    let problemsToConsider: any[] = [];
    let targetProblemType: string = "";

    if (idx === "ai") {
      if (aiRoadDetail && !currentProblem) {
        problemsToConsider = aiRoadDetail?.content || []; // ✅ 이렇게 고쳐야 해
        targetProblemType = "ANSWER";
      }
    } else {
      if (chapterProblems && !currentProblem) {
        const level = ["EASY", "MEDIUM", "HARD"][Number(idx)];
        problemsToConsider =
          chapterProblems.filter((p) => p.difficulty === level) || [];
        targetProblemType = "SUBJECTIVE";
      }
    }
    console.log(aiRoadDetail);

    if (problemsToConsider.length > 0 && !currentProblem) {
      const filteredProblems = problemsToConsider.filter((p) =>
        idx === "ai"
          ? p.problem_type?.toUpperCase() === targetProblemType
          : p.type === targetProblemType
      );
      if (filteredProblems.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredProblems.length);
        const newProblem = filteredProblems[randomIndex];
        setCurrentProblem(newProblem);
        return;
      }

      // If no problems of the current type, try other types
      const availableProblemTypes = [];
      if (problemsToConsider.some((p) => p.problemType === "SUBJECTIVE")) {
        availableProblemTypes.push("defineProblem");
      }
      if (problemsToConsider.some((p) => p.problemType === "WORD_CHOICE")) {
        availableProblemTypes.push("selectProblem");
      }

      if (availableProblemTypes.length > 0) {
        const randomType =
          availableProblemTypes[
            Math.floor(Math.random() * availableProblemTypes.length)
          ];
        navigate(`/${randomType}/${idx}`);
      } else {
        setCurrentProblem(null); // No more problems of any type
      }
    }
  }, [chapterProblems, aiRoadDetail, currentProblem, idx, navigate]);

  // ✅ 로딩 중일 때 early return으로 분기
  if (
    (idx === "ai" && isAiProblemLoading) ||
    (idx !== "ai" && (isDetailRoadmapLoading || !chapterProblems || !idx))
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
    if (idx === "ai") {
      solveAiProblem({ problem_id: currentProblem?.id, answer });
    } else {
      mutate({ problemId: currentProblem?.id, answer });
    }
    setModalOpen(true);
  };
  console.log(solveAiData);
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
          <Button
            size="small"
            variant="secondary"
            onClick={() => navigate("/")}
          >
            나가기
          </Button>
          <Button size="small" variant="secondary" onClick={handleClick}>
            건너뛰기
          </Button>
          <Button size="small" onClick={onSubmit} disabled={answer === ""}>
            제출하기
          </Button>
        </Buttons>
      </div>
      <CorrectModal
        param={param}
        solveCount={solveCount}
        setSolveCount={setSolveCount}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={
          idx === "ai"
            ? solveAiData?.correct_answer === answer
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
