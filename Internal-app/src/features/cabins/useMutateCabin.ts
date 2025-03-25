import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCabinFormData } from "../../schemas/createCabinFormSchema";
import { createCabin, editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";

type ResetType = UseFormReset<CreateCabinFormData>;

export function useMutateCabin(
  isEditSession: boolean,
  cabinId: string | undefined,
  reset: ResetType
) {
  const queryClient = useQueryClient();
  const { mutate: mutateCabin, isPending } = useMutation({
    mutationFn: (data: CreateCabinFormData) => {
      if (isEditSession && cabinId) {
        return editCabin(cabinId, data);
      } else {
        return createCabin(data);
      }
    },
    onSuccess: (updatedData) => {
      toast.success(
        isEditSession ? "Cabin successfully updated" : "New cabin successfully created"
      );

      // Invalidate the query to refresh the cabins list
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      if (isEditSession) {
        // If it's an edit, reset the form with the updated values
        reset(updatedData);
      } else {
        // If it's a new cabin, just clear the form
        reset();
      }
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, mutateCabin };
}
