import Image from "next/image";
import React from "react";
import { signInAction } from "../_libs/actions";

function SignInButton(): React.ReactElement {
  return (
    <form action={signInAction}>
      <button
        className="flex justify-center items-center gap-6 text-lg border 
        cursor-pointer border-primary-300 px-10 py-4 font-medium"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span className="mt-1">Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
