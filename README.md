# RecipeSearch

## Project 1: Simple Recipe Search & Display

**Problem Statement:**

"Imagine a user wants to quickly find recipes based on ingredients they have available or a specific dish they’re craving. Your task is to build a simple web application that allows users to search for recipes, display them in an organized manner, and view basic details about each recipe."

**Detailed Requirements & Specifications:**

1.  **Core Functionality - Recipe Search:**

    - The application must have a prominent search bar where users can enter keywords (e.g., "chicken", "pasta", "chocolate cake").
    - Upon submitting the search query, the application should fetch recipes from an external API (see API details below).
    - If no results are found, display a clear and user-friendly message ("No recipes found for your search.").

2.  **Recipe Display:**

    - The fetched recipes should be displayed in a visually appealing list or grid format.
    - Each recipe item should show at least:
      - A thumbnail image (if available from the API).
      - The recipe title.
      - A brief description/summary (if available).
    - Implement pagination to handle large result sets gracefully (e.g., display 10 recipes per page, with "Next" and "Previous" buttons).

3.  **Recipe Detail View:**

    - Clicking on a recipe item should navigate the user to a dedicated detail view for that recipe.
    - The detail view should display:
      - Full recipe title.
      - A larger image (if available).
      - Ingredients list.
      - Instructions/steps.
      - Any other relevant information provided by the API.

4.  **Technical Requirements:**

    - **TypeScript:** The entire application _must_ be written in TypeScript, adhering to good coding practices (types, interfaces, etc.).
    - **ReactJS:** Use React components for all UI elements. Focus on component reusability and clean code structure.
    - **CSS:** Style the application using CSS or a CSS-in-JS solution (e.g., Styled Components, Emotion). Prioritize readability and maintainability of your styles. Consider responsiveness for different screen sizes.
    - **API Interaction:** Use `fetch` or a similar library to interact with the provided API. Handle loading states and error conditions gracefully.

5.  **API Details (Use this free public API):**
    - **Base URL:** `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    - This API accepts a search term after the `?s=` parameter. For example: `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`
    - The API returns JSON data in the following format (simplified):

```json
{
  "meals": [
    {
      "strMeal": "Chicken Tikka Masala",
      "strCategory": "Chicken",
      "strArea": "British",
      "imageUrl": "https://www.themealdb.com/images/media/main/sytw1528973406.jpg",
      "strInstructions": "...",
      "strIngredients": ["ingredient1", "ingredient2", "..."]
    }
    // ... more recipes
  ]
}
```
