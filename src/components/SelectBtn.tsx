import { theme } from "@/themes";
import styled from "@emotion/styled";
import React, { JSX } from "react";

interface SelectBtnProps {
  children: React.ReactNode;
  children2?: string | JSX.Element;
  width?: string;
  active?: boolean;
  onClick?: () => void;
}

export const SelectBtn = ({
  children,
  children2,
  width,
  active,
  onClick,
}: SelectBtnProps) => {
  return (
    <Wrapper
      children2={children2}
      width={width}
      active={active}
      onClick={onClick}
    >
      <span>{children}</span>
      {children2 && <span>{children2}</span>}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  children2?: string | JSX.Element;
  width?: string;
  active?: boolean;
}>`
  width: ${(props) => (props.width ? props.width : "499px")};
  height: 60px;
  font: ${theme.font.b2};
  background-color: ${(props) =>
    props.active ? theme.color.green[200] : theme.color.zinc[50]};
  display: flex;
  justify-content: ${(props) => (props.children2 ? "space-between" : "center")};
  padding: ${(props) => (props.children2 ? "0 16px" : "")};
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid
    ${(props) =>
      props.active ? theme.color.green[600] : theme.color.zinc[600]};
  border-bottom: 6px solid
    ${(props) =>
      props.active ? theme.color.green[600] : theme.color.zinc[600]};
  &:hover {
    background-color: ${theme.color.green[200]};
    border: 2px solid ${theme.color.green[600]};
    border-bottom: 6px solid ${theme.color.green[600]};
  }
`;
