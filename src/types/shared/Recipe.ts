import type { User } from "./Auth";
import type { Category } from "./Category";

export type RecipeAction = "view" | "create" | "edit" | null;

export interface Ingredient {
  title: string;
  items: string[];
}

export interface RecipeImage {
  url: string;
  name: string;
}

export interface DirectionStep {
  order: number;
  title: string;
  description: string;
  image?: RecipeImage;
}

export interface Nutrition {
  calories: number;
  carbohydrate: number;
  cholesterol: number;
  protein: number;
  totalFat: number;
}

export interface IngredientSection {
  title: string;
  items: string[];
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  mainCategory: string | Category;
  secondaryCategories: string[] | Category[];
  author: string | User;
  publishDate: Date;
  prepTime: number;
  cookTime: number;
  isVegan: boolean;
  mainImage: RecipeImage;
  nutrition?: {
    calories: number;
    carbohydrate: number;
    cholesterol: number;
    protein: number;
    totalFat: number;
  };
  ingredients: IngredientSection[];
  directions: DirectionStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeState {
  recipes: Recipe[] | null;
  otherRecipes: Recipe[] | null;
  recipeAction: RecipeAction;
  isFormOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedRecipe: Recipe | null;
  recipeDetails: Recipe | null;
  filters: RecipeFilters;
  isLoading: boolean;
  error: string | null;
}

export interface RecipeFormValues {
  title: string;
  description: string;
  mainCategory: string | Category;
  secondaryCategories: string[] | Category[];
  prepTime: number;
  cookTime: number;
  isVegan: boolean;
  mainImagePreview: string | null;
  nutrition: Nutrition;
  ingredients: IngredientSection[];
  directions: { order: number; title: string; description: string; image: string | null }[];
}

export interface RecipeImageFiles {
  mainImage: File | null
  mainImageExisting: string | null
  directionImages: Map<number, File>
  directionImagesExisting: Map<number, string>
}

export interface RecipeFormProps {
  initialData?: Recipe | null;
  
}

export interface RecipeFilters {
    search: string,
    category: string
}