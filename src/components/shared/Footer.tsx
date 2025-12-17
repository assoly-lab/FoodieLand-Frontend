import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer(){
  return (
    <section className="mx-auto w-[90%] px-4 py-8 md:px-8  border-t border-gray-300">
      <div className="w-full flex flex-col gap-4 justify-between items-center lg:flex-row">
        <p className="font-inter flex-1 text-center">&copy; 2020 Flowbase. Powered by <span className="text-orange-500">Webflow</span></p>
        <div className="flex gap-4 justify-self-center lg:justify-self-end">
          <Facebook className="fill-black stroke-0" />
          <Twitter className="stroke-0 fill-black" />
          <Instagram />
        </div>
      </div>
    </section>
  )
}