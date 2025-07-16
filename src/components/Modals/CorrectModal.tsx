import styled from "@emotion/styled";
import { theme } from "@/themes";
import { CorrectCheck, Fail } from "@/assets";
import { Button } from "../Button";

interface CorrectModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "correct" | "wrong";
  answer: string;
  correctAnswer: string;
  getXP: number;
}

export const CorrectModal = ({
  isOpen,
  onClose,
  type,
  answer,
  correctAnswer,
  getXP,
}: CorrectModalProps) => {
  if (!isOpen) return null;

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
            <span style={theme.font.h4}>답 : {correctAnswer}</span>
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
              onClick={onClose}
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
  width: 332px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  color: ${(props) =>
    props.type === "correct" ? theme.color.green[800] : theme.color.red[800]};
  position: relative;
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
