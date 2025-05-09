import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

function DeleteReservation() {
  return (
    <button
      className="group flex items-center flex-grow gap-2 text-xs 
        font-bold text-primary-300 px-3 hover:bg-accent-600 
        transition-colors hover:text-primary-900 cursor-pointer"
    >
      <TrashIcon
        className="h-5 w-5 text-primary-600 
        group-hover:text-primary-800 transition-colors"
      />
      <span>Delete</span>
    </button>
  );
}

export default DeleteReservation;
