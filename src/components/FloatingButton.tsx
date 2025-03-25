import { useContext } from "react";
import { ThemeContext } from "../App";
import "../index.css";

import { FaMoon, FaSun } from "react-icons/fa";

const FloatingButton = () => {
  const context = useContext(ThemeContext);

  return (
    <div
      className="floatingButtonContainer"
      style={
        context.isLightTheme
          ? { backgroundColor: "white" }
          : { backgroundColor: "#3d3d3d" }
      }
    >
      <button
        className="floatingButton"
        onClick={() => {
          context.setTheme((prev) => ({
            isLightTheme: !prev.isLightTheme,
          }));
        }}
      >
        {context.isLightTheme ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default FloatingButton;
