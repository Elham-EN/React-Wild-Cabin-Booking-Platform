"use client";

import { useFormStatus } from "react-dom";

interface ButtonNameProps {
  buttonName: string;
  pendingLabel: string;
}

export default function FormButton({
  buttonName,
  pendingLabel,
}: ButtonNameProps): React.ReactElement {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto bg-accent-500 px-5 py-3 sm:px-8 sm:py-4 
              text-primary-800 font-semibold hover:bg-accent-600 transition-all 
               disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 
               rounded-sm text-center cursor-pointer"
    >
      {pending ? pendingLabel : buttonName}
    </button>
  );
}
