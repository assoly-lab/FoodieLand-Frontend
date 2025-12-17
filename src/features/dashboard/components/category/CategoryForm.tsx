import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import type {
  CategoryFormProps,
  CategoryFormValues,
} from "@/types/shared/Category";
import { useCategory } from "@/hooks/useCategory";

type ImageState = {
  file: File | null;
  previewUrl: string | null;
  existingUrl: string | null;
};

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const { handleSubmitCategoryForm, handleCloseForm } = useCategory();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageStateRef = useRef<ImageState>({
    file: null,
    previewUrl: null,
    existingUrl: null,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues & { image: string | null }>({
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });
  const imagePreview = watch("image");
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        image: initialData.image?.url || null,
      });
      imageStateRef.current = {
        file: null,
        previewUrl: null,
        existingUrl: initialData.image?.url || null,
      };
    } else {
      reset({
        name: "",
        description: "",
        image: null,
      });
      imageStateRef.current = {
        file: null,
        previewUrl: null,
        existingUrl: null,
      };
    }
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      imageStateRef.current = {
        file,
        previewUrl,
        existingUrl: null,
      };
      setValue("image", previewUrl);
    }
  };

  const handleRemoveImage = () => {
    if (imageStateRef.current.previewUrl) {
      URL.revokeObjectURL(imageStateRef.current.previewUrl);
    }
    imageStateRef.current = {
      file: null,
      previewUrl: null,
      existingUrl: null,
    };
    setValue("image", null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const onFormSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (imageStateRef.current.file) {
      formData.append("image", imageStateRef.current.file);
    }
    if (initialData?._id) {
      formData.append("id", initialData._id);
    }
    handleSubmitCategoryForm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 font-inter">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground font-medium">
          Category Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="e.g., Desserts, Main Course"
          {...register("name", { required: "Category name is required" })}
          className="bg-white border-border/50 focus:border-cyan-500 focus:ring-cyan-500 rounded-xl"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground font-medium">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what types of recipes belong in this category..."
          {...register("description", { required: "Description is required" })}
          rows={3}
          className="bg-white border-border/50 focus:border-cyan-500 focus:ring-cyan-500 rounded-xl resize-none"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">Category Image</Label>
        <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center bg-white hover:border-cyan-500 transition-colors">
          {imagePreview ? (
            <div className="space-y-3">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-xl mx-auto"
              />
              <p className="text-sm text-muted-foreground truncate">
                {imageStateRef.current.file?.name || "Existing image"}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveImage}
                className="rounded-xl bg-transparent"
              >
                Remove
              </Button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-foreground font-medium">
                Click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 5MB
              </p>
            </label>
          )}
        </div>
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
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
