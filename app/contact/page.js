"use client";
import React,{useState,useEffect} from "react";
import { cn } from "@/lib/utils";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import {LinkPreviewDemo} from  '@/components/ui/link'
import {NavbarDemo} from "@/components/ui/navbar";
const page = () => {


    const [uploads, setUploads] = useState([]);

    
      useEffect(() => {
        fetch("/api/personal", { method: "GET" })
          .then((res) => res.json())
          .then((data) => setUploads(data.experiences));
         
      }, []);
  
  return (
  <div className="relative flex h-screen w-full items-center justify-center bg-[#000319] dark:bg-black">
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
  <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px] ">
        <div className="w-full flex flex-col items-center justify-center m-auto">
            <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
                

                <div className="min-w-[200px] max-h-[100px]  sm:flex flex-col items-center justify-start">
                   
                   
                    <p className="flex flex-row items-center justify-center my-[15px] cursor-pointer">
                       
                         
                        <a href={uploads[0]?.github || "#"}  className="cursor-pointer" target="_blank" rel="noopener noreferrer">  <RxGithubLogo className=" text-[46px]" /></a> 
                        <a href={uploads[0]?.github || "#"}  className="cursor-pointer" target="_blank" rel="noopener noreferrer">  <span className="text-[15px] cursor-pointer ml-[6px]"><LinkPreviewDemo name="Github"  link={uploads[0]?.github || "#"}/></span> </a> 
                    </p>
                   
                </div>
                <div className="min-w-[200px] max-h-[100px] sm:flex flex-col items-center justify-start">
                    
                 
                    <p className="flex flex-row items-center justify-center my-[15px] cursor-pointer">
                    
                         
                        <a href={uploads[0]?.linkedin || "#"} className="cursor-pointer" target="_blank" rel="noopener noreferrer">    <RxLinkedinLogo className=" text-[46px]"/></a> 
                        <a href={uploads[0]?.linkedin || "#"}  className="cursor-pointer" target="_blank" rel="noopener noreferrer"> <span className="text-[15px] cursor-pointer ml-[6px]"> <LinkPreviewDemo name="Linkedin"  link={uploads[0]?.linkedin || "#"}/></span>      </a>   
                    </p>
                </div>
                <div className="min-w-[200px] max-h-[100px] sm:flex flex-col items-center justify-center">
                 
                    <p className="flex flex-row items-center justify-center my-[15px] cursor-pointer">
                      <MdEmail className=" text-[46px]"/>
                        <span className="text-[15px] ml-[6px]">{uploads[0]?.email}</span>    
                    </p>
                </div>
                <div className="min-w-[200px] max-h-[100px] sm:flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center my-[15px] cursor-pointer">
            <span className="text-[15px] ml-[6px]">{uploads[0]?.whatsapp}</span> 
            <FaWhatsapp className=" text-[46px]" />

            </div>
            </div>
            </div>

          
            
        </div>
       
    </div>
  
  </div>
</div>



  )
}

export default page