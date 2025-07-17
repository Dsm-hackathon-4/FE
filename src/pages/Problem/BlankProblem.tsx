import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal, Input } from "@/components";
import { useState, useEffect } from "react";
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
  const [currentProblem, setCurrentProblem] = useState<any>(null); // currentProblem을 useState로 관리
  const { mutate, data: solveData } = useSolveProblem();

  useEffect(() => {
    if (solveData?.chapter_complete) {
      navigate("/result", {
        state: { chapterComplete: solveData.chapter_complete },
      });
    }
  }, [solveData, navigate]);

  const { idx } = useParams();

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

      const blankProblems = problemsForDifficulty.filter(
        (p) => p.type === "BLANK_CHOICE"
      );

      if (blankProblems.length > 0) {
        const randomIndex = Math.floor(Math.random() * blankProblems.length);
        const newProblem = blankProblems[randomIndex];
        setCurrentProblem(newProblem);
        return;
      }

      const availableProblemTypes = [];
      if (problemsForDifficulty.some((p) => p.type === "SUBJECTIVE")) {
        availableProblemTypes.push("defineProblem");
      }
      if (problemsForDifficulty.some((p) => p.type === "WORD_CHOICE")) {
        availableProblemTypes.push("selectProblem");
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
  // ✅ 로딩 중일 때 early return으로 분기
  const parts = currentProblem?.content?.split("____");

  const onSubmit = () => {
    mutate({ problemId: currentProblem?.id, answer });
    setModalOpen(true);
  };
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
