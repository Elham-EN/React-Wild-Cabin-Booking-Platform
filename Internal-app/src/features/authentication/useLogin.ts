import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type LoginType = {
  email: string;
  password: string;
};

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginType) => login(email, password),
    onSuccess: (user) => {
      toast.success("User has been authenticated");
      // store this returned user data from server into React Query's cache
      // Components don't need to refetch this user data from server.
      // The user sees their login state change immediately ithout needing
      // additional network requests.
      queryClient.setQueriesData({ queryKey: ["user"] }, user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("The provided credentials are incorrect");
    },
  });
  return { loginMutate, isPending };
}
