"use client";
import React, { ReactElement } from "react";
import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Cabin as CabinType } from "@/app/_types/Cabin";
import TextExpander from "@/app/_components/TextExpander";

interface CabinProps {
  cabin: CabinType;
}

/**
 * Cabin component displays detailed information about a specific cabin.
 *
 * This component is fully responsive with a mobile-first approach:
 * - Mobile: Stacked layout with the image on top, followed by content
 * - Tablet/Desktop: Grid layout with image on left and content on right
 *
 * @param {CabinProps} props - Component props containing cabin data
 * @returns {ReactElement} The rendered Cabin component
 */
function Cabin({ cabin }: CabinProps): ReactElement {
  return (
    <div
      className="flex flex-col md:grid md:grid-cols-[3fr_4fr] gap-6 md:gap-20 
        border border-primary-800 py-3 px-4 sm:px-6 md:px-10 mb-12 md:mb-24 overflow-hidden"
    >
      {/* 
        Image container
        - Mobile: Full width with fixed height and top position
        - Desktop: Scale effect with slight x-translation for visual interest
        - overflow-hidden on parent prevents scale effect from breaking layout
        
        Order classes control the stacking:
        - order-1 places the image first on mobile
        - order-none restores natural DOM order on desktop
      */}
      <div
        className="relative w-full h-64 sm:h-80 md:h-auto md:scale-[1.15] md:-translate-x-3 
        order-1 md:order-none mb-4 md:mb-0"
      >
        <Image
          src={cabin.image}
          alt={`Cabin ${cabin.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 42vw"
          priority
        />
      </div>

      {/* 
        Content container
        - Mobile: Appears below image (order-2)
        - Desktop: Restored to natural order
      */}
      <div className="order-2 md:order-none">
        {/* 
          Heading with distinctive styling
          - Mobile: Full width with smaller text and padding
          - Desktop: Oversized (150% width) with negative translation
            that extends the heading into the image column
          - Background color creates a "caption" effect that stands out
        */}
        <h3
          className="text-accent-100 font-black text-3xl sm:text-5xl md:text-7xl mb-3 md:mb-5 
            bg-primary-950 p-3 sm:p-4 md:p-6 pb-1 w-full md:w-[150%] md:translate-x-[-254px]"
        >
          Cabin {cabin.name}
        </h3>

        {/* 
          Description text
          - Uses TextExpander component to allow expanding long text
          - Font size increases on larger screens for better readability
          - Reduced bottom margin on mobile to save vertical space
        */}
        <p className="text-base sm:text-lg text-primary-300 mb-6 md:mb-10">
          <TextExpander>{cabin.description}</TextExpander>
        </p>

        {/* 
          Feature list with icons
          - Flex column keeps items stacked vertically
          - Reduced gap and margin on mobile for space efficiency
          - Each list item uses flex to align icon with text
        */}
        <ul className="flex flex-col gap-3 md:gap-4 mb-5 md:mb-7">
          {/* 
            Capacity information
            - Icon has flex-shrink-0 to prevent icon compression on narrow screens
            - Text size is responsive, larger on desktop
          */}
          <li className="flex gap-2 md:gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
              guests
            </span>
          </li>

          {/* Location information */}
          <li className="flex gap-2 md:gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>

          {/* Privacy information */}
          <li className="flex gap-2 md:gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
