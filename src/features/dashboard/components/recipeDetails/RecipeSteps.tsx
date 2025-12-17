import type { Recipe } from "@/types/shared/Recipe";
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import useRecipe from "@/hooks/useRecipe";
import OtherRecipes from "./OtherRecipes";

export default function RecipeSteps({ recipe }: { recipe: Recipe }) {
  const [checkedItems, setCheckedItems] = useState(new Map<string, boolean>());
  const [checkedSteps, setCheckedSteps] = useState(new Set<number>());
  const { otherRecipes } = useRecipe();

  const handleCheckChange = (itemKey: string) => {
    setCheckedItems((prev) => {
      const newMap = new Map(prev);
      newMap.set(itemKey, !newMap.get(itemKey));
      return newMap;
    });
  };

  const handleDirectionCheckChange = (order: number) => {
    setCheckedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(order)) {
        newSet.delete(order);
      } else {
        newSet.add(order);
      }
      return newSet;
    });
  };
  return (
    <div className="mt-16">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:flex-2/3">
          <div>
            <p className="font-semibold text-4xl mb-8">Ingredients</p>
            {recipe.ingredients.map((section, sectionIdx) => {
              return (
                <div key={sectionIdx} className="mb-8">
                  {section.title && (
                    <p className="font-semibold text-2xl mb-4">
                      {section.title}
                    </p>
                  )}
                  <ul className="list-none space-y-1">
                    {section.items.map((item, itemIdx) => {
                      const itemKey = `${sectionIdx}-${itemIdx}`;
                      const isChecked = checkedItems.get(itemKey) || false;
                      return (
                        <li
                          key={itemKey}
                          className="flex items-center gap-4 py-6 border-b border-black/10"
                        >
                          <button
                            type="button"
                            onClick={() => handleCheckChange(itemKey)}
                            className="transition-colors shrink-0"
                            aria-label={
                              isChecked ? "Uncheck item" : "Check item"
                            }
                          >
                            {isChecked ? (
                              <CheckCircle2 className="h-7 w-7 text-white fill-black strok-white" />
                            ) : (
                              <Circle className="h-7 w-7 text-gray-300 stroke-1" />
                            )}
                          </button>
                          <span
                            className={`font-normal text-lg text-black ${isChecked ? "line-through opacity-60" : ""}`}
                          >
                            {item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-20">
            <p className="font-semibold text-4xl mb-8">Directions</p>
            {recipe.directions.map((step) => {
              const isChecked = checkedSteps.has(step.order);
              const stepStyle = `font-semibold text-2xl mb-4 text-black ${isChecked ? "line-through opacity-60" : ""}`;
              const descriptionStepStyle = `font-normal text-base mb-4 text-muted-foreground leading-6 ${isChecked ? "line-through opacity-60" : ""}`;
              return (
                <div key={step.order} className="flex gap-4 items-start py-4">
                  <button
                    type="button"
                    onClick={() => handleDirectionCheckChange(step.order)}
                    className="text-muted-foreground hover:text-cyan-600 transition-colors shrink-0 mt-0.5"
                    aria-label={
                      isChecked ? "Mark step incomplete" : "Mark step complete"
                    }
                  >
                    {isChecked ? (
                      <CheckCircle2 className="h-7 w-7 text-white fill-black strok-white" />
                    ) : (
                      <Circle className="h-7 w-7 text-gray-300 stroke-1" />
                    )}
                  </button>
                  <div className="flex-1">
                    {step.title && (
                      <p className={`${stepStyle}`}>{step.title}</p>
                    )}
                    <p className={descriptionStepStyle}>{step.description}</p>
                    {step.image && (
                      <img
                        src={step.image.url || "/placeholder.svg"}
                        alt={`Step ${step.order}`}
                        className="mt-2 lg:w-full h-64 w-[90%] md:h-80 md:w-[95%] lg:h-96 rounded-lg object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:flex-1/3 flex flex-col gap-8">
          <h2 className="text-4xl font-semibold">Other Recipes</h2>
          {otherRecipes && otherRecipes.length && <OtherRecipes recipes={otherRecipes} />}
        </div>
      </div>
    </div>
  );
}
