import AuthorAvatar from "@/components/ui/AuthorAvatar";
import ForkKnifeIcon from "@/components/ui/icons/ForkKnife";
import TimerIcon from "@/components/ui/icons/Timer";
import type { User } from "@/types/shared/Auth";
import type { Category } from "@/types/shared/Category";
import type { Recipe } from "@/types/shared/Recipe";

export default function BasicRecipeInfos({recipe} :{recipe: Recipe}) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className="mt-16 flex gap-4 md:gap-8 lg:gap-8">
      <div className="flex items-center gap-3">
        <div className="pr-4 border-r border-black/10 flex flex-col items-center gap-3 pt-2 lg:flex-row lg:pr-8 md:flex-row md:pr-8">
          <AuthorAvatar authorName={(recipe.author as User)?.name} avatarUrl={(recipe.author as User)?.avatar} />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-black text-base text-center lg:text-left">{(recipe.author as User)?.name ?? "John Smith"}</p>
            <p className="text-sm font-semibold text-gray-600 text-center lg:text-left">
              { new Date(recipe.createdAt).toLocaleDateString('en-GB', options) ?? "15 March 2022"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 pr-4 lg:pr-8 border-r border-black/10 lg:flex-row lg:justify-start md:flex-row md:pr-8" >
        <TimerIcon />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-xs text-center lg:text-left">PREP TIME</p>
          <p className="font-medium text-sm text-center lg:text-left">{recipe.prepTime} Minutes</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 pr-8 border-r border-black/10 lg:flex-row lg:justify-start md:flex-row md:pr-8" >
        <TimerIcon />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-xs text-center lg:text-left">COOK TIME</p>
          <p className="font-medium text-sm text-center lg:text-left">{recipe.cookTime} Minutes</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 pr-4 lg:pr-8 lg:flex-row lg:justify-start md:flex-row md:pr-8" >
        <ForkKnifeIcon />
        <p className="font-medium text-sm">{(recipe.mainCategory as Category).name}</p>
      </div>
    </div>
  )
}