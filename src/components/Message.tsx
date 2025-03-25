import { useContext } from "react";
import { ThemeContext } from "../App";
import "../index.css";

const Message = ({ message }: { message: string }) => {
  const context = useContext(ThemeContext);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <p
        className="roboto-serif-class"
        style={
          context.isLightTheme
            ? { color: "gray", fontSize: "16px" }
            : { color: "white", fontSize: "16px" }
        }
      >
        {message}
      </p>
    </div>
  );
};

export default Message;
