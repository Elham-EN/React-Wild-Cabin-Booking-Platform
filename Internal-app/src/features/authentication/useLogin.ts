import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type LoginType = {
  email: string;
  password: string;
};

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginType) => login(email, password),
    onSuccess: (user) => {
      console.log("User Data", user);
      toast.success("User has been authenticated");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("The provided credentials are incorrect");
    },
  });
  return { loginMutate, isPending };
}
