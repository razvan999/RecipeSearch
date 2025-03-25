import { useEffect, useState } from "react";
import { API_RANDOM_RECIPE } from "../Config";
import { MealType } from "../DataTypes";

const removeDuplicates = (recipes: MealType[]): MealType[] => {
  return Array.from(
    new Map(recipes.map((recipe) => [recipe.idMeal, recipe])).values()
  );
};

const useRandomRecipes = ({
  recipesNumber = 3,
}: { recipesNumber?: number } = {}) => {
  const [recipes, setRecipes] = useState<MealType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = async (): Promise<{
    data: MealType | null;
    error: string | null;
  }> => {
    try {
      const response = await fetch(API_RANDOM_RECIPE);
      if (!response.ok) throw new Error("Fetching error");

      const fetchedData = await response.json();
      return { data: fetchedData.meals[0] || null, error: null };
    } catch (e) {
      console.error(e);
      return { data: null, error: "Fetching error" };
    }
  };

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const fetchPromises = Array.from({ length: recipesNumber }).map(() =>
          fetchRecipe()
        );
        const results = await Promise.all(fetchPromises);
        const validResults = results
          .map((recipe) => {
            if (!recipe.error) return recipe.data;
            return null;
          })
          .filter((recipe) => recipe !== null && recipe !== undefined);

        if (validResults.length === 0)
          throw new Error("Random recipes array is empty.");

        const uniqueRecipes = removeDuplicates(validResults);
        setRecipes(uniqueRecipes);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "An error occurred while fetching recipes."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  return { recipes, isLoading, error };
};

export default useRandomRecipes;
