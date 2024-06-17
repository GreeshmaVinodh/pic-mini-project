import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useSearchUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	// const [user, setUser] = useState(null);
const {userProfile,setUserProfile}=useUserProfileStore()
	const showToast = useShowToast();

	const getUserProfile = async (username) => {
		setIsLoading(true);
		setUserProfile(null);
		try {
			const q = query(collection(firestore, "users"), where("username", "==", username));

			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) return showToast("Error", "User not found", "error");

			querySnapshot.forEach((doc) => {
				setUserProfile(doc.data());
			});
		} catch (error) {
			showToast("Error", error.message, "error");
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getUserProfile, userProfile};
};

export default useSearchUser;