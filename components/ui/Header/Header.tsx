import React from "react";
import styles from "./Header.module.css";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeaderProps = {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ level, children, className }) => {
  const combinedClassName = `${styles.header} ${className ?? ""}`;
  return React.createElement(level, { className: combinedClassName }, children);
};

export default Header;
