import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Cabin } from "@/app/_types/Cabin";
import { UserIcon } from "@heroicons/react/24/solid";

interface CabinCardProps {
  cabin: Cabin;
}

/**
 * CabinCard component displays a cabin with its image, details, and pricing.
 * It's responsive and adapts to different screen sizes.
 */
function CabinCard({ cabin }: CabinCardProps): React.ReactElement {
  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 rounded-sm overflow-hidden shadow-md">
      {/* Image container - full width on mobile, left column on tablet/desktop */}
      <div className="relative w-full sm:w-2/5 h-56 sm:h-auto">
        <Image
          src={cabin.image}
          alt={cabin.name}
          fill
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
          sizes="(max-width: 640px) 100vw, 40vw"
          priority
        />
      </div>
      
      {/* Content container - grows to fill remaining space */}
      <div className="flex flex-col justify-between w-full sm:w-3/5">
        {/* Top section with cabin info */}
        <div className="pt-4 sm:pt-5 pb-3 sm:pb-4 px-4 sm:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-xl sm:text-2xl mb-2 sm:mb-3">
            Cabin {cabin.name}
          </h3>
          
          <div className="flex gap-2 sm:gap-3 items-center mb-2">
            <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <p className="text-base sm:text-lg text-primary-200">
              For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
              guests
            </p>
          </div>
          
          {/* Price information - flex layout for alignment */}
          <p className="flex gap-2 sm:gap-3 justify-end items-baseline">
            {cabin.discount > 0 ? (
              <>
                <span className="text-2xl sm:text-3xl font-[350]">
                  ${cabin.regularPrice - cabin.discount}
                </span>
                <span className="line-through font-semibold text-primary-600 text-sm sm:text-base">
                  ${cabin.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl sm:text-3xl font-[350]">${cabin.regularPrice}</span>
            )}
            <span className="text-primary-200 text-sm sm:text-base">/ night</span>
          </p>
        </div>
        
        {/* Bottom section with button - full width on mobile */}
        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${cabin.id}`}
            className="w-full sm:w-auto block sm:inline-block text-center sm:text-right py-3 sm:py-4 px-4 sm:px-6
              sm:border-l sm:border-primary-800 hover:bg-accent-600 transition-all hover:text-primary-900"
            aria-label={`View details and make reservation for Cabin ${cabin.name}`}
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
