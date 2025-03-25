import CardGrid from "./card/CardGrid";
import { DataType } from "../hooks/hooksTypes";
import Card from "./card/Card";
import Message from "./Message";
import Spinner from "./Spinner";

const Recipes = ({
  data,
  isLoading,
  error,
  apiCalled,
}: {
  data: DataType;
  isLoading: boolean;
  error: string | null;
  apiCalled: boolean;
}) => {
  const nrRecipes = Array.isArray(data) ? data.length : 0;

  const displayRecipes = Array.isArray(data)
    ? data.map((recipe) => {
        return <Card key={recipe.idMeal} cardData={recipe} />;
      })
    : null;

  return (
    <>
      {error ? (
        <Message message="Error: we could not fetched the recipes" />
      ) : isLoading ? (
        <Spinner />
      ) : nrRecipes > 0 ? (
        <CardGrid>{displayRecipes}</CardGrid>
      ) : apiCalled ? (
        <Message message="No recipe found." />
      ) : null}
    </>
  );
};

export default Recipes;
