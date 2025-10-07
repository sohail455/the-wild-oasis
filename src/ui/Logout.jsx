import { HiOutlineArrowUpOnSquare } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useLogout } from "../features/authentication/useLogout";
function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      <HiOutlineArrowUpOnSquare />
    </ButtonIcon>
  );
}

export default Logout;
