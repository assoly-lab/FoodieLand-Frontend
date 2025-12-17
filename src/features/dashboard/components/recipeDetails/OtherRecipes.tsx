import type { User } from "@/types/shared/Auth";
import type { Recipe } from "@/types/shared/Recipe";
import { Link } from "react-router";

export default function OtherRecipes({ recipes }: { recipes: Recipe[] }) {
  return (
    <div>
      {recipes.map((recipe) => {
        return (
          <Link to={`/recipe/${recipe._id}`}>
            <div key={recipe._id} className="flex gap-4 space-y-6">
              <img src={recipe.mainImage.url} className="rounded-3xl w-[180px] h-[123px]" />
              <div className="flex-2/3 flex flex-col gap-8">
                <p className="text-lg font-semibold">{ recipe.title }</p>
                <p className="text-muted-foreground text-sm">By { (recipe.author as User).name ?? "Andreas Paula" } </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
