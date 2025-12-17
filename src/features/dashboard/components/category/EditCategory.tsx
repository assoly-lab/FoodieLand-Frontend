import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCategory } from "@/hooks/useCategory";
import CategoryForm from "@/features/dashboard/components/category/CategoryForm";

export default function EditCategory() {

  const { action, isFormOpen, selectedCategory, handleCloseForm } = useCategory();

  return (
    <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto font-inter">
        <DialogHeader>
          <DialogTitle>
            {action === "edit" ? "Edit Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            {action === "edit"
              ? "Update the category details below"
              : "Add a new category for organizing your recipes"}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm initialData={selectedCategory} />
      </DialogContent>
    </Dialog>
  )
}