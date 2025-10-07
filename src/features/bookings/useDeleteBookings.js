import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteApi } from "../../services/apiBookings";

export default function useDeleteBookings() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      toast.success("deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteBooking };
}
