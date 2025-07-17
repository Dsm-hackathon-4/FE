import styled from "@emotion/styled";
import { theme } from "@/themes";
import { useNavigate } from "react-router-dom";

interface BaloonProps {
  children: React.ReactNode;
  children2: React.ReactNode;
  offset?: number;
  idx: number;
}

export const Baloon = ({ children, children2, offset, idx }: BaloonProps) => {
  const navigate = useNavigate();
  const problems = ["blankProblem", "defineProblem", "selectProblem"];

  const handleClick = () => {
    const randomUrl = problems[Math.floor(Math.random() * problems.length)];
    console.log("practice +5 XP");
    navigate(`/${randomUrl}/${idx}`);
  };
  return (
    <BaloonWrapper offset={offset}>
      <Arrow />
      <Balloon>
        <Text>
          <span style={{ ...theme.font.t1 }}>{children}</span>
          <span style={{ ...theme.font.b1 }}>{children2}</span>
        </Text>
        <Btn onClick={handleClick}>시작하기</Btn>
      </Balloon>
    </BaloonWrapper>
  );
};

const Btn = styled.div`
  width: 237px;
  height: 51px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.green[500]};
  cursor: pointer;
  font: ${theme.font.b1};
  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BaloonWrapper = styled.div<{ offset?: number }>`
  position: absolute;
  top: 120%; // Dot 위로 붙게
  left: ${(props) => `calc(-90% + ${props.offset * 80}px)`}; // 가운데 정렬
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  z-index: 10;
`;

const Balloon = styled.div`
  background: #22c55e;
  color: white;
  border-radius: 20px;
  padding: 30px 30px 30px 35px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 43px;
  text-align: left;
  width: 297px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #22c55e;
`;
