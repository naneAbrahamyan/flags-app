import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { BsMoon } from "react-icons/bs";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={`${theme}-theme-component`}
    >
      <h4> Where is the world? </h4>
      <button
        onClick={toggleTheme}
        style={{
          border: "none",
          background: "inherit",
          color: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "110px",
        }}
      >
        <BsMoon />
        <p> {theme} Theme </p>
      </button>
    </div>
  );
};

export default Header;
