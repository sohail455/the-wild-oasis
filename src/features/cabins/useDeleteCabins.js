import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteApi } from "../../services/apiCabins";

export default function useDeleteCabins() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      toast.success("deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin };
}
