import { ReactNode } from "react";
import "./cardGrid.css";

interface CardGridProps {
  children: ReactNode;
}

const CardGrid = ({ children }: CardGridProps) => {
  return (
    <div className="big">
      <div className="cardGridContainer">{children}</div>
    </div>
  );
};

export default CardGrid;
