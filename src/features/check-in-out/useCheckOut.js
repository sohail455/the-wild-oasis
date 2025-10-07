import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`booking ${data.id} has been checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Error has been happened while updating the booking");
    },
  });
  return { checkOut, isCheckingOut };
}
