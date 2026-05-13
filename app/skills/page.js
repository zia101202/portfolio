"use client";

import React ,{useState,useEffect} from "react";
import  {ThreeDCardDemo} from "@/components/ui/card"
import {NavbarDemo} from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import {LinkPreviewDemo} from  '@/components/ui/link'
import { SpotlightPreview } from "@/components/ui/spotlight";
const Page = () => {
   const [uploads, setUploads] = useState([]);
    
  
    useEffect(() => {
      fetch("/api/skills", { method: "GET" })
        .then((res) => res.json())
        .then((data) => setUploads(data.jsonData
        ));
    }, []);
    console.log(uploads);
  return (
    <div id="skills" className="w-full py-10 z-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-white">Skills</h2>
      <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-4 w-11/12 max-w-7xl mx-auto px-4">
        {uploads?.map((item, index) => (
          <ThreeDCardDemo key={index} title={item?.title} imageUrl={item?.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default Page;