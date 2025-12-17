import type { Category, CategoryAction, CategoryState } from "@/types/shared/Category";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, loadCategories, updateCategory } from "@/store/category/CategoryThunk";
import type { ApiCreateResponse, ApiListResponse, ApiUpdateResponse } from "@/types/shared/Api";

const initialState: CategoryState = {
  categories: null,
  action: null,
  isFormOpen: false,
  isDeleteModalOpen: false,
  selectedCategory: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    setCategoryAction: (state, action: PayloadAction<CategoryAction>) => {
      state.action = action.payload;
    },
    setIsCategoryFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },
    setIsDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadCategories.fulfilled, (state, action: PayloadAction<ApiListResponse<Category>>) => {
      state.isLoading = false;
      state.categories = action.payload.data;
      state.error = null;
    });
    builder.addCase(loadCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<ApiCreateResponse<Category>>) => {
      state.isLoading = false;
      state.categories = state.categories ? [ ...state.categories, action.payload.data ] : [action.payload.data];
      state.error = null;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action: PayloadAction<ApiUpdateResponse<Category>>) => {
      state.isLoading = false;
      if(state.categories){
        const index = state.categories?.findIndex((c) => c._id === action.payload.data._id);
        if (index !== -1) {
          state.categories[index] = action.payload.data;
        } else {
          state.categories = [ action.payload.data, ...state.categories ];
        }
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      if(state.categories){
        state.categories = state.categories.filter((c) => c._id !== action.payload);
      }
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });
  },
});

export const { setSelectedCategory, setCategoryAction, setIsCategoryFormOpen, setIsDeleteModalOpen } = categorySlice.actions;

export default categorySlice.reducer;
