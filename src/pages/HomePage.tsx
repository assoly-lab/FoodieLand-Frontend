import Hero from "@/features/home/components/Hero"
import { Navbar } from "@/components/shared/Navbar"
import Categories from "@/features/home/components/Categories"
import { useCategory } from "@/hooks/useCategory";
import { useEffect } from "react";
import Footer from "@/components/shared/Footer";
import HighlightedRecipes from "@/features/home/components/Recipes";
import useRecipe from "@/hooks/useRecipe";


export default function HomePage(){
  const { handleLoadCategories } = useCategory();
  const { handleLoadRecipes } = useRecipe();
  
  useEffect(() =>{
    Promise.all([handleLoadRecipes(), handleLoadCategories()]);
  },[])
  
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <HighlightedRecipes />
      <Footer />
    </>
  )
}