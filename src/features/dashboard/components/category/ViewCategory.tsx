import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCategory } from "@/hooks/useCategory";
import { Pencil, Trash2 } from "lucide-react"



export default function ViewCategory () {
  const { selectedCategory, action, handleDeleteCategory, handleEditCategory, handleCloseViewCategory } = useCategory();
  return (
    <Dialog
      open={action === "view" && !!selectedCategory}
      onOpenChange={handleCloseViewCategory}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>View category information</DialogDescription>
        </DialogHeader>
        {selectedCategory && (
          <div className="space-y-4">
            {selectedCategory.image ? (
              <img
                src={selectedCategory.image.url || "/placeholder.svg"}
                alt={selectedCategory.name}
                className="w-full h-48 rounded-xl object-cover"
              />
            ) : (
              <div className="w-full h-48 rounded-xl bg-slate-200 flex items-center justify-center">
                <span className="text-4xl text-slate-400">No Image</span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {selectedCategory.name}
              </h3>
              <p className="text-muted-foreground mt-2">
                {selectedCategory.description || "No description provided"}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>
                Created:{" "}
                {new Date(selectedCategory.createdAt).toLocaleDateString()}
              </p>
              <p>
                Updated:{" "}
                {new Date(selectedCategory.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => handleEditCategory(selectedCategory)}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteCategory(selectedCategory)}
                variant="outline"
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50 rounded-xl gap-2 bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}