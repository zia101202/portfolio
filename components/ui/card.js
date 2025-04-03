"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/lib/card";

export function ThreeDCardDemo({title,imageUrl}) {
 console.log(title);
  return (
    <>
     <CardContainer className="inter-var">
      <CardBody
        className=" max-w-[145px] max-h-[200px] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]   rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white">
       
          {title}
        </CardItem>
       
        <CardItem translateZ="400" className="  mt-4">
          <Image
          src={imageUrl}
            height="500"
            width="500"
            className="max-w-[100px] max-h-[120px] rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
      
      </CardBody>
    </CardContainer>
    </>
  );
}











