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
    <div id="projects" className="w-full py-10 z-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-white">Projects</h2>
      {uploads?.jsonData?.length > 0 && (
        <AnimatedTestimonials testimonials={uploads.jsonData} />
      )}
    </div>
  );
}