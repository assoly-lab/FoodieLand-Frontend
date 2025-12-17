import type { User } from "@/types/shared/Auth";
import type { Recipe } from "@/types/shared/Recipe";

export default function OtherRecipes({ recipes }: { recipes: Recipe[] }) {
  return (
    <div>
      {recipes.map((recipe) => {
        return (
          <div key={recipe._id} className="flex">
            <img src={recipe.mainImage.url} className="flex-1 rounded-3xl" />
            <div className="flex-1">
              <p className="truncate">{ recipe.title }</p>
              <p className="">By { (recipe.author as User).name ?? "Andreas Paula" } </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
