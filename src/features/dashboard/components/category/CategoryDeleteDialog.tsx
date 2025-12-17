import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useCategory } from "@/hooks/useCategory";



export default function CategoryDeleteDialog() {
  
  const { selectedCategory, isDeleteModalOpen, handleConfirmDeleteCategory, handleCloseCategoryDeleteModal } = useCategory();
  
  return (
    <AlertDialog
      open={isDeleteModalOpen}
      onOpenChange={handleCloseCategoryDeleteModal}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{selectedCategory?.name}
            &quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDeleteCategory}
            className="bg-red-600 hover:bg-red-700 rounded-xl"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}