import type { Nutrition, Recipe } from "@/types/shared/Recipe";

export default function MainRecipeInfos({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mt-16">
      <div className="w-full flex flex-col gap-8 lg:flex-row">
        <img src={recipe.mainImage.url} className="rounded-3xl lg:flex-2/3" />
        <div className="bg-hero lg:flex-1/3 rounded-3xl">
          <p className="pl-6 pt-8 font-semibold text-2xl">
            Nutrition Information
          </p>
          <div className="mt-6">
            {Object.entries(recipe.nutrition as Nutrition).map(([key, value]) => (
              <div key={key} className="w-[90%] mx-auto flex justify-between py-4 border-b border-black/10 ">
                <p className="text-muted-foreground capitalize">
                  {key}{" "}
                </p>
                <p className="font-medium">
                  {value}
                  {" kcal"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div  className="mt-16 ">
        <p className="text-muted-foreground">{ recipe.description }</p>
      </div>
      
    </div>
  );
}
