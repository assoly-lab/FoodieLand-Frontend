import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { RecipeFormValues } from "@/types/shared/Recipe";
import { ImageIcon, Trash2, X } from "lucide-react";
import type { ChangeEvent } from "react";
import type { UseFormRegister } from "react-hook-form";



interface DirectionItemProps {
  directionField: {
      order: number;
      title: string;
      description: string;
      image: string | null;
  }
  register: UseFormRegister<RecipeFormValues>;
  watchedValues: RecipeFormValues;
  imageName: string | undefined;
  index: number;
  handleRemoveDirection: (index: number) => void;
  removeDirectionImage: (index: number) => void; 
  handleDirectionImageChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void
}

export default function DirectionItem({ directionField,register, watchedValues, index, handleRemoveDirection, removeDirectionImage, handleDirectionImageChange, imageName }: DirectionItemProps) {
  
  const directionFields = watchedValues.directions;
  
  return (
    <>
        <div key={directionField.order} className="bg-slate-50 rounded-xl p-3 space-y-3">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex  items-center justify-center font-semibold text-sm shrink-0">
              {index + 1}
            </div>
            <div className="w-full flex flex-col gap-4">
              <Label htmlFor="title" className="font-medium">
                Direction Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Spicy Chicken Wings"
                {...register(`directions.${index}.title`)}
                className="bg-white border-border/50 rounded-xl"
              />
              <Label htmlFor="title" className="font-medium">
                Direction Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder={`Step ${index + 1} instructions...`}
                {...register(`directions.${index}.description`)}
                rows={2}
                className="flex-1 border-border/50 rounded-xl resize-none text-sm bg-white"
              />
            </div>
            
              {/*{errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}*/}
            {directionFields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveDirection(index)}
                className="text-red-500 hover:text-red-600 h-8 w-8 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="ml-10">
            {watchedValues.directions[index]?.image ? (
              <div className="flex items-center gap-3 bg-white border border-border/50 rounded-xl p-2">
                <img
                  src={
                    watchedValues.directions[index]?.image ||
                    "/placeholder.svg"
                  }
                  alt={`Step ${index + 1}`}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <p className="flex-1 text-xs text-muted-foreground truncate">
                  {imageName || "Existing image"}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDirectionImage(index)}
                  className="text-red-500 hover:text-red-600 h-7 px-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <label className="cursor-pointer inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-orange-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleDirectionImageChange(index, e)}
                />
                <ImageIcon className="h-4 w-4" />
                <span>Add image (optional)</span>
              </label>
            )}
          </div>
        </div>
    </>
  );
}
