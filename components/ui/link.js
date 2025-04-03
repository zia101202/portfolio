"use client";;
import React from "react";
import { LinkPreview } from "@/lib/previewLink";

export function LinkPreviewDemo({name,link}) {
  return (
    <div className="flex justify-center items-center flex-col px-4">
      <p
        className="text-white dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
        <LinkPreview url={link} className="">
  {name}
        </LinkPreview>
      
      </p>
    
    </div>
  );
}
