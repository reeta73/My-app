import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Home() {
  const { theme, setTheme } = useContext(ThemeContext);

  
  const textColor = theme === "black" ? "white" : "black";

  return (
    <div
      style={{
        background: theme,
        color: textColor,
        height: "100vh",
      }}
    >
      <h1 style={{
      
        color: textColor,
      
      }}>Theme: {theme}</h1>

      <button
        onClick={() =>
          setTheme(theme === "black" ? "white" : "black")
        }
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default Home;