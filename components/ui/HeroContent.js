"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
const HeroContent = () => {

  const typedElement = useRef(null); // Reference to span element
  const typedInstance = useRef(null); // Store the instance

  useEffect(() => {
    typedInstance.current = new Typed(typedElement.current, {
      strings: ["Hello, My Name IS Zia ur Rehman!","I am Software Engineer"],
      typeSpeed: 70,
      backSpeed: 30,
      
    });

    return () => {
      // Destroy instance on component unmount
      typedInstance.current.destroy();
    };
  }, []);
  return (
    <>
    <motion.div
      initial="hidden"
      animate="visible"
      className="md:flex flex-row  sm:px-20 px-5 w-full z-[20] my-[100px] space-y-[110px]"
    >
      <div className=" w-full flex justify-center items-center   ">
      
<div className="flex justify-center items-center">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col max-h-[40px] justify-center items-center w-full  text-[34px]  text-white  "
        >
      <p className="text-white md:text-[28px] text-[22px]">Full stack Mern Developer</p>
          
           
            <span className="text-transparent md:text-[35px] text-[26px] font-medium mt-[40px] bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        
              <span ref={typedElement} />
            </span>
       
        </motion.div>
        </div>
</div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={500}
          width={500}
          className="min-w-[300px] min-h-[300px]"
        />
      </motion.div>

      
   
    </motion.div>
    


    </>
  );
};

export default HeroContent;
