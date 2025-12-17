import { setCategoryAction, setIsCategoryFormOpen, setIsDeleteModalOpen, setSelectedCategory } from "@/store/category/CategorySlice";
import { createCategory, deleteCategory, loadCategories, updateCategory } from "@/store/category/CategoryThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import type { Category } from "@/types/shared/Category";

export function useCategory() {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, error, isLoading, action, isFormOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.category,
  );

  const handleLoadCategories = async () => {
    dispatch(loadCategories());
  };
  
  const handleViewCategory = async (category: Category ) => {
    dispatch(setCategoryAction("view"));
    dispatch(setSelectedCategory(category));
  }
  
  const handleCloseViewCategory = async () => {
    dispatch(setSelectedCategory(null));
    dispatch(setCategoryAction(null))
  }
  
  const handleCreateCategory = async () => {
    dispatch(setSelectedCategory(null));
    dispatch(setCategoryAction("create"));
    dispatch(setIsCategoryFormOpen(true));
  }
  
  const handleEditCategory = async (category: Category) => {
    dispatch(setSelectedCategory(category));
    dispatch(setCategoryAction("edit"))
    dispatch(setIsCategoryFormOpen(true))
  }
  
  const handleSubmitCategoryForm = async (categoryPayload: FormData) => {
    if(action === "edit"){
      dispatch(updateCategory({id: selectedCategory?._id as string, categoryPayload})).unwrap().then(() => {
        dispatch(setIsCategoryFormOpen(false))
      });
    }else{
      dispatch(createCategory(categoryPayload)).unwrap().then(() =>{
        dispatch(setIsCategoryFormOpen(false))
      });
    }
  }
  
  const handleDeleteCategory = async (category: Category) => {
    dispatch(setSelectedCategory(category))
    dispatch(setIsDeleteModalOpen(true))
  }
  
  const handleCloseCategoryDeleteModal = async () => {
    dispatch(setIsDeleteModalOpen(false))
  }
  
  const handleConfirmDeleteCategory = async () => {
    if(isDeleteModalOpen && selectedCategory){
      dispatch(deleteCategory(selectedCategory._id));
    }
    
  }
  
  const handleCloseForm = async () => {
    dispatch(setIsCategoryFormOpen(false))
  }
  
  return {
    categories,
    selectedCategory,
    error,
    isLoading,
    action,
    isFormOpen,
    isDeleteModalOpen,
    handleLoadCategories,
    handleViewCategory,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleSubmitCategoryForm,
    handleConfirmDeleteCategory,
    handleCloseViewCategory,
    handleCloseCategoryDeleteModal,
    handleCloseForm
  };
}