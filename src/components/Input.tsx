import { theme } from "@/themes";
import styled from "@emotion/styled";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: "small" | "medium" | "large";
}

export const Input = ({ width, ...props }: InputProps) => {
  const getWidth = () => {
    switch (width) {
      case "small":
        return "100px";
      case "medium":
        return "200px";
      case "large":
        return "700px";
      default:
        return "100%";
    }
  };

  return (
    <Wrapper style={{ width: getWidth() }}>
      <StyledInput {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${theme.color.green[500]};
  border-radius: 8px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  outline: none;
  font: ${theme.font.h4};
  color: ${theme.color.zinc[700]};
  text-align: center;
  &::placeholder {
    color: ${theme.color.zinc[400]};
  }

  &:focus {
    border-color: ${theme.color.green[600]};
  }
`;
