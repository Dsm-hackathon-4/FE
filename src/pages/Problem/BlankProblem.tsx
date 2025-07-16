import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal, Input } from "@/components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRoadmap, useDetailRoadmap } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useSolveProblem } from "@/hooks/useProblemApi";

export const BlankProblem = () => {
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  const navigate = useNavigate();
  const handleClick = () => {
    const randomUrl = problems[Math.floor(Math.random() * problems.length)];
    navigate(`/${randomUrl}/${idx}`);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const { mutate, data: solveData } = useSolveProblem();

  const { idx } = useParams();

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

  const problem =
    Number(idx) === 0
      ? RoadDetail?.problems?.easy
      : Number(idx) === 1
      ? RoadDetail?.problems?.medium
      : RoadDetail?.problems?.hard;

  const filterProblem = problem?.filter((item) => item.type === "BLANK_CHOICE");

  const currentProblem = filterProblem?.[0];
  const parts = currentProblem?.content?.split("____");

  const onSubmit = () => {
    mutate({ problemId: currentProblem?.id, answer });
    setModalOpen(true);
  };

  if (!currentProblem || !parts || parts.length < 2) {
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
            {parts[1]}
          </span>
        </Problem>
      </Contents>
      <Buttons>
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
        type={solveData?.is_correct ? "correct" : "wrong"}
        answer={answer}
        correctAnswer={solveData?.correct_answer}
        getXP={solveData?.xp_earned}
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
