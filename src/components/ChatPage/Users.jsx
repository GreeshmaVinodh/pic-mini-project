import { VStack, Box } from "@chakra-ui/react";
import User from './User';
import { useAuthState } from "react-firebase-hooks/auth";
import useGetMessagedUsers from "../../hooks/useGetMessagedUsers";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { createOrGetChat } from "../../firebase/chat/newChat";

const Users = () => {
  const [authUser] = useAuthState(auth);
  const { isLoading, messagedUsers } = useGetMessagedUsers();
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    const fetchLastMessages = async () => {
      const messages = {};
      for (const user of messagedUsers) {
        const lastMessage = await getLastMessageFromUser(authUser, user);
        messages[user.uid] = lastMessage;
      }
      setLastMessages(messages);
    };

    if (messagedUsers.length > 0) {
      fetchLastMessages();
    }
  }, [messagedUsers]);

  const sortedUsers = [...messagedUsers].sort((a, b) => {
    const timestampA = lastMessages[a.uid]?.timestamp || 0;
    const timestampB = lastMessages[b.uid]?.timestamp || 0;
    return timestampB - timestampA;
  });

  if (isLoading) return null;

  return (
    <Box maxH="400px" overflowY="auto">
      <VStack py={4} px={6} gap={1}>
        {sortedUsers.map((user) => (
          <User user={user} key={user.uid} />
        ))}
      </VStack>
    </Box>
  );
};

const getLastMessageFromUser = async (authUser, user) => {
  try {
    const chatDocRef = await createOrGetChat(authUser.uid, user.uid);
    const messagesRef = collection(firestore, `chats/${chatDocRef.id}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    let lastMessage = null;
    querySnapshot.forEach((doc) => {
      lastMessage = doc.data();
    });
    return lastMessage;
  } catch (error) {
    console.error("Error fetching last message:", error);
    return null;
  }
};

export default Users;
