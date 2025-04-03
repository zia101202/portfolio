"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { SpotlightPreview } from "./spotlight";
import {NavbarDemo} from "./navbar";
import HeroContent from "./HeroContent";

export function GridBackgroundDemo() {
  return (
    <>
    
    <SpotlightPreview/>

    <div className="relative  min-h-screen   bg-[#000319] dark:bg-black">

  <div
    className={cn(
      "absolute inset-0 z-10", 
      "[background-size:80px_80px]",
      "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
      "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
    )}
    style={{ opacity: 0.11 }} 
  />

 
  <div className="relative z-20">
    <NavbarDemo />
    <HeroContent />
  
  </div>
</div>




   
          
        
    </>
  );
}
