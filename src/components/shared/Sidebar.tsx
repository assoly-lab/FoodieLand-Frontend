import { useCategory } from "@/hooks/useCategory"
import { useDashboard } from "@/hooks/useDashboard";
import useRecipe from "@/hooks/useRecipe";
import { FolderOpen, UtensilsCrossed } from "lucide-react"

export default function Sidebar() {
  
  const { categories } = useCategory();
  const { recipes } = useRecipe();
  const { isSidebarOpen, activeSection, handleSetActiveSection, handleSetIsSidebar } = useDashboard();
  
  return (
    <aside
       className={`
         fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-50 border-r border-border/40 
         transform transition-transform duration-200 ease-in-out font-inter
         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
         lg:translate-x-0 pt-[73px] lg:pt-0
       `}
     >
       <div className="p-4">
         <h2 className="text-lg font-semibold text-foreground mb-4">Dashboard</h2>
         <nav className="space-y-2">
           <button
             onClick={() => {
               handleSetActiveSection("categories")
               handleSetIsSidebar(false)
             }}
             className={`
               w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer
               ${activeSection === "categories" ? "bg-orange-500 text-white" : "text-foreground hover:bg-orange-50"}
             `}
           >
             <FolderOpen className="h-5 w-5" />
             <span className="font-medium">Categories</span>
             <span
               className={`ml-auto text-sm ${activeSection === "categories" ? "bg-white/20" : "bg-slate-200"} px-2 py-0.5 rounded-full`}
             >
               {categories?.length ?? 0}
             </span>
           </button>
           <button
             onClick={() => {
               handleSetActiveSection("recipes")
               handleSetIsSidebar(false)
             }}
             className={`
               w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer
               ${activeSection === "recipes" ? "bg-orange-500 text-white" : "text-foreground hover:bg-orange-50"}
             `}
           >
             <UtensilsCrossed className="h-5 w-5" />
             <span className="font-medium">Recipes</span>
             <span
               className={`ml-auto text-sm ${activeSection === "recipes" ? "bg-white/20" : "bg-slate-200"} px-2 py-0.5 rounded-full`}
             >
               {recipes?.length ?? 0}
             </span>
           </button>
         </nav>
       </div>
     </aside>
  )
}