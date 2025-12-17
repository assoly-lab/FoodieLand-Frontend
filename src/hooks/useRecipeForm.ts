import type { Category } from "@/types/shared/Category";
import type { Recipe, RecipeFormValues, RecipeImageFiles } from "@/types/shared/Recipe";
import type { RefObject } from "react";
import type { UseFieldArrayRemove, UseFieldArrayUpdate, UseFormSetValue } from "react-hook-form";

export function useRecipeForm({
  imageFilesRef,
  setValue,
  mainImageInputRef,
  secondaryCategories,
  categories,
  watchedValues,
  updateIngredientSection,
  updateDirection,
  removeDirection,
  initialData,
  onSubmit

}: {
  imageFilesRef: RefObject<RecipeImageFiles>;
  setValue: UseFormSetValue<RecipeFormValues>;
  mainImageInputRef: RefObject<HTMLInputElement | null>;
  secondaryCategories: Category[];
  categories: Category[];
  watchedValues: RecipeFormValues;
  updateIngredientSection: UseFieldArrayUpdate<RecipeFormValues, "ingredients">,
  updateDirection: UseFieldArrayUpdate<RecipeFormValues, "directions">,
  removeDirection: UseFieldArrayRemove,
  initialData?: Recipe | null,
  onSubmit: (data: FormData) => Promise<void>
}) {
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      imageFilesRef.current.mainImage = file;
      imageFilesRef.current.mainImageExisting = null;
      setValue("mainImagePreview", previewUrl);
    }
  };

  const handleRemoveMainImage = (mainImagePreview: string) => {
    if (mainImagePreview && !imageFilesRef.current.mainImageExisting) {
      URL.revokeObjectURL(mainImagePreview);
    }
    imageFilesRef.current.mainImage = null;
    imageFilesRef.current.mainImageExisting = null;
    setValue("mainImagePreview", null);
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = "";
    }
  };

  const toggleSecondaryCategory = (categoryId: string) => {
    const current = secondaryCategories || [];
    if (current.find((c) => c._id === categoryId)) {
      setValue(
        "secondaryCategories",
        current.filter((c) => c._id !== categoryId),
      );
    } else {
      const existingCat = categories.find((c) => c._id === categoryId);
      setValue("secondaryCategories", [
        ...current,
        ...(existingCat ? [existingCat] : []),
      ]);
    }
  };

  const removeSecondaryCategory = (categoryId: string) => {
    setValue(
      "secondaryCategories",
      (secondaryCategories || []).filter((c) => c._id !== categoryId),
    );
  };

  const addIngredientItem = (sectionIndex: number) => {
    const section = watchedValues.ingredients[sectionIndex];
    updateIngredientSection(sectionIndex, {
      ...section,
      items: [...section.items, ""],
    });
  };

  const removeIngredientItem = (sectionIndex: number, itemIndex: number) => {
    const section = watchedValues.ingredients[sectionIndex];
    updateIngredientSection(sectionIndex, {
      ...section,
      items: section.items.filter((_, j) => j !== itemIndex),
    });
  };

  const updateIngredientItem = (
    sectionIndex: number,
    itemIndex: number,
    value: string,
  ) => {
    const section = watchedValues.ingredients[sectionIndex];
    updateIngredientSection(sectionIndex, {
      ...section,
      items: section.items.map((item, j) => (j === itemIndex ? value : item)),
    });
  };

  const updateIngredientSectionTitle = (
    sectionIndex: number,
    title: string,
  ) => {
    const section = watchedValues.ingredients[sectionIndex];
    updateIngredientSection(sectionIndex, { ...section, title });
  };

  const handleDirectionTextChange = (index: number, text: string) => {
    const direction = watchedValues.directions[index];
    updateDirection(index, { ...direction, title: text });
  };

  const handleDirectionImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      imageFilesRef.current.directionImages.set(index, file);
      imageFilesRef.current.directionImagesExisting.delete(index);
      const direction = watchedValues.directions[index];
      updateDirection(index, { ...direction, image: previewUrl });
    }
  };

  const removeDirectionImage = (index: number) => {
    const direction = watchedValues.directions[index];
    if (
      direction.image &&
      !imageFilesRef.current.directionImagesExisting.has(index)
    ) {
      URL.revokeObjectURL(direction.image);
    }
    imageFilesRef.current.directionImages.delete(index);
    imageFilesRef.current.directionImagesExisting.delete(index);
    updateDirection(index, { ...direction, image: null });
  };

  const handleRemoveDirection = (index: number) => {
    removeDirectionImage(index);
    removeDirection(index);

    const newDirImages = new Map<number, File>();
    const newDirImagesExisting = new Map<number, string>();

    imageFilesRef.current.directionImages.forEach((file, idx) => {
      if (idx > index) {
        newDirImages.set(idx - 1, file);
      } else if (idx < index) {
        newDirImages.set(idx, file);
      }
    });

    imageFilesRef.current.directionImagesExisting.forEach((url, idx) => {
      if (idx > index) {
        newDirImagesExisting.set(idx - 1, url);
      } else if (idx < index) {
        newDirImagesExisting.set(idx, url);
      }
    });

    imageFilesRef.current.directionImages = newDirImages;
    imageFilesRef.current.directionImagesExisting = newDirImagesExisting;
  };
  
  const onFormSubmit = async (data: RecipeFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const formData = new FormData()
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("mainCategory", JSON.stringify(data.mainCategory));
    formData.append("secondaryCategories", JSON.stringify(data.secondaryCategories));
    formData.append("prepTime", String(data.prepTime));
    formData.append("cookTime", String(data.cookTime));
    formData.append("isVegan", String(data.isVegan));
    formData.append("nutrition", JSON.stringify(data.nutrition));
    formData.append("ingredients", JSON.stringify(data.ingredients));
    if (imageFilesRef.current.mainImage) {
      formData.append("mainImage", imageFilesRef.current.mainImage);
    }
    const directionsData = data.directions.map((d, i) => ({
      order: i + 1,
      title: d.title,
      description: d.description,
      hasNewImage: imageFilesRef.current.directionImages.has(i),
      existingImageUrl: imageFilesRef.current.directionImagesExisting.get(i) || null,
    }));
    formData.append("directions", JSON.stringify(directionsData));
    imageFilesRef.current.directionImages.forEach((file, index) => {
      formData.append(`directionImage_${index + 1}`, file);
    });
    if (initialData?._id) {
      formData.append("id", initialData._id);
    }
    onSubmit(formData);
  }
  

  return {
    handleMainImageChange,
    handleRemoveMainImage,
    toggleSecondaryCategory,
    handleRemoveDirection,
    handleDirectionImageChange,
    updateIngredientSectionTitle,
    handleDirectionTextChange,
    removeSecondaryCategory,
    removeDirectionImage,
    updateIngredientItem,
    addIngredientItem,
    removeIngredientItem,
    onFormSubmit
  };
}
