import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCategory } from "@/hooks/useCategory";
import ViewCategory from "@/features/dashboard/components/category/ViewCategory";
import DashboardCategoryCard from "@/components/ui/dashboard/DashboardCategoryCard";
import EditCategory from "@/features/dashboard/components/category/EditCategory";
import CategoryDeleteDialog from "./CategoryDeleteDialog";

export default function CategoriesSection() {
  const { categories, handleCreateCategory } = useCategory();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 font-inter">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Categories
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your recipe categories
          </p>
        </div>
        <Button
          onClick={handleCreateCategory}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Category</span>
        </Button>
      </div>

      {categories?.length === 0 ? (
        <Card className="border-dashed font-inter">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No categories yet</p>
            <Button
              onClick={handleCreateCategory}
              variant="outline"
              className="rounded-xl gap-2 bg-transparent"
            >
              <Plus className="h-4 w-4" />
              Create your first category
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => (
            <DashboardCategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
      <ViewCategory />
      <EditCategory />
      <CategoryDeleteDialog />
    </div>
  );
}
