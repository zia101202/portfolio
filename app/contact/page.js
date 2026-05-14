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
import { SpotlightPreview } from "@/components/ui/spotlight";
const Page = () => {


    const [uploads, setUploads] = useState([]);

    
      useEffect(() => {
        fetch(`/api/personal?t=${new Date().getTime()}`, { method: "GET", cache: "no-store" })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.experiences) {
              setUploads(data.experiences);
            }
          })
          .catch((err) => console.error("Error fetching personal data:", err));
      }, []);
  
  return (
    <div id="contact" className="w-full py-10 z-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-white">Contact</h2>
      <div className="w-full bg-transparent text-gray-200 p-[15px]">
        <div className="w-full flex flex-col items-center justify-center m-auto">
            <div className="w-full flex flex-row items-center justify-center gap-6 md:gap-12 flex-wrap">
                <div className="min-w-[150px] max-h-[100px] sm:flex flex-col items-center justify-start">
                    <p className="flex flex-row items-center justify-center my-[10px] cursor-pointer">
                        <a href={uploads[0]?.github || "#"} className="cursor-pointer" target="_blank" rel="noopener noreferrer">  <RxGithubLogo className="text-[40px]" /></a> 
                        <a href={uploads[0]?.github || "#"} className="cursor-pointer" target="_blank" rel="noopener noreferrer">  <span className="text-[15px] cursor-pointer ml-[6px]"><LinkPreviewDemo name="Github" link={uploads[0]?.github || "#"}/></span> </a> 
                    </p>
                </div>
                <div className="min-w-[150px] max-h-[100px] sm:flex flex-col items-center justify-start">
                    <p className="flex flex-row items-center justify-center my-[10px] cursor-pointer">
                        <a href={uploads[0]?.linkedin || "#"} className="cursor-pointer" target="_blank" rel="noopener noreferrer">    <RxLinkedinLogo className="text-[40px]"/></a> 
                        <a href={uploads[0]?.linkedin || "#"} className="cursor-pointer" target="_blank" rel="noopener noreferrer"> <span className="text-[15px] cursor-pointer ml-[6px]"> <LinkPreviewDemo name="Linkedin" link={uploads[0]?.linkedin || "#"}/></span>      </a>   
                    </p>
                </div>
                <div className="min-w-[150px] max-h-[100px] sm:flex flex-col items-center justify-center">
                    <p className="flex flex-row items-center justify-center my-[10px] cursor-pointer">
                      <MdEmail className="text-[40px]"/>
                        <span className="text-[15px] ml-[6px]">{uploads[0]?.email}</span>    
                    </p>
                </div>
                <div className="min-w-[150px] max-h-[100px] sm:flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center justify-center my-[10px] cursor-pointer">
                        <span className="text-[15px] ml-[6px]">{uploads[0]?.whatsapp}</span> 
                        <FaWhatsapp className="text-[40px]" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Page