import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory } from "@/hooks/useCategory";
import useRecipe from "@/hooks/useRecipe";
import type {
  RecipeFormProps,
  RecipeFormValues,
  RecipeImageFiles,
} from "@/types/shared/Recipe";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Controller, useFieldArray, useForm, type Path } from "react-hook-form";
import { defaultNutrition } from "../../constants/RecipeConstants";
import type { Category } from "@/types/shared/Category";
import { useRecipeForm } from "@/hooks/useRecipeForm";
import IngredientItems from "./IngredientItems";
import DirectionItem from "./DirectionItem";
import { Textarea } from "@/components/ui/textarea";

export default function RecipeForm({ initialData }: RecipeFormProps) {
  const imageFilesRef = useRef<RecipeImageFiles>({
    mainImage: null,
    mainImageExisting: null,
    directionImages: new Map(),
    directionImagesExisting: new Map(),
  });
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const { handleSubmitRecipeForm, handleCloseForm, selectedRecipe } =
    useRecipe();
  const { categories } = useCategory();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormValues>({
    defaultValues: {
      title: "",
      description:"",
      mainCategory: "",
      secondaryCategories: [],
      prepTime: 0,
      cookTime: 0,
      isVegan: false,
      mainImagePreview: null,
      nutrition: defaultNutrition,
      ingredients: [{ title: "Main Ingredients", items: [""] }],
      directions: [{ order: 1, title: "", description: "", image: null }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredientSection,
    remove: removeIngredientSection,
    update: updateIngredientSection,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: directionFields,
    append: appendDirection,
    remove: removeDirection,
    update: updateDirection,
  } = useFieldArray({
    control,
    name: "directions",
  });

  const watchedValues = watch();
  const mainCategory = watch("mainCategory");
  const secondaryCategories = watch("secondaryCategories");
  const mainImagePreview = watch("mainImagePreview");

  const {
    handleMainImageChange,
    handleRemoveMainImage,
    toggleSecondaryCategory,
    handleRemoveDirection,
    handleDirectionImageChange,
    removeSecondaryCategory,
    removeDirectionImage,
    removeIngredientItem,
    addIngredientItem,
    onFormSubmit,
  } = useRecipeForm({
    imageFilesRef,
    setValue,
    mainImageInputRef,
    secondaryCategories: secondaryCategories as Category[],
    categories: categories as Category[],
    watchedValues,
    updateIngredientSection,
    updateDirection,
    removeDirection,
    initialData,
    onSubmit: handleSubmitRecipeForm,
  });

  useEffect(() => {
    if (selectedRecipe && selectedRecipe._id) {
      imageFilesRef.current = {
        mainImage: null,
        mainImageExisting: selectedRecipe.mainImage?.url || null,
        directionImages: new Map(),
        directionImagesExisting: new Map(),
      };

      selectedRecipe.directions.forEach((dir, idx) => {
        if (dir.image?.url) {
          imageFilesRef.current.directionImagesExisting.set(idx, dir.image.url);
        }
      });

      reset({
        title: selectedRecipe.title,
        description: selectedRecipe.description,
        mainCategory: selectedRecipe.mainCategory as Category,
        secondaryCategories: selectedRecipe.secondaryCategories,
        prepTime: selectedRecipe.prepTime,
        cookTime: selectedRecipe.cookTime,
        isVegan: selectedRecipe.isVegan,
        mainImagePreview: selectedRecipe.mainImage?.url || null,
        nutrition: selectedRecipe.nutrition,
        ingredients: selectedRecipe.ingredients,
        directions: selectedRecipe.directions.map((d) => ({
          order: d.order,
          title: d.title,
          description: d.description,
          image: d.image?.url || null,
        })),
      });
    } else {
      imageFilesRef.current = {
        mainImage: null,
        mainImageExisting: null,
        directionImages: new Map(),
        directionImagesExisting: new Map(),
      };
      reset({
        title: "",
        description: "",
        mainCategory: "",
        secondaryCategories: [],
        prepTime: 0,
        cookTime: 0,
        isVegan: false,
        mainImagePreview: null,
        nutrition: defaultNutrition,
        ingredients: [{ title: "Main Ingredients", items: [""] }],
        directions: [{ order: 1, title: "", description: "", image: null }],
      });
    }
  }, []);

  const availableSecondaryCategories = categories?.filter(
    (cat) => cat._id !== (mainCategory as Category)._id,
  );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 font-inter">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="font-medium">
            Recipe Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Spicy Chicken Wings"
            {...register("title", { required: "Recipe title is required" })}
            className="bg-white border-border/50 rounded-xl"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="A brief description of your recipe..."
            {...register("description")}
            className="bg-white border-border/50 rounded-xl min-h-20 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-medium">
              Main Category <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="mainCategory"
              control={control}
              rules={{ required: "Main category is required" }}
              render={({ field }) => {
                console.log(field.value);
                const value =
                  typeof field.value === "object"
                    ? field.value._id
                    : field.value;
                return (
                  <Select
                    value={value}
                    onValueChange={(e) => {
                      if (e.trim().length > 0) {
                        field.onChange(e);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white border-border/50 rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.mainCategory && (
              <p className="text-sm text-red-500">
                {errors.mainCategory.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Secondary Categories</Label>
            <Select
              value=""
              onValueChange={(value) => toggleSecondaryCategory(value)}
            >
              <SelectTrigger className="bg-white border-border/50 rounded-xl">
                <SelectValue
                  placeholder={
                    secondaryCategories.length > 0
                      ? `${secondaryCategories.length} selected`
                      : "Select categories"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableSecondaryCategories?.map((cat) => (
                  <SelectItem
                    key={cat._id}
                    value={cat._id}
                    className={
                      (secondaryCategories as Category[]).find(
                        (c) => c._id === cat._id,
                      )
                        ? "bg-cyan-50"
                        : ""
                    }
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          (secondaryCategories as Category[]).find(
                            (c) => c._id === cat._id,
                          )
                            ? "bg-cyan-500 border-cyan-500"
                            : "border-gray-300"
                        }`}
                      >
                        {(secondaryCategories as Category[]).find(
                          (c) => c._id === cat._id,
                        ) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {secondaryCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {(secondaryCategories as Category[]).map((cat) => {
                  const existingCat = categories?.find(
                    (c) => c._id === cat._id,
                  );
                  return existingCat ? (
                    <span
                      key={cat._id}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-700 rounded-lg"
                    >
                      {cat.name}
                      <button
                        type="button"
                        onClick={() => removeSecondaryCategory(cat._id)}
                        className="hover:text-cyan-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prepTime" className="font-medium">
              Prep Time (min) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="prepTime"
              type="number"
              min={0}
              {...register("prepTime", {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
              className="bg-white border-border/50 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cookTime" className="font-medium">
              Cook Time (min) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cookTime"
              type="number"
              min={0}
              {...register("cookTime", {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
              className="bg-white border-border/50 rounded-xl"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="font-medium">Main Image</Label>
          <div className="border-2 border-dashed border-border/50 rounded-xl p-4 text-center bg-white hover:border-orange-500 transition-colors">
            {mainImagePreview ? (
              <div className="flex items-center gap-4">
                <img
                  src={mainImagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1 text-left">
                  <p className="text-sm text-muted-foreground truncate">
                    {imageFilesRef.current.mainImage?.name || "Existing image"}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveMainImage(mainImagePreview)}
                  className="rounded-xl bg-transparent"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <label className="cursor-pointer block py-2">
                <input
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageChange}
                />
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm text-foreground">Click to upload</p>
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Label className="font-medium">Nutrition Information</Label>
        <div className="grid grid-cols-5 gap-2">
          {[
            { key: "calories", label: "Cal" },
            { key: "carbohydrate", label: "Carbs" },
            { key: "cholesterol", label: "Chol" },
            { key: "protein", label: "Protein" },
            { key: "totalFat", label: "Fat" },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <Label className="text-xs">{label}</Label>
              <Input
                type="number"
                min={0}
                placeholder="0"
                {...register(`nutrition.${key}` as Path<RecipeFormValues>, {
                  valueAsNumber: true,
                  min: 0,
                })}
                className="bg-white border-border/50 rounded-xl text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-medium">Ingredients</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => appendIngredientSection({ title: "", items: [""] })}
            className="text-orange-600 h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Section
          </Button>
        </div>

        {ingredientFields.map((field, index) => (
          <div key={field.id} className="bg-slate-50 rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Section title"
                {...register(`ingredients.${index}.title`)}
                className="flex-1 border-border/50 rounded-xl text-sm"
              />
              {ingredientFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredientSection(index)}
                  className="text-red-500 hover:text-red-600 h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <IngredientItems
              sectionIndex={index}
              register={register}
              watchedValues={watchedValues}
              addIngredientItem={addIngredientItem}
              removeIngredientItem={removeIngredientItem}
            />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-medium">Directions</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              appendDirection({
                order: directionFields.length + 1,
                title: "",
                description: "",
                image: null,
              })
            }
            className="text-orange-600 h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Step
          </Button>
        </div>
        {directionFields.map((field, index) => {
          return (
            <DirectionItem
              key={field.id}
              handleDirectionImageChange={handleDirectionImageChange}
              handleRemoveDirection={handleRemoveDirection}
              register={register}
              removeDirectionImage={removeDirectionImage}
              watchedValues={watchedValues}
              imageName={imageFilesRef.current.directionImages.get(index)?.name}
              index={index}
              directionField={field}
            />
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleCloseForm}
          className="flex-1 rounded-xl bg-transparent"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
