import { useCategory } from "@/hooks/useCategory";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/category/CategoryCard";
import { CategoriesBgs } from "@/features/home/constants/CategoriesBgs";
import { useNavigate } from "react-router";

export default function Categories() { 
  const { categories } = useCategory();
  const navigate = useNavigate();
  return (
    <section className="w-full py-12 px-4 md:py-8 md:px-8 lg:px-16 mb-16">
      <div className="flex justify-between font-inter">
        <h3 className="font-semibold text-3xl md:text-4xl lg:text-5xl">Categories</h3>
        <Button 
          className="bg-hero text-black font-semibold p-6! md:text-base md:p-7! lg:p-8! rounded-2xl lg:text-base cursor-pointer hover:bg-hero"
          onClick={() => navigate("/categories")}
        >View All Categories</Button>
      </div>
      <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-6">
        {
          categories?.length  ?
          categories.slice(0,6).map((category, index) => {
            return (
              <CategoryCard key={category._id} category={category} className={CategoriesBgs[index]}  />
            )
          })
          :
          <h3>
            No Categories Added Yet
          </h3>
        }
      </div>
    </section>
  )
}