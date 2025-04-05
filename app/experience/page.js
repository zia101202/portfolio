'use client'
import React,{useEffect,useState} from "react";
import { Timeline } from "@/lib/timeline";
import {NavbarDemo} from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import { SpotlightPreview } from "@/components/ui/spotlight";
export default function page() {

 const [dataFetch, setFetched] = useState([]);
 

  useEffect(() => {
    fetch("/api/experience", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setFetched(data.experiences));

  }, []);


console.log(dataFetch);
const timelineData = dataFetch?.map((item) => ({
  title: `${item?.startDate} - ${item?.endDate}`, // Correctly formats the date range in the title
  content: (
    <div>
      <p className="text-xs md:text-sm font-normal mb-8">
      <div dangerouslySetInnerHTML={{ __html: item.description }} />

      </p>
    </div>
  ),
}));


  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p
            className=" text-xs md:text-sm font-normal mb-8">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
        
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p
            className=" text-xs md:text-sm font-normal mb-8">
           Writing markup with JSX 
The markup syntax you’ve seen above is called JSX. It is optional, but most React projects use JSX for its convenience. All of the tools we recommend for local development support JSX out of the box.

JSX is stricter than HTML. You have to close tags like <br />. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a <div>...</div> or an empty <>...</> wrapper:
          </p>
        
        </div>
      ),
    },
   
  ];
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
    <div className="w-full">
      <Timeline data={timelineData} />
    </div>
  </div>
</div>
   
    </>
  );
}
