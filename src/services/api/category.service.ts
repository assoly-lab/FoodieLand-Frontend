import { api } from '@/lib/axios';
import { sanitizeQueryParams } from '@/lib/utils';
import type { ApiCreateResponse, ApiDeleteResponse, ApiListResponse, ApiUpdateResponse, FilterOptions } from '@/types/shared/Api';
import type { Category, CategoryFilters } from '@/types/shared/Category';

export const categoryService = {
  loadCategories: async (filters?: CategoryFilters): Promise<ApiListResponse<Category>> => {
    
    const sanitizedFilters = sanitizeQueryParams(filters as FilterOptions)
    const { data } = await api.get<ApiListResponse<Category>>('/categories', { params: sanitizedFilters });
    return data;
  },

  createCategory: async (categoryPayload: FormData): Promise<ApiCreateResponse<Category>> => {
    const { data } = await api.post<ApiCreateResponse<Category>>('/categories', categoryPayload);
    return data
  },

  updateCategory: async (id: string, categoryPayload: FormData): Promise<ApiUpdateResponse<Category>> => {
    const { data } = await api.put<ApiUpdateResponse<Category>>(`/categories/${id}`, categoryPayload);
    return data;
  },
  
  deleteCategory: async (id: string): Promise<ApiDeleteResponse> => {
    const { data } = await api.delete<ApiDeleteResponse>(`/categories/${id}`);
    return data;
  }
};
