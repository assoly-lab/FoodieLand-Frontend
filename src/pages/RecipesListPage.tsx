import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/ui/recipe/RecipeCard";
import RecipeLoader from "@/components/ui/recipe/RecipeLoader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategory } from "@/hooks/useCategory";
import useRecipe from "@/hooks/useRecipe";
import { useAppDispatch } from "@/store/hooks/hooks";
import { loadRecipes } from "@/store/recipe/RecipeThunk";
import { Search } from "lucide-react";
import { useEffect } from "react";

export default function RecipesListPage() {
  const dispatch = useAppDispatch();
  const { recipes, isLoading, filters, handleFilterRecipes } = useRecipe();
  const { categories } = useCategory();

  useEffect(()=> {
    dispatch(loadRecipes());
  }, [filters.search, filters.category])

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
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                  type="text"
                  placeholder="Search by title or description..."
                  className="pl-10 w-full md:w-80 bg-white"
                  value={filters.search}
                  onChange={(e) => {
                      handleFilterRecipes({ search: e.target.value });
                  }}
              />
            </div>
            <Select
                value={filters.category}
                onValueChange={(value) => {
                    handleFilterRecipes({ category: value });
                }}
            >
                <SelectTrigger className="w-full md:w-[200px] bg-white">
                    <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories?.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="text-muted-foreground mt-4 md:mt-0">
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
