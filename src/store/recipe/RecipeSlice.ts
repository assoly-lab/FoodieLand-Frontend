import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ApiCreateResponse, ApiDetailsResponse, ApiListResponse, ApiUpdateResponse } from "@/types/shared/Api";
import type { Recipe, RecipeAction, RecipeFilters, RecipeState } from "@/types/shared/Recipe";
import { createRecipe, deleteRecipe, loadRecipe, loadRecipes, updateRecipe } from "./RecipeThunk";

const initialState: RecipeState = {
  recipes: null,
  otherRecipes: null,
  recipeAction: null,
  isFormOpen: false,
  isDeleteModalOpen: false,
  selectedRecipe: null,
  recipeDetails: null,
  filters: {
    search: '',
    category: ''
  },
  isLoading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "Recipe",
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    setRecipeAction: (state, action: PayloadAction<RecipeAction>) => {
      state.recipeAction = action.payload;
    },
    setIsRecipeFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },
    setIsRecipeDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    },
    setRecipeSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setRecipeCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setRecipeFilters: (state, action: PayloadAction<Partial<RecipeFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadRecipes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadRecipes.fulfilled, (state, action: PayloadAction<ApiListResponse<Recipe>>) => {
      state.isLoading = false;
      state.recipes = action.payload.data;
      state.error = null;
    });
    builder.addCase(loadRecipes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(loadRecipe.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadRecipe.fulfilled, (state, action: PayloadAction<ApiDetailsResponse<Recipe>>) => {
      state.isLoading = false;
      state.recipeDetails = action.payload.data.recipe;
      state.otherRecipes = action.payload.data.otherRecipes;
      state.error = null;
    });
    builder.addCase(loadRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(createRecipe.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createRecipe.fulfilled, (state, action: PayloadAction<ApiCreateResponse<Recipe>>) => {
      state.isLoading = false;
      state.recipes = state.recipes ? [ ...state.recipes, action.payload.data ] : [action.payload.data];
      state.error = null;
    });
    builder.addCase(createRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(updateRecipe.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateRecipe.fulfilled, (state, action: PayloadAction<ApiUpdateResponse<Recipe>>) => {
      state.isLoading = false;
      if(state.recipes){
        const index = state.recipes?.findIndex((r) => r._id === action.payload.data._id);
        if (index !== -1) {
          state.recipes[index] = action.payload.data;
        } else {
          state.recipes = [ action.payload.data, ...state.recipes ];
        }
      }
    });
    builder.addCase(updateRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(deleteRecipe.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      if(state.recipes){
        state.recipes = state.recipes.filter((r) => r._id !== action.payload);
      }
    });
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });
  },
});

export const {
  setSelectedRecipe,
  setRecipeAction,
  setIsRecipeFormOpen,
  setIsRecipeDeleteModalOpen,
  setRecipeSearch,
  setRecipeCategory,
  setRecipeFilters 
} = recipeSlice.actions;

export default recipeSlice.reducer;
