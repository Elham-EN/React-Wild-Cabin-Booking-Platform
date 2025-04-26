import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { User } from "@supabase/supabase-js";

export function useGetUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const user = data as User;
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
