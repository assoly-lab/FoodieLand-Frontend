import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useRecipe from "@/hooks/useRecipe";
import RecipeForm from "./RecipeForm";



export default function EditRecipe() {
  
  const { selectedRecipe, recipeAction, isFormOpen, handleCloseForm } = useRecipe();
  
    return (
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto font-inter">
          <DialogHeader>
            <DialogTitle>{recipeAction === 'edit' ? "Edit Recipe" : "Create Recipe"}</DialogTitle>
            <DialogDescription>
              {recipeAction === 'edit' ? "Update the recipe details below" : "Add a delicious new recipe to your collection"}
            </DialogDescription>
          </DialogHeader>
          <RecipeForm initialData={selectedRecipe} />
        </DialogContent>
      </Dialog>
    );
}