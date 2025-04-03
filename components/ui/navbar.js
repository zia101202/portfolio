import React from "react";
import { FloatingDock } from "@/lib/floatingDock";
import {
  IconBrandGithub,
  IconLock,
  IconDeviceLaptop,
  IconUserCode,
  IconTools,
  IconHome,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function NavbarDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-white dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Experience",
      icon: (
        <IconDeviceLaptop className="h-full w-full text-white dark:text-neutral-300" />
      ),
      href: "/experience",
    },
    {
      title: "Projects",
      icon: (
        <IconUserCode className="h-full w-full text-white dark:text-neutral-300" />
      ),
      href: "/projects",
    },
    {
      title: "Skills",
      icon: (
        <IconTools className="h-full w-full text-white dark:text-neutral-300" />
      ),
      href: "/skills",
    },
    {
      title: "Contact",
      icon: (
        <IconPhone className="h-full w-full text-white dark:text-neutral-300" />
      ),
      href: "/contact",
    },
    {
      title: "Private",
      icon: (
        <IconLock className="h-full w-full text-white " />
      ),
      href: "/private",
    },
  ];

  return (
    <div className=" flex items-center justify-center">
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
}




// "use client";
// import React, { useState } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "@/lib/navbar";
// import { cn } from "@/lib/utils";

// export function NavbarDemo() {
//   return (
//     <div className="relative w-full flex items-center justify-center">
//       <Navbar className="top-2" />
     
//     </div>
//   );
// }

// function Navbar({
//   className
// }) {
//   const [active, setActive] = useState(null);
//   return (
//     <div
//       className={cn("fixed top-10 inset-x-0 dark:text-white max-w-2xl mx-auto z-50 ", className)}>
//       <Menu setActive={setActive}>
//         <MenuItem setActive={setActive} active={active} item="Services">
//           <div className="flex flex-col space-y-4 text-sm ">
//             <HoveredLink href="/web-dev">Web Development</HoveredLink>
//             <HoveredLink href="/interface-design">Interface Design</HoveredLink>
//             <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
//             <HoveredLink href="/branding">Branding</HoveredLink>
//           </div>
//         </MenuItem>
//         <MenuItem setActive={setActive} active={active} item="Products">
//           <div className="  text-sm grid grid-cols-2 dark:text-white gap-10 p-4">
//             <ProductItem
//               title="Algochurn"
//               href="https://algochurn.com"
//               src="https://assets.aceternity.com/demos/algochurn.webp"
//               description="Prepare for tech interviews like never before." />
//             <ProductItem
//               title="Tailwind Master Kit"
//               href="https://tailwindmasterkit.com"
//               src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
//               description="Production ready Tailwind css components for your next project" />
//             <ProductItem
//               title="Moonbeam"
//               href="https://gomoonbeam.com"
//               src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
//               description="Never write from scratch again. Go from idea to blog in minutes." />
//             <ProductItem
//               title="Rogue"
//               href="https://userogue.com"
//               src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
//               description="Respond to government RFPs, RFIs and RFQs 10x faster using AI" />
//           </div>
//         </MenuItem>
//         <MenuItem setActive={setActive} active={active} item="Pricing">
//           <div className="flex flex-col  dark:text-white space-y-4 text-sm">
//             <HoveredLink href="/hobby">Hobby</HoveredLink>
//             <HoveredLink href="/individual">Individual</HoveredLink>
//             <HoveredLink href="/team">Team</HoveredLink>
//             <HoveredLink href="/enterprise">Enterprise</HoveredLink>
//           </div>
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }
