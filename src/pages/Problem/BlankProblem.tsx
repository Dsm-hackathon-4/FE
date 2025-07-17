import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal, Input } from "@/components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAiProblem,
  useRoadmapChaptersProblems,
  useSolveAiProblem,
} from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useSolveProblem } from "@/hooks";
import { useSolve } from "@/contexts/SolveContext";

export const BlankProblem = () => {
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
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
  const { idx, param } = useParams();
  const params = ["db", "sql", "table", "index"];

  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [currentProblem, setCurrentProblem] = useState<any>(null); // currentProblem을 useState로 관리
  const { mutate, data: solveData } = useSolveProblem();
  const { mutate: solveAiProblem, data: solveAiData } = useSolveAiProblem();
  const { solveCount, setSolveCount } = useSolve();

  useEffect(() => {
    if (idx !== "ai" && solveData?.chapter_complete) {
      navigate("/result", {
        state: { chapterComplete: solveData.chapter_complete },
      });
    }
  }, [solveData, navigate, idx]);

  const roadmapId = params.indexOf(param) + 1;

  const shouldFetchChapters = idx !== "ai";

  const { data: chapterProblems, isLoading: isDetailRoadmapLoading } =
    useRoadmapChaptersProblems(
      shouldFetchChapters ? 1 : undefined,
      shouldFetchChapters ? roadmapId : undefined
    );

  console.log(chapterProblems);
  const { data: aiRoadDetail, isLoading: isAiProblemLoading } =
    useGetAiProblem();

  useEffect(() => {
    let problemsToConsider: any[] = [];
    let targetProblemType: string = "";

    if (idx === "ai") {
      if (aiRoadDetail && !currentProblem) {
        problemsToConsider = aiRoadDetail?.content || []; // ✅ 이렇게 고쳐야 해
        targetProblemType = "FILL_BLANK";
      }
    } else {
      if (chapterProblems && !currentProblem) {
        const level = ["EASY", "MEDIUM", "HARD"][Number(idx)];
        problemsToConsider =
          chapterProblems.filter((p) => p.difficulty === level) || [];
        targetProblemType = "BLANK_CHOICE";
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
  const problemContent = currentProblem?.content || "";
  const parts =
    idx === "ai"
      ? problemContent.split(/\{\{\s*.*?\s*\}\}/g)
      : problemContent.split("____");
  console.log(parts);
  const onSubmit = () => {
    if (idx === "ai") {
      solveAiProblem({ problem_id: currentProblem?.id, answer });
    } else {
      mutate({ problemId: currentProblem?.id, answer });
    }
    setModalOpen(true);
  };
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

  if (!currentProblem || !problemContent || parts.length < 2) {
    return (
      <Wrapper>
        <span style={theme.font.h2}>문제를 불러올 수 없습니다.</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <span style={theme.font.h2}>빈칸을 채워주세요</span>
      <Contents>
        <Problem>
          <span style={{ ...theme.font.h4, lineHeight: "200%" }}>
            {parts[0]}
            <span style={{ margin: "0px 20px" }}>
              <Input
                placeholder="답 입력"
                width="medium"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </span>
            {parts.slice(1).join("")}
          </span>
        </Problem>
      </Contents>
      <Buttons>
        <Button size="small" variant="secondary" onClick={() => navigate("/")}>
          나가기
        </Button>
        <Button size="small" variant="secondary" onClick={handleClick}>
          건너뛰기
        </Button>
        <Button size="small" onClick={onSubmit} disabled={answer === ""}>
          제출하기
        </Button>
      </Buttons>
      <CorrectModal
        param={param}
        solveCount={solveCount}
        setSolveCount={setSolveCount}
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

export const Buttons = styled.div`
  display: flex;
  gap: 53px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 70px;
  width: 100%;
`;
const Contents = styled.div``;
const Problem = styled.div`
  border-radius: 26px;
  border: 1px solid ${theme.color.green[500]};
  width: 930px;
  height: 226px;
  padding: 53px 74px 53px 74px;
  text-align: center; /* Center text content */
`;
