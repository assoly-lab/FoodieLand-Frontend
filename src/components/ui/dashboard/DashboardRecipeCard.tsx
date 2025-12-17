import { Clock, Eye, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "../card";
import type { Category } from "@/types/shared/Category";
import type { Recipe } from "@/types/shared/Recipe";
import useRecipe from "@/hooks/useRecipe";


export default function DashboardRecipeCard({recipe}: {recipe: Recipe}) {
  
    const { handleViewRecipe, handleEditRecipe, handleDeleteRecipe } = useRecipe();
  
  return (
    <Card
      key={recipe._id}
      className="bg-slate-50 border-0 shadow-sm overflow-hidden"
    >
      <CardContent className="p-0">
        <div className="relative">
          {recipe.mainImage ? (
            <img
              src={recipe.mainImage.url || "/placeholder.svg"}
              alt={recipe.title}
              className="w-[90%] mx-auto h-40 object-cover rounded-3xl"
            />
          ) : (
            <div className="w-full h-40 bg-slate-200 flex items-center justify-center">
              <span className="text-4xl text-slate-400">?</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground truncate">
            {recipe.title}
          </h3>
          <p className="text-sm text-cyan-600 mt-1">
            {(recipe.mainCategory as Category)?.name ?? "Unknown"}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.prepTime + recipe.cookTime} min
            </span>
            <span>{recipe.nutrition?.calories} kcal</span>
          </div>
        </div>
        <div className="flex border-t border-border/40">
          <button
            onClick={() => handleViewRecipe(recipe)}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-3 text-sm text-foreground hover:bg-slate-100 transition-colors"
          >
            <Eye className="h-4 w-4" />
            View
          </button>
          <div className="w-px bg-border/40" />
          <button
            onClick={() => handleEditRecipe(recipe)}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-3 text-sm text-foreground hover:bg-slate-100 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <div className="w-px bg-border/40" />
          <button
            onClick={() => handleDeleteRecipe(recipe)}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  )
}