import { theme } from "@/themes";
import styled from "@emotion/styled";

interface MenuBtnProps {
  children: string;
  icon: string;
  isActive?: boolean;
}

export const MenuBtn = ({ children, icon, isActive }: MenuBtnProps) => {
  return (
    <Wrapper isActive={isActive}>
      <img src={icon} alt="" />
      <span>{children}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isActive?: boolean }>`
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
  color: ${(props) => (props.isActive ? theme.color.green[500] : "black")};
  border: 2px solid
    ${(props) => (props.isActive ? theme.color.green[500] : "none")};
  &:hover {
    border: 2px solid ${theme.color.green[500]};
  }
`;
