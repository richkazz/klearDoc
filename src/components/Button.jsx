import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`btn btn-${variant} ${className}`}
  >
    {children}
  </button>
);
export default Button;
