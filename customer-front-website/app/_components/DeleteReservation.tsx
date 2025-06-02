"use client";

import React, { useTransition } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_libs/actions";
import SpinnerMini from "./SpinnerMini";

interface DeleteReservationProps {
  bookingId: string;
}

function DeleteReservation({ bookingId }: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete this reservation with id ${bookingId}`
      )
    ) {
      startTransition(() => {
        deleteReservation(bookingId);
      });
    }
  };

  return (
    <button
      className="group flex items-center justify-center w-full h-full gap-2 text-xs 
        font-bold text-primary-300 px-3 py-3 sm:py-0 hover:bg-accent-600 
        transition-colors hover:text-primary-900 cursor-pointer"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          {" "}
          <TrashIcon
            className="h-5 w-5 text-primary-600 
        group-hover:text-primary-800 transition-colors"
          />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
