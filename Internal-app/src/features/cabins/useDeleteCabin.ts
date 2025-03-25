import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

/**
 * 
 * The main reasons to create a custom hook, even for single-component use, include:
    - Separating concerns - extracting complex logic from your component
    - Improving readability - making your component code cleaner
    - Testing - isolating logic makes it easier to test independently
    - Future maintainability - easier to modify separate pieces of logic
 */

export function useDeleteCabin() {
  // Access Query Client
  const queryClient = useQueryClient();

  // Delete cabin data on the server
  const { isPending: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: (id: string) => deleteCabinAPI(id),
    // Tell react query what to do after, as soons as the mutation was a success
    // Need to refetch data, by invaliding the cache.
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      // After performing a mutation, invalidating relevant queries allows the
      // UI to reflect these changes immediately.
      queryClient.invalidateQueries({
        // which exact query / data to be invalidated
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabinMutate };
}
