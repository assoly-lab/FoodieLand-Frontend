import RecipeCard from "@/components/ui/recipe/RecipeCard";
import useRecipe from "@/hooks/useRecipe";

export default function HighlightedRecipes() {
  
  const { recipes } = useRecipe();
  
  return (
    <section className="w-full py-12 px-6 md:py-8 md:px-8 lg:px-16 mb-16 font-inter">
      <div className="mx-auto lg:w-[50%] flex flex-col gap-6 items-center">
        <h3 className="text-3xl lg:text-5xl font-semibold">Simple and tasty recipes</h3>
        <p className="text-center text-black/60">
          Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqut enim ad minim{" "}
        </p>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
       {recipes && recipes?.length > 0 && recipes.slice(0,9).map(recipe => {
         return(
           <RecipeCard key={recipe._id} recipe={recipe} />
         )
       })}
     </div>
    </section>
  );
}
