import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { MealType } from "../../DataTypes";

import "./DetailedView.css";
import Message from "../Message";
import Spinner from "../Spinner";
import { ThemeContext } from "../../App";
import FloatingButton from "../FloatingButton";

const DetailedView = () => {
  const context = useContext(ThemeContext);

  const params = useParams();

  const [recipe, setRecipe] = useState<MealType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const id = params?.id ?? 0;
  const recipesFetch = useFetch({
    api_call: "id",
    value: id.toString(),
  });

  useEffect(() => {
    if (recipesFetch.error) {
      console.error(recipesFetch.error);
      setError(recipesFetch.error);
    } else {
      const val = Array.isArray(recipesFetch.data)
        ? recipesFetch.data[0]
        : null;
      setRecipe(val as MealType);
      setIsLoading(recipesFetch.isLoading);

      console.log(val);
    }
  }, [recipesFetch]);

  return (
    <>
      {error ? (
        <Message message="Error: we could not fetched the recipe" />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div
          className="meal-detail"
          style={
            context.isLightTheme
              ? { backgroundColor: "white" }
              : { backgroundColor: "#3d3d3d" }
          }
        >
          <h2>{recipe?.strMeal}</h2>
          <div className="centerImg">
            {recipe?.strMealThumb && (
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            )}
          </div>
          {recipe?.strMealAlternate && (
            <h3>Also Known As: {recipe?.strMealAlternate}</h3>
          )}
          {recipe?.strCategory && (
            <p>
              <strong>Category:</strong> {recipe?.strCategory}
            </p>
          )}
          {recipe?.strArea && (
            <p>
              <strong>Area:</strong> {recipe?.strArea}
            </p>
          )}
          {recipe?.strTags && (
            <p>
              <strong>Tags:</strong> {recipe?.strTags}
            </p>
          )}
          {recipe?.strInstructions && (
            <div>
              <h4>Instructions:</h4>
              <p>{recipe?.strInstructions}</p>
            </div>
          )}
          {recipe?.strYoutube && (
            <div>
              <h4>
                Watch on YouTube:{" "}
                <a
                  href={recipe?.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {recipe?.strMeal} Recipe Video
                </a>
              </h4>
            </div>
          )}
          <div>
            <h4>Ingredients:</h4>
            <ul style={{ listStyleType: "disc" }}>
              {Array.from({ length: 20 }, (_, i) => {
                const ingredientKey = `strIngredient${
                  i + 1
                }` as keyof typeof recipe;
                const measureKey = `strMeasure${i + 1}` as keyof typeof recipe;

                const ingredient = recipe?.[ingredientKey];
                const measure = recipe?.[measureKey];

                return ingredient ? (
                  <li key={i}>
                    {ingredient} {measure}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      )}
      <FloatingButton />
    </>
  );
};

export default DetailedView;
