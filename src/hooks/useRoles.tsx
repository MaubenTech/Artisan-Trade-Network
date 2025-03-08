import useAppSelector from "./useAppSelector";
import { selectCurrentUser } from "@store/authSlice";

const useRoles = () => {
	const currentUser = useAppSelector(selectCurrentUser);
	if (!currentUser) throw new Error("User must be logged in before accessing this hook!");
	return {
		isUser: currentUser.roles.includes("user"),
		isRegularUser: currentUser.roles.includes("user") && currentUser.roles.length === 1,
		isArtisan: currentUser.roles.includes("artisan"),
		isAdmin: currentUser.roles.includes("admin"),
	};
};

export default useRoles;
