"use client";

import React ,{useState,useEffect} from "react";
import  {ThreeDCardDemo} from "@/components/ui/card"
import {NavbarDemo} from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import {LinkPreviewDemo} from  '@/components/ui/link'
import { SpotlightPreview } from "@/components/ui/spotlight";
const page = () => {
   const [uploads, setUploads] = useState([]);
    
  
    useEffect(() => {
      fetch("/api/skills", { method: "GET" })
        .then((res) => res.json())
        .then((data) => setUploads(data.jsonData
        ));
    }, []);
    console.log(uploads);
  return (
  <>


<SpotlightPreview/>
 <div className="relative min-h-screen flex h-full min-w-screen items-center justify-center bg-[#000319] dark:bg-black">
  {/* Grid Background - Moves Behind Everything */}
  <div
    className={cn(
      "absolute inset-0 z-10", // Push background behind
      "[background-size:80px_80px]",
      "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
      "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
    )}
    style={{ opacity: 0.11 }} // Reduced opacity
  />

 
  <div className="relative z-20">
  <div>
        <NavbarDemo/>
        
  <div className="grid lg:grid-cols-8  md:grid-cols-5 sm:grid-cols-4 grid-cols-2  gap-8 w-full">
  {uploads?.map((item) => (

<ThreeDCardDemo  title={item?.title} imageUrl={item?.imageUrl}/>

  ))}
</div>
        </div>
  </div>
</div>



  </>
  );
};

export default page;