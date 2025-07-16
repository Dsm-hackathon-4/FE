import React, { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/themes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "tertiary2";
  size?: "small" | "medium" | "large" | "result";
  children: React.ReactNode;
  isSelected?: boolean; // For tertiary variant
  width?: string; // New width prop
}

export const Button = ({
  variant = "primary",
  size = "medium",
  children,
  isSelected, // Directly use the prop
  onClick,
  ...props
}: ButtonProps) => {
  // No internal state for isSelected

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Only call original onClick, no internal state toggling
    onClick?.(event);
  };

  let processedChildren = children;
  if (typeof children === "string") {
    const chunkSize = 10;
    const parts = [];
    for (let i = 0; i < children.length; i += chunkSize) {
      parts.push(children.substring(i, i + chunkSize));
    }
    processedChildren = parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  }

  return (
    <StyledButton
      variant={variant}
      size={size}
      isSelected={isSelected} // Always use the prop for isSelected
      onClick={handleClick}
      {...props}
    >
      {processedChildren}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: "primary" | "secondary" | "tertiary" | "tertiary2";
  size: "small" | "medium" | "large" | "result";
  isSelected?: boolean;
  width?: string;
}>`
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease,
    transform 0.2s ease-out, box-shadow 0.2s ease-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: ${(props) => props.width || "auto"};
  white-space: normal; /* Allow text to wrap */
  text-align: center; /* Center wrapped text */

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
