import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandpickedBadge } from "@/components/ui/HandpickedBadge";
import HotIcon from "@/components/ui/icons/Hot";
import TimerIcon from "@/components/ui/icons/Timer";
import ForkKnifeIcon from "@/components/ui/icons/ForkKnife";
import { useNavigate } from "react-router";
import AuthorAvatar from "@/components/ui/AuthorAvatar";

export default function Hero() {
  
  const navigate = useNavigate();
  
  return (
    <section className="w-full py-12 px-4 md:py-8 md:px-8 lg:px-16 mb-16">
      <div className="relative grid grid-cols-1 rounded-4xl lg:grid-cols-2 items-center md:min-h-[600px]">
        <HandpickedBadge className="hidden absolute right-1/2 translate-x-1/2 z-50 top-10 lg:block" />
        <div className="flex flex-col justify-center h-full bg-hero gap-6 md:gap-12 px-8 rounded-b-4xl lg:rounded-l-4xl lg:rounded-br-none order-2 md:order-2 lg:order-1 py-8 lg:py-0">
          <div className="flex items-center gap-2 w-fit bg-white px-3 py-2 rounded-full">
            <HotIcon />
            <span className="text-sm font-medium text-foreground font-inter">
              Hot Recipes
            </span>
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance font-inter">
              Spicy delicious chicken wings
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-inter">
              Lorem ipsum dolor sit amet, consectetulpisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad
              minim
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 font-inter">
            <div className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2">
              <TimerIcon />
              <span className="text-sm font-medium text-gray-600">
                30 Minutes
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2">
              <ForkKnifeIcon />
              <span className="text-sm font-medium text-gray-600">Chicken</span>
            </div>
          </div>

          <div className=" w-full flex flex-col md:flex-row gap-4 justify-between pr-4">
            <div className="flex items-center gap-3 pt-2 font-inter">
              <AuthorAvatar />
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-black text-base">John Smith</p>
                <p className="text-sm font-semibold text-gray-600">
                  15 March 2022
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground text-sm px-12! py-8 rounded-lg cursor-pointer font-medium hover:opacity-90 transition-opacity flex items-center gap-4 font-inter"
                onClick={() => navigate("/recipes")}
              >
                View Recipes
                <Play className="w-5! h-5!  bg-white text-black fill-black rounded-full p-1" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex h-full order-1 md:order-1 lg:order-2">
          <div className="relative">
            <img
              src="/hero.avif"
              alt="Spicy delicious chicken wings on a decorative plate"
              className="w-full h-full rounded-t-4xl lg:rounded-r-4xl lg:rounded-t-none object-cover object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
