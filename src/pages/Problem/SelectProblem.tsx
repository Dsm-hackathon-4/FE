import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal } from "@/components";
import { Buttons } from "./BlankProblem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSolveProblem } from "@/hooks/useProblemApi";
import {
  useRoadmapChaptersProblems,
  useGetAiProblem,
  useSolveAiProblem,
} from "@/hooks";
import { useSolve } from "@/contexts/SolveContext";

export const SelectProblem = () => {
  const { solveCount, setSolveCount } = useSolve();

  const { idx, param } = useParams();
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  const navigate = useNavigate();
  let randomUrl = problems[Math.floor(Math.random() * problems.length)];
  const currentPath = window.location.pathname;
  const handleClick = () => {
    while (`/${randomUrl}/${idx}/${param}` === currentPath) {
      randomUrl = problems[Math.floor(Math.random() * problems.length)];
    }

    navigate(`/${randomUrl}/${idx}/${param}`);
  };
  const params = ["db", "sql", "table", "index"];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null); // 선택된 버튼의 ID 저장
  const [currentProblem, setCurrentProblem] = useState(null); // currentProblem을 useState로 관리
  const { mutate, data: solveData } = useSolveProblem();
  const { mutate: solveAiProblem, data: solveAiData } = useSolveAiProblem();
  useEffect(() => {
    if (solveData?.chapter_complete) {
      navigate("/result", {
        state: { chapterComplete: solveData.chapter_complete },
      });
    }
  }, [solveData, navigate]);

  const roadmapId = params.indexOf(param) + 1;
  const { data: chapterProblems, isLoading: isDetailRoadmapLoading } =
    useRoadmapChaptersProblems(1, roadmapId);
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
        targetProblemType = "WORD_CHOICE";
      }
    }
    console.log(problemsToConsider);

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

  const onSubmit = () => {
    if (idx === "ai") {
      solveAiProblem({
        problem_id: currentProblem?.id,
        answer: String(selectedChoiceId),
      });
    } else {
      mutate({
        problemId: currentProblem?.id,
        answer: String(selectedChoiceId),
      });
    }
    setModalOpen(true);
  };
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
  return (
    <>
      <Wrapper>
        <ProblemText style={theme.font.h4}>
          {currentProblem?.content}
        </ProblemText>
        <Contents>
          <Problem>
            {currentProblem?.choices.map((item, index) => (
              <Button
                variant="tertiary"
                size="large"
                key={index}
                isSelected={
                  idx === "ai"
                    ? selectedChoiceId === index
                    : selectedChoiceId === item.id
                }
                onClick={() =>
                  setSelectedChoiceId(idx === "ai" ? index : item.id)
                }
              >
                <span style={{ width: "100%" }}>
                  {idx === "ai" ? item : item.content}
                </span>
              </Button>
            ))}
          </Problem>
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
            <Button size="small" onClick={onSubmit}>
              제출하기
            </Button>
          </Buttons>
        </Contents>
        <CorrectModal
          param={param}
          solveCount={solveCount}
          setSolveCount={setSolveCount}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type={
            idx === "ai"
              ? solveAiData?.correct_answer ===
                currentProblem?.choices?.[selectedChoiceId]
                ? "correct"
                : "wrong"
              : solveData?.is_correct
              ? "correct"
              : "wrong"
          }
          answer={
            selectedChoiceId !== null
              ? idx === "ai"
                ? currentProblem?.choices?.[selectedChoiceId] || ""
                : currentProblem?.choices?.find(
                    (c) => c.id === selectedChoiceId
                  )?.content || ""
              : ""
          }
          correctAnswer={
            idx === "ai"
              ? solveAiData?.correct_answer
              : solveData?.correct_answer
          }
          getXP={idx === "ai" ? solveAiData?.xp_earned : solveData?.xp_earned}
          idx={idx}
        />
      </Wrapper>
    </>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 94px;
  justify-content: center;
  align-items: center;
`;

const Problem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 62px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 84px;
  width: 100%;
`;

const ProblemText = styled.span`
  max-width: 1300px;
  text-align: center;
`;
