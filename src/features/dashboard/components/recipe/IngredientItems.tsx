import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RecipeFormValues } from "@/types/shared/Recipe";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { type UseFormRegister } from "react-hook-form";


interface IngredientItemsProps {
  sectionIndex: number;
  register: UseFormRegister<RecipeFormValues>;
  watchedValues: RecipeFormValues;
  addIngredientItem: (sectionIndex: number) => void;
  removeIngredientItem: (sectionIndex: number, itemIndex: number) => void;
}


export default function IngredientItems({ sectionIndex, register, watchedValues, addIngredientItem, removeIngredientItem }: IngredientItemsProps) {
  
  const items = watchedValues.ingredients[sectionIndex].items || [];
  
    return (
      <>
            {items.map((itemField, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  placeholder="e.g., 2 cups flour"
                  {...register(`ingredients.${sectionIndex}.items.${itemIndex}`)}
                  className="flex-1 border-border/50 rounded-xl text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredientItem(sectionIndex, itemIndex)}
                  className="text-red-500 hover:text-red-600 h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => addIngredientItem(sectionIndex)}
              className="text-orange-600 h-7 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Ingredient
            </Button>
          </>
    );
}
