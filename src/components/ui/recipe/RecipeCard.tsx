import type { Category } from "@/types/shared/Category";
import type { Recipe } from "@/types/shared/Recipe";
import TimerIcon from "@/components/ui/icons/Timer";
import ForkKnifeIcon from "@/components/ui/icons/ForkKnife";
import { Link } from "react-router";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe._id}`} className="block w-fit h-fit">
      <div className="w-[400px] h-[434px] mt-24 bg-[linear-gradient(to_bottom,#E7F9FD00,#E7F9FD)] rounded-3xl font-inter">
        <img
          src={recipe.mainImage.url}
          className="w-[368px] h-[250px] mx-auto rounded-3xl"
        />
        <div className="px-6 mt-6">
          <p className="font-semibold leading-8 text-2xl">{recipe.title}</p>
          <div className="flex gap-6 mt-8">
            <div className="flex gap-3">
              <TimerIcon />
              <p>{recipe.cookTime} Minutes</p>
            </div>
            <div className="flex gap-3">
              <ForkKnifeIcon />
              <p>{(recipe.mainCategory as Category)?.name ?? "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
