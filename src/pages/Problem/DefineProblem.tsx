import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Input, Button, CorrectModal } from "@/components";
import { Buttons } from "./BlankProblem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRoadmap, useDetailRoadmap } from "@/hooks";
import { useSolveProblem } from "@/hooks/useProblemApi";
import { useState } from "react";
export const DefineProblem = () => {
  const { idx } = useParams();
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleClick = () => {
    const randomUrl = problems[Math.floor(Math.random() * problems.length)];
    navigate(`/${randomUrl}/${idx}`);
  };

  const { data, isLoading } = useRoadmap();
  const { data: RoadDetail } = useDetailRoadmap(data?.[0]?.id);
  const { mutate, data: solveData } = useSolveProblem();

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

  const problem =
    Number(idx) === 0
      ? RoadDetail?.problems?.easy
      : Number(idx) === 1
      ? RoadDetail?.problems?.medium
      : RoadDetail?.problems?.hard;

  const filterProblem = problem?.filter((item) => item.type === "SUBJECTIVE");
  const currentProblem = filterProblem?.[0];

  const onSubmit = () => {
    mutate({ problemId: currentProblem?.id, answer: answer });
    setModalOpen(true);
  };
  console.log(filterProblem);

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
        type={solveData?.is_correct ? "correct" : "wrong"}
        answer={answer}
        correctAnswer={solveData?.correct_answer}
        getXP={solveData?.xp_earned}
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
