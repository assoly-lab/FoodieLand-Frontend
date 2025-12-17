import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import RecipeCard from "@/components/ui/recipe/RecipeCard";
import RecipeLoader from "@/components/ui/recipe/RecipeLoader";
import useRecipe from "@/hooks/useRecipe";
import { useAppDispatch } from "@/store/hooks/hooks";
import { loadRecipes } from "@/store/recipe/RecipeThunk";
import { useEffect } from "react";

export default function RecipesListPage() {
  const dispatch = useAppDispatch();
  const { recipes, isLoading } = useRecipe();
  
  useEffect(()=> {
    dispatch(loadRecipes());
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col font-inter">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Recipes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover our complete collection of delicious recipes. From quick
              weeknight dinners to special occasion dishes.
            </p>
          </div>
        </section>
        <section className="mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {recipes?.length ?? 0 } recipe{recipes?.length !== 1 ? "s" : ""} found
            </p>
          </div>
          
          {isLoading &&
            <RecipeLoader />
          }
          { !isLoading && recipes && recipes.length &&
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center ">
            {recipes?.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
          }
          
          {!isLoading && (!recipes || recipes.length  === 0) &&
            <p className="text-center text-red-500 font-semibold text-2xl">No recipes found!</p>
            
          }
        </section>
      </main>
      <Footer />
    </div>
  );
}
