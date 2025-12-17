import type { Category } from "@/types/shared/Category";
import { Card, CardContent } from "../card";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useCategory } from "@/hooks/useCategory";



export default function DashboardCategoryCard({category}:{category: Category}) {
  
  const { handleViewCategory, handleEditCategory, handleDeleteCategory  } = useCategory();
  
  return (
    <Card
      key={category._id}
      className="bg-slate-50 border-0 shadow-sm overflow-hidden font-inter"
    >
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-4">
          {category.image ? (
            <img
              src={category.image.url || "/placeholder.svg"}
              alt={category.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
              <span className="text-2xl text-slate-400">?</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {category.description}
            </p>
          </div>
        </div>
        <div className="flex border-t border-border/40">
          <button
            onClick={() => handleViewCategory(category)}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-3 text-sm text-foreground hover:bg-slate-100 transition-colors"
          >
            <Eye className="h-4 w-4" />
            View
          </button>
          <div className="w-px bg-border/40" />
          <button
            onClick={() => handleEditCategory(category)}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-3 text-sm text-foreground hover:bg-slate-100 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <div className="w-px bg-border/40" />
          <button
            onClick={() => handleDeleteCategory(category)}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  )
}