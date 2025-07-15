import { theme } from "@/themes";
import styled from "@emotion/styled";

interface SelectBtnProps {
  children: string;
  children2?: string;
}

export const SelectBtn = ({ children, children2 }: SelectBtnProps) => {
  return (
    <Wrapper children2={children2}>
      <span>{children}</span>
      <span>{children2}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ children2?: string }>`
  width: 499px;
  height: 60px;
  font: ${theme.font.b2};
  background-color: ${theme.color.zinc[50]};
  display: flex;
  justify-content: ${(props) => (props.children2 ? "space-between" : "center")};
  padding: ${(props) => (props.children2 ? "0 16px" : "")};
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid ${theme.color.zinc[600]};
  border-bottom: 6px solid ${theme.color.zinc[600]};
  &:hover {
    background-color: ${theme.color.green[200]};
    border: 2px solid ${theme.color.green[600]};
    border-bottom: 6px solid ${theme.color.green[600]};
  }
`;
