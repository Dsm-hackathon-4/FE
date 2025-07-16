import { theme } from "@/themes";
import styled from "@emotion/styled";
import { Do, ToDo } from "@/assets";

interface StudyCheckProps {
  done: boolean;
  offset: number;
}

export const StudyCheck = ({ done, offset }: StudyCheckProps) => {
  return (
    <Wrapper done={done} offset={offset}>
      <img src={done ? Do : ToDo} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div<StudyCheckProps>`
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.done ? theme.color.green[500] : theme.color.zinc[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) =>
    props.done ? `8px solid ${theme.color.green[700]}` : ""};
  transform: translateX(${({ offset }) => `${offset * 80}px`});
  transition: transform 0.3s ease;
`;
