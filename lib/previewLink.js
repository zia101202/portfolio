"use client";;
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion"; // ✅ Fixed import from "motion/react" to "framer-motion"
import Link from "next/link";
import { cn } from "@/lib/utils";

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = ""
}) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });

  const handleMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      onOpenChange={setOpen}
    >
      <HoverCardPrimitive.Trigger asChild>
        <Link
          href={url}
          onMouseMove={handleMouseMove}
          className={cn("inline-block text-white dark:text-white", className)} // ✅ Made inline
        >
          {children}
        </Link>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 260, damping: 20 },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="shadow-xl rounded-xl"
              style={{ x: translateX }}
            >
              <Link
                href={url}
                className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                style={{ fontSize: 0 }}
              >
                <Image
                  src={isStatic ? imageSrc : src}
                  width={width}
                  height={height}
                  quality={quality}
                  priority={true} // ✅ Prioritize loading
                  className="rounded-lg"
                  alt="preview image"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};
