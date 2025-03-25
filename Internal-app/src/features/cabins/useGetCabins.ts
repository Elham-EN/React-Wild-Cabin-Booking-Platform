import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useGetCabins() {
  const { data: cabins, isPending } = useQuery({
    // This will identify the data, for query here, if later we use
    // query again on another page, with this exact key, then the data
    // would be read from the cache
    queryKey: ["cabins"],
    // Fetching the data from the API
    queryFn: getCabins,
  });

  return { isPending, cabins };
}
