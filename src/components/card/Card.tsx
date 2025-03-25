import { MealType } from "../../DataTypes";
import "./card.css";
import "../../index.css";
import { Link } from "react-router";
import { ThemeContext } from "../../App";
import { useContext } from "react";

const Card = ({ cardData }: { cardData: MealType | null }) => {
  const context = useContext(ThemeContext);

  return (
    <div
      className="card"
      style={
        context.isLightTheme
          ? { backgroundColor: "white" }
          : { backgroundColor: "#3d3d3d" }
      }
    >
      <img
        className="card-img"
        src={cardData?.strMealThumb}
        alt={cardData?.strMeal || "Meal"}
      />
      <div className="card-content">
        <h2
          className="card-title"
          style={context.isLightTheme ? { color: "black" } : { color: "white" }}
        >
          {cardData?.strMeal}
        </h2>
        {cardData?.strCategory ? (
          <p
            className="card-subtitle"
            style={
              context.isLightTheme ? { color: "gray" } : { color: "white" }
            }
          >
            {cardData?.strCategory} • {cardData?.strArea}
          </p>
        ) : (
          <p></p>
        )}

        <Link to={`/view/${cardData?.idMeal}`}>
          <button className="card-button">View Recipe</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
