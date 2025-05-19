import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import image1 from "@/public/about-1.jpg";
import { getCabins } from "../_libs/api-service";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About",
};

/**
 * About page that showcases information about The Wild Oasis.
 * This page is fully responsive across all device sizes.
 */
export default async function Page(): Promise<React.ReactElement> {
  const cabins = await getCabins();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10 lg:gap-x-24 lg:gap-y-32 text-base sm:text-lg items-center px-4 sm:px-6 md:px-0">
      {/* First section - Introduction */}
      <div className="col-span-1 lg:col-span-3 order-2 md:order-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p className="hidden sm:block">
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>
      
      {/* First image */}
      <div className="col-span-1 lg:col-span-2 order-1 md:order-2 mb-6 md:mb-0">
        <div className="relative w-full h-full rounded-sm overflow-hidden">
          <Image
            src={image1}
            alt="Family sitting around a fire pit in front of cabin"
            placeholder="blur"
            quality={80}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Second image */}
      <div className="relative aspect-square col-span-1 lg:col-span-2 order-3 mb-6 md:mb-0">
        <div className="relative w-full h-full rounded-sm overflow-hidden">
          <Image
            src={"/about-2.jpg"}
            fill
            className="object-cover"
            alt="Family that manages The Wild Oasis"
          />
        </div>
      </div>
      
      {/* Second section - Family history */}
      <div className="col-span-1 lg:col-span-3 order-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div className="pt-2 sm:pt-4">
            <Link
              href="/cabins"
              className="inline-block mt-2 sm:mt-4 bg-accent-500 px-6 sm:px-8 py-3 sm:py-5 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all rounded-sm"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
