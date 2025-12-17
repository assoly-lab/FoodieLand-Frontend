import { recipeService } from "@/services/api/recipe.service";
import type { ApiCreateResponse, ApiErrorResponse, ApiListResponse, ApiUpdateResponse, ApiDetailsResponse } from "@/types/shared/Api";
import type { Recipe } from "@/types/shared/Recipe";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RootState } from "../store";

export const loadRecipes = createAsyncThunk<ApiListResponse<Recipe>, void, { rejectValue: ApiErrorResponse }>(
  'Recipe/loadRecipes',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { filters } = state.recipe;
      const response = await recipeService.loadRecipes(filters);

      toast.success('Successfully loaded recipes!');
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
          return rejectWithValue({success: false, error: error.response.data.error });
        } else {
          toast.error(error.message);
          return rejectWithValue({ success: false, error: error.message });
        }
      }
      toast.error('Failed to load recipes');
      return rejectWithValue({ success: false, error: 'Failed to load recipes' });
    }
  },
);

export const loadRecipe = createAsyncThunk<ApiDetailsResponse<Recipe>, string, { rejectValue: ApiErrorResponse }>(
  'Recipe/loadRecipe',
  async (id, { rejectWithValue }) => {
    try {
      const response = await recipeService.loadRecipe(id);

      toast.success('Successfully loaded recipe!');
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
          return rejectWithValue({success: false, error: error.response.data.error });
        } else {
          toast.error(error.message);
          return rejectWithValue({ success: false, error: error.message });
        }
      }
      toast.error('Failed to load recipe');
      return rejectWithValue({ success: false, error: 'Failed to load recipe' });
    }
  },
);

export const createRecipe = createAsyncThunk<ApiCreateResponse<Recipe>, FormData, { rejectValue: ApiErrorResponse }>(
  'Recipe/createRecipe',
  async (RecipePayload, { rejectWithValue }) => { 
    try{
      const response = await recipeService.createRecipe(RecipePayload);
      toast.success('Successfully created a recipe!');
      return response
    }catch(error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
          return rejectWithValue({success: false, error: error.response.data.error });
        } else {
          toast.error(error.message);
          return rejectWithValue({ success: false, error: error.message });
        }
      }
      toast.error('Failed to create recipe');
      return rejectWithValue({ success: false, error: 'Failed to create recipe' });
    }
  })

export const updateRecipe = createAsyncThunk<ApiUpdateResponse<Recipe>, { id: string;  recipePayload: FormData}, { rejectValue: ApiErrorResponse }>(
  'Recipe/updateRecipe',
  async ({id, recipePayload}, { rejectWithValue }) => { 
    try{
      const response = await recipeService.updateRecipe(id, recipePayload);
      toast.success('Successfully updated a recipe!');
      return response
    }catch(error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
          return rejectWithValue({success: false, error: error.response.data.error });
        } else {
          toast.error(error.message);
          return rejectWithValue({ success: false, error: error.message });
        }
      }
      toast.error('Failed to update a recipe');
      return rejectWithValue({ success: false, error: 'Failed to update recipe' });
    }
  })

export const deleteRecipe = createAsyncThunk<string, string, { rejectValue: ApiErrorResponse }>(
  'Recipe/deleteRecipe',
  async (id, { rejectWithValue }) => { 
    try{
      await recipeService.deleteRecipe(id);
      toast.success('Successfully delete a recipe!');
      return id
    }catch(error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
          return rejectWithValue({success: false, error: error.response.data.error });
        } else {
          toast.error(error.message);
          return rejectWithValue({ success: false, error: error.message });
        }
      }
      toast.error('Failed to delete a recipe');
      return rejectWithValue({ success: false, error: 'Failed to delete recipe' });
    }
  })