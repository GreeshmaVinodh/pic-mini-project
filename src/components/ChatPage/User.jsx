import { Flex, Avatar, VStack, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { createOrGetChat } from "../../firebase/chat/newChat";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";

const User = ({ user }) => {
  const [authUser] = useAuthState(auth);
  const navigate = useNavigate();
  const [lastMessage, setLastMessage] = useState(null);
  // const [searchUser, setSearchUser] = useSearchUser(null);
  const { userSearch, getUserProfile } = useSearchUser();

  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const chatDocRef = await createOrGetChat(authUser.uid, user.uid);
        const messagesRef = collection(firestore, `chats/${chatDocRef.id}/messages`);
        const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setLastMessage(doc.data());
        });
      } catch (error) {
        console.error("Error fetching last message:", error);
      }
    };

    if (authUser) {
      getLastMessage();
    }
  }, [authUser, user.uid]);

  const handleUserClick = async () => {
    try {
      const chatDocRef = await createOrGetChat(authUser.uid, user.uid);
      console.log(user);
      getUserProfile(user.username);

      navigate(`/chat/${chatDocRef.id}`);
    } catch (error) {
      console.error("Error navigating to chat:", error);
    }
  };

  if (!lastMessage) {
    return null; // Don't render anything if there is no last message
  }

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      padding={2}
      borderRadius={10}
      maxW={"400px"}
      onClick={handleUserClick}
      style={{ cursor: "pointer" }}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user.profilePicURL} size={"md"} />
        <VStack spacing={2} alignItems={"flex-start"}>
          <Box fontSize={12} color={"#127B7E"} fontWeight={"bold"}>
            {user.username}
          </Box>
          <Text fontSize={10} color={"gray.500"}>
            {`${lastMessage.senderId === authUser.uid ? "You: " : ""}${lastMessage.message}`}
          </Text>
        </VStack>
      </Flex>
      {/* You can add any additional logic or buttons here */}
    </Flex>
  );
};

export default User;
