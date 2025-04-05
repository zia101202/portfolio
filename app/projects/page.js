"use client";
import { useEffect, useState } from "react";
import { AnimatedTestimonials } from "@/lib/3d-card";
import {NavbarDemo} from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import { SpotlightPreview } from "@/components/ui/spotlight";
export default function page() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    fetch("/api/upload",
        {
            method: "GET",
            
          }
    ) // Fetch uploaded files
      .then((res) => res.json())
      .then((data) => setUploads(data));
  }, []);

  console.log(uploads);
  return (
  <>

   

<SpotlightPreview/>
 <div className="relative flex min-h-screen w-full items-center justify-center bg-[#000319] dark:bg-black">
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
  <NavbarDemo/>
         { uploads?.jsonData?.length>0 &&
   <AnimatedTestimonials testimonials={uploads.jsonData} />
          }
  </div>
</div>
       
  
  </>
  );
}