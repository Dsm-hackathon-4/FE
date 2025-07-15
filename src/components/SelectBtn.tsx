import { theme } from "@/themes";
import styled from "@emotion/styled";

export const SelectBtn = ({ children }: { children: string }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 499px;
  height: 60px;
  font: ${theme.font.b2};
  background-color: ${theme.color.zinc[50]};
  display: flex;
  justify-content: center;
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
