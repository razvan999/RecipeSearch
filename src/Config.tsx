const API_URL: string = "https://www.themealdb.com/api/json/v1/1";

export const API_RANDOM_RECIPE: string = `${API_URL}/random.php`;
export const API_BY_NAME: string = `${API_URL}/search.php?s=`;
export const API_BY_ID: string = `${API_URL}/lookup.php?i=`;
export const API_BY_MAIN_INGREDIENT: string = `${API_URL}/filter.php?i=`;
export const API_BY_CATEGORY: string = `${API_URL}/filter.php?c=`;
export const API_BY_AREA: string = `${API_URL}/filter.php?a=`;
export const API_ALL_AREAS: string = `${API_URL}/list.php?a=list`;
export const API_ALL_CATEGORIES: string = `${API_URL}/list.php?c=list`;
