
export interface CategoryImage {
  name: string;
  url: string;
}

export type CategoryAction = "view" | "create" | "edit" | null;

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: CategoryImage;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryState {
  categories: Category[] | null;
  action: CategoryAction;
  isFormOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedCategory: Category | null;
  filters: CategoryFilters;
  isLoading: boolean;
  error: string | null;
}

export interface CategoryFormValues {
  name: string;
  description: string;
  image: string | null;
}

export interface CategoryFormProps {
  initialData?: Category | null;
  
}

export interface CategoryFilters {
  search: string;
}
