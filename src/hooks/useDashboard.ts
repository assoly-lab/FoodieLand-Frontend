import { setActiveSection, setIsSidebarOpen } from "@/store/dashboard/DashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks"



export function useDashboard() {
  
  const { activeSection, isSidebarOpen } = useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();
  
  const handleSetIsSidebar = async (val: boolean) => {
    dispatch(setIsSidebarOpen(val));
  }
  
  const handleSetActiveSection = async (val: "categories" | "recipes") => {
    dispatch(setActiveSection(val));
  }
  
  return {
    activeSection,
    isSidebarOpen,
    handleSetIsSidebar,
    handleSetActiveSection
  }
}