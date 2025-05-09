import React from "react";
import Image from "next/image";
import { Cabin } from "@/app/_types/Cabin";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface CabinCardProps {
  cabin: Cabin;
}

function CabinCard({ cabin }: CabinCardProps): React.ReactElement {
  return (
    <div className="flex border border-primary-800">
      <Image
        src={cabin.image}
        alt={cabin.name}
        width={300}
        height={300}
        className="flex-1 border-r border-primary-800"
      />
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {cabin.name}
          </h3>
          <div className="flex gap-3 items-center mb-2">
            <UserIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
              guests
            </p>
          </div>
          <p className="flex gap-3 justify-end items-baseline">
            {cabin.discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${cabin.regularPrice - cabin.discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${cabin.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${cabin.regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>
        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${cabin.id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block 
              hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
