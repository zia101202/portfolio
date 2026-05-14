'use client'
import React, { useEffect, useState } from "react";
import { Timeline } from "@/lib/timeline";
import { NavbarDemo } from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import { SpotlightPreview } from "@/components/ui/spotlight";
export default function Page() {

  const [dataFetch, setFetched] = useState([]);


  useEffect(() => {
    fetch("/api/experience", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setFetched(data.experiences));

  }, []);


  console.log(dataFetch);
  const sortedData = [...(dataFetch || [])].sort((a, b) => {
    const dateA = new Date(a.startDate || 0);
    const dateB = new Date(b.startDate || 0);
    return dateB - dateA;
  });

  const timelineData = sortedData.map((item) => ({
    title: `${item?.startDate} - ${item?.endDate}`, // Correctly formats the date range in the title
    content: (
      <div 
        className="text-xs md:text-sm font-normal mb-8 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold"
        dangerouslySetInnerHTML={{ __html: item.description }} 
      />
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
    <div id="experience" className="w-full py-[10px] z-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-[10px] text-white">My Work Experience</h2>
      <Timeline data={timelineData} />
    </div>
  );
}
