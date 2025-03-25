import { Areas, Categories, MealType } from "../DataTypes";

export type useFetchType =
  | {
      api_call: "area" | "category" | "main_ingredient" | "name" | "id";
      value: string;
    }
  | {
      api_call: "areas" | "categories";
      value?: never;
    };

export type DataType = MealType[] | MealType | Areas[] | Categories[] | null;

export type useFetchReturnType = {
  data: DataType;
  isLoading: boolean;
  error: string | null;
};

export type useRandomRecipesReturnType = {
  recipes: MealType[];
  isLoading: boolean;
  error: string | null;
};
