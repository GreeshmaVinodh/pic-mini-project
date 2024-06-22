import CreatePost from "./CreatePost";
import Home from "./Home";
import ProfileLink from "./ProfileLink.jsx";
import Search from "./Search";
import Chatbox from "./Chatbox";
import useAuthStore from "../../store/authStore";
import CreateEvent from "./CreateEvent.jsx";
import UpdateProgress from "./UpdateProgress.jsx";
// import {
// 	doc,
// 	getDoc
//   } from "firebase/firestore";
//   import { firestore } from "../../firebase/firebase";


const SidebarItems = () => {
	const authUser = useAuthStore((state) => state.user);

	return (
		<>
			<Home />
			<Search />
			{ (authUser["userType"]=='Innovator')?<CreatePost/>:<CreateEvent/>}
			{authUser.userType === 'Innovator' && <UpdateProgress />}
            <Chatbox/>
			<ProfileLink />
		</>
	);
};

export default SidebarItems;