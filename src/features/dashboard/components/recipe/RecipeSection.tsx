import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ViewRecipe from "./ViewRecipe";
import EditRecipe from "./EditRecipe";
import RecipeDeleteDialog from "./RecipeDeleteDialog";
import useRecipe from "@/hooks/useRecipe";
import DashboardRecipeCard from "@/components/ui/dashboard/DashboardRecipeCard";

export default function RecipeSection() {
  const { recipes, handleCreateRecipe } = useRecipe();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6 font-inter">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Recipes
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your recipe collection
          </p>
        </div>
        <Button
          onClick={handleCreateRecipe}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Recipe</span>
        </Button>
      </div>
      {recipes?.length === 0 ? (
        <Card className="border-dashed font-inter">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No recipes yet</p>
            <Button
              onClick={handleCreateRecipe}
              variant="outline"
              className="rounded-xl gap-2 bg-transparent"
            >
              <Plus className="h-4 w-4" />
              Create your first recipe
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 font-inter">
          {recipes?.map((recipe) => (
            <DashboardRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
      <ViewRecipe />
      <EditRecipe />
      <RecipeDeleteDialog />
    </div>
  );
}
