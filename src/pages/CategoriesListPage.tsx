import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import CategoryCard from "@/components/ui/category/CategoryCard";
import RecipeLoader from "@/components/ui/recipe/RecipeLoader";
import { useCategory } from "@/hooks/useCategory";
import { loadCategories } from "@/store/category/CategoryThunk";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useEffect } from "react";

export default function CategoriesListPage() {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useCategory();
  
  useEffect(()=> {
    dispatch(loadCategories());
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col font-inter">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Categories
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our collection of delicious recipes organized by category. 
              Find the perfect dish for any occasion.
            </p>
          </div>
        </section>
        <section className="mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {categories?.length ?? 0 } categor{categories?.length !== 1 ? "ies" : "y"} found
            </p>
          </div>
          
          {isLoading &&
            <RecipeLoader />
          }
          { !isLoading && categories && categories.length &&
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center ">
            {categories?.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
          }
          
          {!isLoading && (!categories || categories.length  === 0) &&
            <p className="text-center text-red-500 font-semibold text-2xl">No categories found!</p>
            
          }
        </section>
      </main>
      <Footer />
    </div>
  );
}
