import { Navbar } from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import CategoriesSection from "@/features/dashboard/components/category/CategoriesSection";
import RecipeSection from "@/features/dashboard/components/recipe/RecipeSection";
import { useCategory } from "@/hooks/useCategory";
import { useDashboard } from "@/hooks/useDashboard";
import useRecipe from "@/hooks/useRecipe";
import { useEffect } from "react";

export default function DashboardPage() {
  const { activeSection } = useDashboard();
  const { handleLoadRecipes } = useRecipe();
  const { handleLoadCategories } = useCategory();
  
  useEffect(() => {
    Promise.all([handleLoadRecipes(), handleLoadCategories()])
  }, [handleLoadRecipes, handleLoadCategories]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {activeSection === "categories" ? (
            <CategoriesSection />
          ) : (
            <RecipeSection />
          )}
        </main>
      </div>
    </div>
  );
}
