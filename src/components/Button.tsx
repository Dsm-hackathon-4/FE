import React, { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/themes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "tertiary2";
  size?: "small" | "medium" | "large" | "result";
  children: React.ReactNode;
  isSelected?: boolean; // For tertiary variant
}

export const Button = ({
  variant = "primary",
  size = "medium",
  children,
  isSelected: propIsSelected, // Rename to avoid conflict with internal state
  onClick,
  ...props
}: ButtonProps) => {
  const [internalIsSelected, setInternalIsSelected] = useState(
    propIsSelected || false
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "tertiary") {
      setInternalIsSelected((prev) => !prev);
    }
    onClick?.(event); // Call original onClick if provided
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      isSelected={variant === "tertiary" ? internalIsSelected : propIsSelected}
      onClick={handleClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: "primary" | "secondary" | "tertiary" | "tertiary2";
  size: "small" | "medium" | "large" | "result";
  isSelected?: boolean;
}>`
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease, transform 0.2s ease-out, box-shadow 0.2s ease-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }

  // Variant styles
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: ${theme.color.green[300]};
          color: ${theme.color.black};
          border: none;
          &:hover {
            background-color: ${theme.color.green[400]};
          }
        `;
      case "secondary":
        return `
          background-color: ${theme.color.white};
          color: ${theme.color.black};
          border: none;
          
          &:hover {
            background-color: ${theme.color.zinc[100]};
          }
        `;

      case "tertiary":
        return `
          background-color: ${
            props.isSelected ? theme.color.green[500] : theme.color.zinc[50]
          };
          color: ${
            props.isSelected ? theme.color.white : theme.color.zinc[700]
          };
          border: 1px solid ${
            props.isSelected ? theme.color.green[500] : theme.color.zinc[300]
          };
          &:hover {
            background-color: ${
              props.isSelected ? theme.color.green[600] : theme.color.zinc[200]
            };
          }
        `;
      case "tertiary2":
        return `
          background: linear-gradient(90deg, #A855F7 0%, #EC4899 100%);    
          color: ${theme.color.white};
          border: none;
          
          &:hover {
            opacity: 0.8;
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
          padding: 15px 62px;
          font-family: ${theme.font.t2.fontFamily};
          font-weight: ${theme.font.t2.fontWeight};
          font-size: ${theme.font.t2.fontSize};
          line-height: ${theme.font.t2.lineHeight};
        `;
      case "medium":
        return `
          padding: 15px 147px;
          font-family: ${theme.font.t2.fontFamily};
          font-weight: ${theme.font.t2.fontWeight};
          font-size: ${theme.font.t2.fontSize};
          line-height: ${theme.font.t2.lineHeight};
        `;
      case "large":
        return `
          padding: 15px 232px;
          font-family: ${theme.font.t2.fontFamily};
          font-weight: ${theme.font.t2.fontWeight};
          font-size: ${theme.font.t2.fontSize};
          line-height: ${theme.font.t2.lineHeight};
        `;
      case "result":
        return `
          padding: 15px 149px 15px 149px;
          font-family: ${theme.font.b1.fontFamily};
          font-weight: ${theme.font.b1.fontWeight};
          font-size: ${theme.font.b1.fontSize};
          line-height: ${theme.font.b1.lineHeight};
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
