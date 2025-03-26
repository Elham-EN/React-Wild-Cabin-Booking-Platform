import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCabinFormData } from "../../schemas/createCabinFormSchema";
import { duplicateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDuplicateCabin(cabin: CreateCabinFormData, cabinId: string) {
  const queryClient = useQueryClient();

  const { isPending, mutate: mutateDuplicateCabin } = useMutation({
    mutationFn: () => duplicateCabin(cabinId, cabin),
    onSuccess: () => {
      toast.success("Cabin has been duplicated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    isPending,
    mutateDuplicateCabin,
  };
}
