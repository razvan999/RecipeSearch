import { useEffect, useState } from "react";
import { useRandomRecipesReturnType } from "../hooks/hooksTypes";
import useRandomRecipes from "../hooks/useRandomRecipes";
import Spinner from "./Spinner";
import CardGrid from "./card/CardGrid";
import Card from "./card/Card";
import { MealType } from "../DataTypes";

const RandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState<MealType[]>([]);
  const [isLoadingRandomRecipes, setIsLoadingRandomRecipes] =
    useState<boolean>(true);
  const [randomRecipesError, setRandomRecipesError] = useState<string | null>(
    null
  );

  const randomResponse: useRandomRecipesReturnType = useRandomRecipes();
  // const randomResponse: useRandomRecipesReturnType = useRandomRecipes({
  //   recipesNumber: 8,
  // });

  const displayRandomRecipes = randomRecipes.map((recipe) => {
    return <Card key={recipe.idMeal} cardData={recipe} />;
  });

  useEffect(() => {
    if (randomResponse.error) {
      console.error(randomResponse.error);
      setRandomRecipesError(randomResponse.error);
    } else {
      setRandomRecipes(randomResponse.recipes);
      setIsLoadingRandomRecipes(randomResponse.isLoading);
    }
  }, [randomResponse]);

  return (
    <>
      {randomRecipesError ? (
        <p>Error: we could not fetched the default recipes</p>
      ) : isLoadingRandomRecipes ? (
        <Spinner />
      ) : (
        <CardGrid>{displayRandomRecipes}</CardGrid>
      )}
    </>
  );
};

export default RandomRecipes;
