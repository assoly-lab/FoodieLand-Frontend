import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import RecipeLoader from "@/components/ui/recipe/RecipeLoader";
import BasicRecipeInfos from "@/features/dashboard/components/recipeDetails/BasicRecipeInfos";
import MainRecipeInfos from "@/features/dashboard/components/recipeDetails/MainRecipeInfos";
import RecipeSteps from "@/features/dashboard/components/recipeDetails/RecipeSteps";
import useRecipe from "@/hooks/useRecipe";
import { useAppDispatch } from "@/store/hooks/hooks";
import { loadRecipe } from "@/store/recipe/RecipeThunk";
import { useEffect } from "react";
import { useParams } from "react-router";



export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { recipeDetails, isLoading } = useRecipe();
  
  useEffect(() => {
    if(id){
      dispatch(loadRecipe(id));
    }
  }, [])
 
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="w-full py-12 px-4 md:py-8 md:px-8 lg:px-16 mb-16 font-inter">
          {isLoading &&  <RecipeLoader /> }
          {recipeDetails && (
            <div className="mt-10">
              <h1 className="font-semibold text-4xl lg:text-6xl">{recipeDetails.title}s</h1>
              <BasicRecipeInfos recipe={recipeDetails} />
              <MainRecipeInfos recipe={recipeDetails} />
              <RecipeSteps recipe={recipeDetails} />
            </div>
          )}
          
        </main>
        <Footer />
      </div>
    )
}