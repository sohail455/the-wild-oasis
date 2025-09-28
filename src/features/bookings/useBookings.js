import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  //1)filtering
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //2)Sorting
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, value] = sortBy.split("-");
  console.log(field, value);
  const sorting = { field: field, value: value };
  //3)Pagination
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sorting, page],
    queryFn: () => getBookings({ filter, sorting, page }),
  });
  const pages = Math.ceil(count / PAGE_SIZE);
  if (page < pages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sorting, page + 1],
      queryFn: () => getBookings({ filter, sorting, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sorting, page - 1],
      queryFn: () => getBookings({ filter, sorting, page: page - 1 }),
    });

  return { bookings, error, isLoading, count };
}
