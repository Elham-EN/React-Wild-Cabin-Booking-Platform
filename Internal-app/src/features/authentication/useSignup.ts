import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export type UserRegister = {
  fullname: string;
  email: string;
  password: string;
};

export function useSignup() {
  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: (user: UserRegister) => signUp(user),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verifiy the new account from the user's email address"
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signupMutate, isPending };
}
