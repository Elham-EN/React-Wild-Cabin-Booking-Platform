import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, UpdateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUserMutate } = useMutation({
    mutationFn: (userData: UpdateUserData) => updateUser(userData),
    onSuccess: ({ user }) => {
      toast.success("Your account has been updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: () => {
      toast.error("Failed to update your account!");
    },
  });

  return { isUpdating, updateUserMutate };
}
