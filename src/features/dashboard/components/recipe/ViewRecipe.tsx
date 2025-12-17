import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useRecipe from "@/hooks/useRecipe";
import type { Category } from "@/types/shared/Category";
import { Clock, Pencil, Trash2 } from "lucide-react";

export default function ViewRecipe() {
  
  const { selectedRecipe, recipeAction, handleDeleteRecipe, handleEditRecipe, handleCloseViewRecipe } = useRecipe();
  const isOpen = recipeAction === "view";
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseViewRecipe}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto font-inter">
        <DialogHeader>
          <DialogTitle>Recipe Details</DialogTitle>
          <DialogDescription>View full recipe information</DialogDescription>
        </DialogHeader>
        {selectedRecipe && (
          <div className="space-y-6">
            {selectedRecipe.mainImage ? (
              <img
                src={selectedRecipe.mainImage.url || "/placeholder.svg"}
                alt={selectedRecipe.title}
                className="w-full h-56 rounded-xl object-cover"
              />
            ) : (
              <div className="w-full h-56 rounded-xl bg-slate-200 flex items-center justify-center">
                <span className="text-4xl text-slate-400">No Image</span>
              </div>
            )}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-foreground">{selectedRecipe.title}</h3>
              </div>
              <p className="text-orange-600 mt-1">{(selectedRecipe.mainCategory as Category)?.name ?? "Unknown"}</p>
              {selectedRecipe.secondaryCategories && selectedRecipe.secondaryCategories.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedRecipe.secondaryCategories.map((category) => (
                    <span key={(category as Category)._id} className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                      {(category as Category).name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Prep: {selectedRecipe.prepTime} min</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Cook: {selectedRecipe.cookTime} min</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-3">Nutrition (per serving)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Calories</p>
                  <p className="font-medium">{selectedRecipe.nutrition?.calories} kcal</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Protein</p>
                  <p className="font-medium">{selectedRecipe.nutrition?.protein}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Carbs</p>
                  <p className="font-medium">{selectedRecipe.nutrition?.carbohydrate}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fat</p>
                  <p className="font-medium">{selectedRecipe.nutrition?.totalFat}g</p>
                </div>
              </div>
            </div>
            {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 text-2xl">Ingredients</h4>
                <div className="space-y-4">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx}>
                      {ingredient.title && (
                        <p className="text-base font-medium text-black mb-2">{ingredient.title}</p>
                      )}
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {ingredient.items.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedRecipe.directions && selectedRecipe.directions.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">Directions</h4>
                <div className="space-y-4">
                  {selectedRecipe.directions.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {step.order}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        {step.image && (
                          <img
                            src={step.image.url || "/placeholder.svg"}
                            alt={`Step ${step.image.url}`}
                            className="mt-2 w-full max-w-xs h-32 rounded-lg object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="text-xs text-muted-foreground border-t pt-4">
              <p>Created: {new Date(selectedRecipe.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(selectedRecipe.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => handleEditRecipe(selectedRecipe)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteRecipe(selectedRecipe)}
                variant="outline"
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50 rounded-xl gap-2 bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
