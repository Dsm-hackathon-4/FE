import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal, Input } from "@/components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useRoadmap,
  useDetailRoadmap,
  useGetAiProblem,
  useSolveAiProblem,
} from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useSolveProblem } from "@/hooks";

export const BlankProblem = () => {
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  const navigate = useNavigate();
  const handleClick = () => {
    const randomUrl = problems[Math.floor(Math.random() * problems.length)];
    navigate(`/${randomUrl}/${idx}`);
  };
  const { idx } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [currentProblem, setCurrentProblem] = useState<any>(null); // currentProblem을 useState로 관리
  const { mutate, data: solveData } = useSolveProblem();
  const { mutate: solveAiProblem, data: solveAiData } = useSolveAiProblem();

  useEffect(() => {
    if (idx !== "ai" && solveData?.chapter_complete) {
      navigate("/result", {
        state: { chapterComplete: solveData.chapter_complete },
      });
    }
  }, [solveData, navigate, idx]);

  const { data: roadmapData, isLoading: isRoadmapLoading } = useRoadmap();
  const roadmapId = roadmapData?.[0]?.id;
  const { data: RoadDetail, isLoading: isDetailRoadmapLoading } =
    useDetailRoadmap(roadmapId);
  const { data: aiRoadDetail, isLoading: isAiProblemLoading } =
    useGetAiProblem();

  useEffect(() => {
    let problemsToConsider: any[] = [];
    let targetProblemType: string = "";

    if (idx === "ai") {
      if (aiRoadDetail && !currentProblem) {
        problemsToConsider = aiRoadDetail?.content || [];
        targetProblemType = "FILL_BLANK";
      }
    } else {
      if (RoadDetail && !currentProblem) {
        problemsToConsider =
          Number(idx) === 0
            ? RoadDetail.problems?.easy || []
            : Number(idx) === 1
            ? RoadDetail.problems?.medium || []
            : RoadDetail.problems?.hard || [];
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
  }, [RoadDetail, aiRoadDetail, currentProblem, idx, navigate]);
  // ✅ 로딩 중일 때 early return으로 분기
  const problemContent = currentProblem?.content || "";
  const parts =
    idx === "ai"
      ? problemContent.split(/\{\{.*?\}\}/g)
      : problemContent.split("____");

  const onSubmit = () => {
    if (idx === "ai") {
      solveAiProblem({ problemId: currentProblem?.id, answer });
    } else {
      mutate({ problemId: currentProblem?.id, answer });
    }
    setModalOpen(true);
  };
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
