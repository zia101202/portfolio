"use client";
import { useEffect, useState } from "react";
import { AnimatedTestimonials } from "@/lib/3d-card";
export default function GetProject() {
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
         { uploads?.jsonData?.length>0 &&
   <AnimatedTestimonials testimonials={uploads.jsonData} />
          }
       
  
  </>
  );
}
