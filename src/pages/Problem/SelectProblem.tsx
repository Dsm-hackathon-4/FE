import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal } from "@/components";
import { Buttons } from "./BlankProblem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSolveProblem } from "@/hooks/useProblemApi";
import { useRoadmap, useDetailRoadmap } from "@/hooks";

export const SelectProblem = () => {
  const { idx } = useParams();
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  const navigate = useNavigate();
  const handleClick = () => {
    const randomUrl = problems[Math.floor(Math.random() * problems.length)];
    navigate(`/${randomUrl}/${idx}`);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null); // 선택된 버튼의 ID 저장
  const [currentProblem, setCurrentProblem] = useState<any>(null); // currentProblem을 useState로 관리
  const { mutate, data: solveData } = useSolveProblem();

  useEffect(() => {
    if (solveData?.chapter_complete) {
      navigate("/result", {
        state: { chapterComplete: solveData.chapter_complete },
      });
    }
  }, [solveData, navigate]);

  const { data, isLoading } = useRoadmap();
  const roadmapId = data?.[0]?.id;
  const { data: RoadDetail, isLoading: isDetailLoading } =
    useDetailRoadmap(roadmapId);

  useEffect(() => {
    if (RoadDetail && !currentProblem) {
      const problemsForDifficulty =
        Number(idx) === 0
          ? RoadDetail.problems?.easy || []
          : Number(idx) === 1
          ? RoadDetail.problems?.medium || []
          : RoadDetail.problems?.hard || [];

      const selectProblems = problemsForDifficulty.filter(
        (p) => p.type === "WORD_CHOICE"
      );

      if (selectProblems.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectProblems.length);
        const newProblem = selectProblems[randomIndex];
        setCurrentProblem(newProblem);
        return;
      }

      const availableProblemTypes = [];
      if (problemsForDifficulty.some((p) => p.type === "BLANK_CHOICE")) {
        availableProblemTypes.push("blankProblem");
      }
      if (problemsForDifficulty.some((p) => p.type === "SUBJECTIVE")) {
        availableProblemTypes.push("defineProblem");
      }

      if (availableProblemTypes.length > 0) {
        const randomType =
          availableProblemTypes[
            Math.floor(Math.random() * availableProblemTypes.length)
          ];
        navigate(`/${randomType}/${idx}`);
      } else {
        setCurrentProblem(null);
      }
    }
  }, [RoadDetail, currentProblem, idx, navigate]);

  const onSubmit = () => {
    mutate({ problemId: currentProblem?.id, answer: String(selectedChoiceId) });
    setModalOpen(true);
  };
  // ✅ 로딩 중일 때 early return으로 분기
  if (isLoading || isDetailLoading || !RoadDetail || !idx) {
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
                isSelected={selectedChoiceId === item.id}
                onClick={() => setSelectedChoiceId(item.id)}
              >
                {item.content}
              </Button>
            ))}
          </Problem>
          <Buttons>
            <Button size="small" variant="secondary" onClick={handleClick}>
              건너뛰기
            </Button>
            <Button size="small" onClick={onSubmit}>
              제출하기
            </Button>
          </Buttons>
        </Contents>
        <CorrectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type={solveData?.is_correct ? "correct" : "wrong"}
          answer={
            selectedChoiceId !== null
              ? currentProblem?.choices?.find((c) => c.id === selectedChoiceId)
                  ?.content || ""
              : ""
          }
          correctAnswer={solveData?.correct_answer}
          getXP={solveData?.xp_earned}
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
