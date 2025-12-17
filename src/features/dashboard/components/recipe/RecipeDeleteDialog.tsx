import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import useRecipe from "@/hooks/useRecipe";


export default function RecipeDeleteDialog() {
  
  const { selectedRecipe, isDeleteModalOpen, handleCloseRecipeDeleteModal, handleConfirmDeleteRecipe } = useRecipe();
  
  return (
    <AlertDialog
      open={isDeleteModalOpen}
      onOpenChange={handleCloseRecipeDeleteModal}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{selectedRecipe?.title}&quot;?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDeleteRecipe}
            className="bg-red-600 hover:bg-red-700 rounded-xl"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
