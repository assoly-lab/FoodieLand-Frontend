import { api } from '@/lib/axios';
import { sanitizeQueryParams } from '@/lib/utils';
import type { ApiCreateResponse, ApiDeleteResponse, ApiDetailsResponse, ApiListResponse, ApiUpdateResponse, FilterOptions } from '@/types/shared/Api';
import type { Recipe, RecipeFilters } from '@/types/shared/Recipe';

export const recipeService = {
  loadRecipes: async (filters?: RecipeFilters): Promise<ApiListResponse<Recipe>> => {
    const params = sanitizeQueryParams(filters as FilterOptions);
    const { data } = await api.get<ApiListResponse<Recipe>>('/recipes', { params });
    return data;
  },
  
  loadRecipe: async (id: string): Promise<ApiDetailsResponse<Recipe>> => {
    const { data } = await api.get<ApiDetailsResponse<Recipe>>(`/recipes/${id}`);
    return data;
  },

  createRecipe: async (recipePayload: FormData): Promise<ApiCreateResponse<Recipe>> => {
    const { data } = await api.post<ApiCreateResponse<Recipe>>('/recipes', recipePayload);
    return data
  },

  updateRecipe: async (id: string, recipePayload: FormData): Promise<ApiUpdateResponse<Recipe>> => {
    const { data } = await api.put<ApiUpdateResponse<Recipe>>(`/recipes/${id}`, recipePayload);
    return data;
  },
  
  deleteRecipe: async (id: string): Promise<ApiDeleteResponse> => {
    const { data } = await api.delete<ApiDeleteResponse>(`/recipes/${id}`);
    return data;
  }
};
