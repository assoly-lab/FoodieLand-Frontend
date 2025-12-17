import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import {
  setIsRecipeDeleteModalOpen,
  setIsRecipeFormOpen,
  setRecipeAction,
  setRecipeFilters,
  setSelectedRecipe,
} from "@/store/recipe/RecipeSlice";
import {
  createRecipe,
  deleteRecipe,
  loadRecipes,
  updateRecipe,
} from "@/store/recipe/RecipeThunk";
import type { Recipe, RecipeFilters } from "@/types/shared/Recipe";

export default function useRecipe() {
  const dispatch = useAppDispatch();
  const {
    recipes,
    selectedRecipe,
    otherRecipes,
    recipeDetails,
    recipeAction,
    isDeleteModalOpen,
    isFormOpen,
    isLoading,
    error,
    filters
  } = useAppSelector((state) => state.recipe);

  const handleLoadRecipes = async () => {
    dispatch(loadRecipes());
  };

  const handleViewRecipe = async (recipe: Recipe) => {
    dispatch(setRecipeAction("view"));
    dispatch(setSelectedRecipe(recipe));
  };

  const handleCloseViewRecipe = async () => {
    dispatch(setRecipeAction(null))
    dispatch(setSelectedRecipe(null));
  };

  const handleCreateRecipe = async () => {
    dispatch(setSelectedRecipe(null));
    dispatch(setRecipeAction("create"));
    dispatch(setIsRecipeFormOpen(true));
  };

  const handleEditRecipe = async (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
    dispatch(setRecipeAction("edit"));
    dispatch(setIsRecipeFormOpen(true));
  };

  const handleSubmitRecipeForm = async (recipePayload: FormData) => {
    if (recipeAction === "edit") {
      dispatch(
        updateRecipe({ id: selectedRecipe?._id as string, recipePayload }),
      )
        .unwrap()
        .then(() => {
          dispatch(setIsRecipeFormOpen(false));
        });
    } else {
      dispatch(createRecipe(recipePayload))
        .unwrap()
        .then(() => {
          dispatch(setIsRecipeFormOpen(false));
        });
    }
  };

  const handleDeleteRecipe = async (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
    dispatch(setIsRecipeDeleteModalOpen(true));
  };

  const handleCloseRecipeDeleteModal = async () => {
    dispatch(setIsRecipeDeleteModalOpen(false));
  };

  const handleConfirmDeleteRecipe = async () => {
    if (isDeleteModalOpen && selectedRecipe) {
      dispatch(deleteRecipe(selectedRecipe._id));
    }
  };
  
  const handleCloseForm = async () => {
    dispatch(setIsRecipeFormOpen(false))
  }
  
  const handleRecipeFilters = async (filters: Partial<RecipeFilters>) => {
    dispatch(setRecipeFilters(filters));
  };
  
  return {
    recipes,
    selectedRecipe,
    recipeDetails,
    otherRecipes,
    recipeAction,
    isDeleteModalOpen,
    isFormOpen,
    isLoading,
    error,
    filters,
    handleLoadRecipes,
    handleViewRecipe,
    handleCloseViewRecipe,
    handleCreateRecipe,
    handleEditRecipe,
    handleSubmitRecipeForm,
    handleDeleteRecipe,
    handleCloseRecipeDeleteModal,
    handleConfirmDeleteRecipe,
    handleCloseForm,
    handleRecipeFilters,
  };
}
