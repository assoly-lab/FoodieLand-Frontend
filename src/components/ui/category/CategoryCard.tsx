import type { Category } from "@/types/shared/Category";

export default function CategoryCard({ category, className }:{category: Category, className?: string}){
  return (
    <div className={className + " flex flex-col justify-end items-center gap-4 rounded-2xl relative w-[180px] h-[152px] mt-12 pb-6"}>
      <img src={category.image.url} className="w-[100px] h-[100px] object-cover absolute left-1/2 -top-8 -translate-x-1/2 " />
      <p className="font-inter font-semibold">{ category.name }</p>
    </div>
  )
}