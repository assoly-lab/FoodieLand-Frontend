import { Button } from "../ui/button";


export default function Categories() { 
  return (
    <section className="w-full py-12 px-4 md:py-8 md:px-8 lg:px-16 mb-16">
      <div className="flex justify-between font-inter">
        <h3 className="font-semibold text-5xl">Categories</h3>
        <Button className="bg-hero text-black font-semibold p-8! rounded-2xl text-lg cursor-pointer hover:bg-hero">View All Categories</Button>
      </div>
    </section>
  )
}