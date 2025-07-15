import { theme } from "@/themes";
import styled from "@emotion/styled";

interface MenuBtnProps {
  children: string;
  icon: string;
}

export const MenuBtn = ({ children, icon }: MenuBtnProps) => {
  return (
    <Wrapper>
      <img src={icon} alt="" />
      <span>{children}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  > img {
    width: 32px;
    height: 32px;
  }
  width: 100%;
  height: 72px;
  font: ${theme.font.h4};
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  gap: 36px;
  padding-left: 20px;
  &:hover {
    border: 2px solid ${theme.color.green[500]};
  }
`;
