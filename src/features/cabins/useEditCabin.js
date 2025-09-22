import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEdited, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, EditId }) => createCabin(newCabin, EditId),
    onSuccess: () => {
      toast.success("Cabin Eddited succeessfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEdited, editCabin };
}
