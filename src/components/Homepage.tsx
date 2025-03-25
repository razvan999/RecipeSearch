import { useContext, useEffect, useState } from "react";
import { DataType } from "../hooks/hooksTypes";
import useFetch from "../hooks/useFetch";
import TopSection from "./TopSection";
import Message from "./Message";
import Divider from "./Divider";
import Recipes from "./Recipes";
import Pagination from "./Pagination";
import RandomRecipes from "./RandomRecipes";
import FloatingButton from "./FloatingButton";
import { ThemeContext } from "../App";

const Homepage = () => {
  const context = useContext(ThemeContext);

  const [recipes, setRecipes] = useState<DataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [fieldValue, setFieldValue] = useState<string>("");
  const [apiCalled, setApiCalled] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const someRecipes = Array.isArray(recipes)
    ? recipes.slice(firstPostIndex, lastPostIndex)
    : [];
  const allRecipesLength = Array.isArray(recipes) ? recipes.length : 0;

  const recipesFetch = useFetch({
    api_call: "main_ingredient",
    value: fieldValue,
  });

  const getData = (value: string) => {
    setApiCalled(true);
    setFieldValue(value.trim().toLocaleLowerCase());
  };

  useEffect(() => {
    if (recipesFetch.error) {
      console.error(recipesFetch.error);
      setError(recipesFetch.error);
    } else {
      setRecipes(recipesFetch.data);
      setIsLoading(recipesFetch.isLoading);
    }
  }, [fieldValue, recipesFetch]);

  return (
    <div
      style={
        context.isLightTheme
          ? { backgroundColor: "white" }
          : { backgroundColor: "#3d3d3d" }
      }
    >
      <TopSection getData={getData} />
      <Message
        message={"Type something, and I'll find the best recipe for you =))"}
      />
      <Divider />
      <Recipes
        data={someRecipes}
        isLoading={isLoading}
        error={error}
        apiCalled={apiCalled}
      />
      {allRecipesLength > 0 ? (
        <Pagination
          allRecipesLength={allRecipesLength}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
      <Message message="Here are some recipes to browse through until you decide what to search for." />
      <RandomRecipes />
      <FloatingButton />
    </div>
  );
};

export default Homepage;
