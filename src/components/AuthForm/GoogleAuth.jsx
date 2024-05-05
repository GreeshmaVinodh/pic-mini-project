// import { Flex, Image, Text, Box } from "@chakra-ui/react";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../../firebase/firebase";
// import useShowToast from "../../hooks/useShowToast";
// import useAuthStore from "../../store/authStore";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// const GoogleAuth = ({prefix}) => {

//   const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
// 	const showToast = useShowToast();
// 	const loginUser = useAuthStore((state) => state.login);

//   const handleGoogleAuth = async () => {
// 		try {
// 			const newUser = await signInWithGoogle();
// 			if (!newUser && error) {
// 				showToast("Error", error.message, "error");
// 				return;
// 			}
// 			const userRef = doc(firestore, "users", newUser.user.uid);
// 			const userSnap = await getDoc(userRef);

// 			if (userSnap.exists()) {
// 				// login
// 				const userDoc = userSnap.data();
// 				localStorage.setItem("userInfo", JSON.stringify(userDoc));
// 				loginUser(userDoc);
// 			} else {
// 				// signup
// 				const userDoc = {
// 					uid: newUser.user.uid,
// 					email: newUser.user.email,
// 					username: newUser.user.email.split("@")[0],
// 					name: newUser.user.displayName,
// 					bio: "",
// 					profilePicURL: newUser.user.photoURL,
// 					followers: [],
// 					following: [],
// 					posts: [],
// 					createdAt: Date.now(),
// 				};
// 				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
// 				localStorage.setItem("userInfo", JSON.stringify(userDoc));
// 				loginUser(userDoc);
// 			}
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		}
// 	};

//   return (
//     <>
//       <Box
//         my={0}
//         border={"1px solid #127B7E"}
//         borderRadius={20}
//         padding={1}
//         w={60}
//         onClick={handleGoogleAuth}
//       >
//         <Flex
//           alignItems={"center"}
//           justifyContent={"center"}
//           cursor={"pointer"}
//         >
//           <Image src="/public/assets/Google logo.svg" w={5} alt="Google logo" />
//           <Text mx="2" color={"#127B7E"}>
//             {prefix} with Google
//           </Text>
//         </Flex>
//       </Box>
//     </>
//   );
// };

// export default GoogleAuth;
