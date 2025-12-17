import { categoryService } from "@/services/api/category.service";
import type { ApiCreateResponse, ApiErrorResponse, ApiListResponse, ApiUpdateResponse } from "@/types/shared/Api";
import type { Category } from "@/types/shared/Category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const loadCategories = createAsyncThunk<ApiListResponse<Category>, void, { rejectValue: ApiErrorResponse }>(
  'Category/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.loadCategories();

      toast.success('Successfully loaded categories!');
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
          return rejectWithValue({success: false, error: error.response.data.error });
        } else {
          toast.error(error.message);
          return rejectWithValue({ success: false, error: error.message });
        }
      }
      toast.error('Failed to load categories');
      return rejectWithValue({ success: false, error: 'Failed to load categories' });
    }
  },
);

export const createCategory = createAsyncThunk<ApiCreateResponse<Category>, FormData, { rejectValue: ApiErrorResponse }>(
  'Category/createCategory',
  async (CategoryPayload, { rejectWithValue }) => { 
    try{
      const response = await categoryService.createCategory(CategoryPayload);
      toast.success('Successfully created a category!');
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
      toast.error('Failed to create category');
      return rejectWithValue({ success: false, error: 'Failed to create category' });
    }
  })

export const updateCategory = createAsyncThunk<ApiUpdateResponse<Category>, { id: string;  categoryPayload: FormData}, { rejectValue: ApiErrorResponse }>(
  'Category/updateCategory',
  async ({id, categoryPayload}, { rejectWithValue }) => { 
    try{
      const response = await categoryService.updateCategory(id, categoryPayload);
      toast.success('Successfully updated a category!');
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
      toast.error('Failed to update a category');
      return rejectWithValue({ success: false, error: 'Failed to update category' });
    }
  })

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: ApiErrorResponse }>(
  'Category/deleteCategory',
  async (id, { rejectWithValue }) => { 
    try{
      await categoryService.deleteCategory(id);
      toast.success('Successfully delete a category!');
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
      toast.error('Failed to delete a category');
      return rejectWithValue({ success: false, error: 'Failed to delete category' });
    }
  })