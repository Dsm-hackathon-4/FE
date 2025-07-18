import styled from "@emotion/styled";
import { theme } from "@/themes";
import { CorrectCheck, Fail } from "@/assets";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useSolveStats } from "@/contexts/SolveStatsContext";

interface CorrectModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "correct" | "wrong";
  answer: string;
  correctAnswer: string;
  getXP: number;
  idx: string;
  solveCount: number;
  setSolveCount: React.Dispatch<React.SetStateAction<number>>;
  param: string;
}

export const CorrectModal = ({
  isOpen,
  onClose,
  type,
  answer,
  correctAnswer,
  getXP,
  idx,
  solveCount,
  setSolveCount,
  param,
}: CorrectModalProps) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const problems = ["blankProblem", "defineProblem", "selectProblem"];
  let randomUrl = problems[Math.floor(Math.random() * problems.length)];
  const currentPath = window.location.pathname;
  const { addResult, correctCount, totalXp, reset } = useSolveStats();
  const handleClick = () => {
    const newCount = solveCount + 1;
    addResult(type === "correct", Number(getXP));

    setSolveCount(newCount);

    if (idx !== "ai" && newCount >= 3) {
      // 기존 로직 유지
      navigate(`/result/${param}`, {
        state: {
          chapterComplete: {
            total_xp: Number(totalXp || 0) + Number(getXP || 0),
            correct_count: type === "correct" ? correctCount + 1 : correctCount,
            total_count: newCount,
            accuracy_rate: Math.round(
              ((type === "correct" ? correctCount + 1 : correctCount) /
                newCount) *
                100
            ),
          },
        },
      });
      reset();
      setSolveCount(0);
    } else {
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
    }

    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Wrapper>
          <span style={theme.font.h2}>
            {type === "correct" ? "정답입니다 🎉" : "오답입니다"}
          </span>
          {type === "wrong" && (
            <Answer type="wrong">
              <img
                src={Fail}
                alt="fail"
                style={{ position: "absolute", top: "-15px", left: "-15px" }}
              />
              <span style={theme.font.h4}>입력한 답 : {answer}</span>
            </Answer>
          )}
          <Answer type="correct">
            <img
              src={CorrectCheck}
              alt="correctCheck"
              style={{ position: "absolute", top: "-15px", left: "-15px" }}
            />
            <span style={{ ...theme.font.h4 }}>답 : {correctAnswer}</span>
          </Answer>
          <Footer>
            <span style={{ ...theme.font.t1, color: theme.color.modalXp }}>
              {type === "correct" ? `+ ${getXP} XP` : ""}
            </span>
            <Button
              variant="primary"
              size="medium"
              children="다음"
              style={{ whiteSpace: "nowrap" }}
              onClick={handleClick}
            />
          </Footer>
        </Wrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
`;

const Answer = styled.div<{ type: "correct" | "wrong" }>`
  background-color: ${(props) =>
    props.type === "correct" ? theme.color.green[100] : theme.color.red[100]};
  border: 3px solid
    ${(props) =>
      props.type === "correct" ? theme.color.green[700] : theme.color.red[700]};
  min-width: 332px;
  min-height: 63px;
  width: auto;
  height: auto;
  padding: 10px 20px; /* Add some padding to allow text to breathe */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  color: ${(props) =>
    props.type === "correct" ? theme.color.green[800] : theme.color.red[800]};
  position: relative;
  word-break: break-word; /* Break long words */
  text-align: center; /* Center text if it wraps */
`;

const Wrapper = styled.div`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 45px 86px;
  gap: 72px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${theme.color.white};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  z-index: 1001;
`;
