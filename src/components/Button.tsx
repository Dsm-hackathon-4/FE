import React from "react";
import styled from "@emotion/styled";
import { theme } from "@/themes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
}>`
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  // Variant styles
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: ${theme.color.green[300]};
          color: ${theme.color.black};
          &:hover {
            background-color: ${theme.color.green[400]};
          }
        `;
      case "secondary":
        return `
          background-color: ${theme.color.white};
          color: ${theme.color.black};
          
          &:hover {
            background-color: ${theme.color.zinc[100]};
          }
        `;

      default:
        return ``;
    }
  }}

  // Size styles
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
          padding: 8px 16px;
          font: ${theme.font.t2};
        `;
      case "medium":
        return `
          padding: 15px 62px;
          font: ${theme.font.t2};
        `;
      case "large":
        return `
          padding: 15px 147px;
          font: ${theme.font.t2};
        `;
      default:
        return ``;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
