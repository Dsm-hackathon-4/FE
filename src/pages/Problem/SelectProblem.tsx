import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal } from "@/components";
import { Buttons } from "./BlankProblem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const { mutate, data: solveData } = useSolveProblem();

  const { data, isLoading } = useRoadmap();
  const { data: RoadDetail } = useDetailRoadmap(data?.[0]?.id);

  if (isLoading)
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

  const onSubmit = () => {
    mutate({ problemId: currentProblem?.id, answer: String(selectedChoiceId) });
    setModalOpen(true);
  };

  const problem =
    Number(idx) === 0
      ? RoadDetail?.problems?.easy
      : Number(idx) === 1
      ? RoadDetail?.problems?.medium
      : RoadDetail?.problems?.hard;

  const filterProblem = problem?.filter((item) => item.type === "WORD_CHOICE");

  const currentProblem = filterProblem?.[0];

  console.log(currentProblem);
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
          answer={currentProblem.choices[selectedChoiceId - 1].content}
          correctAnswer={solveData?.correct_answer}
          getXP={solveData?.xp_earned}
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
