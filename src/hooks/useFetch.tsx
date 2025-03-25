import { useEffect, useState } from "react";
import {
  API_ALL_AREAS,
  API_ALL_CATEGORIES,
  API_BY_AREA,
  API_BY_CATEGORY,
  API_BY_MAIN_INGREDIENT,
  API_BY_NAME,
  API_BY_ID,
} from "../Config";
import { DataType, useFetchReturnType, useFetchType } from "./hooksTypes";

const useFetch = (params: useFetchType): useFetchReturnType => {
  const [data, setData] = useState<DataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let API: string;

  switch (params.api_call) {
    case "area":
      API = `${API_BY_AREA}${params.value}`;
      break;

    case "category":
      API = `${API_BY_CATEGORY}${params.value}`;
      break;

    case "main_ingredient":
      API = `${API_BY_MAIN_INGREDIENT}${params.value}`;
      break;

    case "name":
      API = `${API_BY_NAME}${params.value}`;
      break;

    case "id":
      API = `${API_BY_ID}${params.value}`;
      break;

    case "areas":
      API = API_ALL_AREAS;
      break;

    case "categories":
      API = API_ALL_CATEGORIES;
      break;

    default:
      setError("Function call was wrong");
      setIsLoading(false);
      return { data: null, isLoading, error };
  }

  const fetchData = async (): Promise<{
    data: DataType;
    error: string | null;
  }> => {
    try {
      const response = await fetch(API);
      console.log("API " + API);
      if (!response.ok) throw new Error("Fetching error");

      const fetchedData = await response.json();
      return { data: fetchedData.meals, error: null };
    } catch (e) {
      console.error(e);
      return { data: null, error: "Fetching error" };
    }
  };

  useEffect(() => {
    const fetchAreasAndCategories = async () => {
      try {
        const mor = await fetchData();
        if (!mor.error) setData(mor.data);
        else throw new Error(mor.error);
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

    if (params.value !== "") {
      fetchAreasAndCategories();
    } else {
      setData(null);
      setIsLoading(false);
      // setError("Function call with was wrong parameters.");
    }
  }, [params.value]);

  return { data, isLoading, error };
};

export default useFetch;
