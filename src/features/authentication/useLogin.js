import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function useLogin() {
  const querClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      querClient.setQueryData(["user"], data.user);
      navigate("/", { replace: true });
      toast.success("logged in sucessfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isLoading };
}
