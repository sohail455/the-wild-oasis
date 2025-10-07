import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading: isCreated } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("account created sucessfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signup, isCreated };
}
