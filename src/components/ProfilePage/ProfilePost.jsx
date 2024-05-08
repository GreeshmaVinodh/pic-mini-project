import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	GridItem,  
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Description from "../Comment/Description";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import PostFooter from "../FeedPost/PostFooter";
import Comment from "../Comment/Comment";
import useUserProfileStore from "../../store/userProfileStore";
import usePostStore from "../../store/postStore";
import { firestore } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ProfilePost = ({post}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

	const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;

		try {
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
        <>
		<GridItem
			cursor={"pointer"}
			borderRadius={4}
			w={"container.small"}
			overflow={"hidden"}
			border={"1px solid"}
			borderColor={"whiteAlpha.300"}
			position={"relative"}
			onClick={onOpen}
		>
        <Flex
            opacity={0}
            _hover={{ opacity: 1 }}
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg={"blackAlpha.700"}
            transition={"all 0.3s ease"}
            zIndex={1}
            justifyContent={"center"}
        >
			<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
			<Flex>
				<AiFillHeart size={20} />
				<Text fontWeight={"bold"} ml={2}>
						{post.likes.length}
				</Text>
			</Flex>
			<Flex>
				<FaComment size={20} />
					<Text fontWeight={"bold"} ml={2}>
						{post.comments.length}
					</Text>
			</Flex>
		</Flex>
	</Flex>

		<Flex border={"1px solid #127B7E "} borderRadius={4} h={200} gap={5}>
			<Text color={"#127B7E"} fontSize={"sm"} padding={3}>
				{post.caption}
			</Text>
		</Flex>
		</GridItem>

        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}  size={{ base: "2xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody bg={"white"} pb={5}>
						<Flex
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							maxH={"90vh"}
							minH={"50vh"}
						>
							<Flex
								borderRadius={4}
								overflow={"auto"}
								border={"1px solid"}
								borderColor={"#127B7E"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Box>
									<Text color={"#127B7E"} padding={2}>
										{post.caption}
									</Text>
								</Box>
							</Flex>
							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={userProfile.profilePicURL} size={"sm"} name='As a Programmer' />
										<Text fontWeight={"bold"} fontSize={12} color={"#127B7E"}>
											{userProfile.username}
										</Text>
									</Flex>

									{authUser?.uid === userProfile.uid && (
										<Button
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											onClick={handleDeletePost}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									)}
								</Flex>
								<Divider my={4} bg={"gray.500"} />

								<VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
									{/* CAPTION */}
									{post.description && <Description post={post} />}
									{/* COMMENTS */}
									{post.comments.map((comment) => (
										<Comment key={comment.id} comment={comment} />
									))}
								</VStack>
								<Divider my={4} bg={"gray.8000"} />

								<PostFooter isProfilePage={true} post={post} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfilePost;