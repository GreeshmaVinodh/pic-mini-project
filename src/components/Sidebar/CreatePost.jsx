import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { CgAddR } from "react-icons/cg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import { useLocation } from "react-router-dom";
import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const { isLoading, handleCreatePost } = useCreatePost();
  const [response, setResponse] = useState("");

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(text, description);
      onClose();
      setText("");
      setDescription("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/chat/${text}`);
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CgAddR size={25} color={"#127B7E"} />
          <Box display={{ base: "none", md: "block" }} color={"#127B7E"}>
            Create
          </Box>
        </Flex>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent bg={"white"} border={"1px solid #127B7E"}>
          <ModalHeader color={"#127B7E"}>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post content..."
              value={text}
              border={"1px solid #127B7E"}
              onChange={(e) => setText(e.target.value)}
              marginBottom={5}
            />
            <Textarea
              placeholder="Description..."
              value={description}
              border={"1px solid #127B7E"}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={handleSubmit}
              isLoading={isLoading}
              bg={"#127B7E"}
              color={"white"}
            >
              Test
            </Button>
          </ModalFooter>
          <Button
              onClick={handlePostCreation}
              isLoading={isLoading}
              bg={"#127B7E"}
              color={"white"}
            >
            {response}
            </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const { pathname } = useLocation();
  const [response] = useState("");

  const handleCreatePost = async (text, description) => {
    if (isLoading) return;
    if (!text.trim()) throw new Error("Post caption cannot be empty");
    setIsLoading(true);
    const newPost = {
      text: text,
      description: description,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
      isAuthorized : {response}
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      if (createPost) {
        createPost({ ...newPost, id: postDocRef.id });
      }

      if (pathname !== "/") {
        showToast("Success", "Post created successfully", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
