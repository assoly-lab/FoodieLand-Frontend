import { api } from '@/lib/axios';
import type { ApiCreateResponse, ApiDeleteResponse, ApiDetailsResponse, ApiListResponse, ApiUpdateResponse } from '@/types/shared/Api';
import type { Recipe } from '@/types/shared/Recipe';

export const recipeService = {
  loadRecipes: async (): Promise<ApiListResponse<Recipe>> => {
    const { data } = await api.get<ApiListResponse<Recipe>>('/recipes');
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
