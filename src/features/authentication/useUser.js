import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
