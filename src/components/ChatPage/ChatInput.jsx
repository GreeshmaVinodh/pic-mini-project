import {
    Input,
    HStack,
    InputGroup,
    Image,
    InputRightAddon,
  } from "@chakra-ui/react";
import useSearchUser from "../../hooks/useSearchUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { createOrGetChat } from "../../firebase/chat/newChat";
import { listenForMessages } from "../../firebase/chat/listenMessage";
import { useEffect, useState } from "react";
import { sendMessage } from "../../firebase/chat/sendChat";


const ChatInput = () => {
  const {userProfile}=useSearchUser();
  const [authUser] = useAuthState(auth);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);

  // console.log(userProfile?.uid,authUser.uid);

  useEffect(() => {
    const initChat = async () => {
      const chatDocRef = await createOrGetChat(userProfile?.uid, authUser.uid);
      setChatId(chatDocRef.id);
    };

    userProfile && initChat();
  }, [userProfile, authUser]);



  const handleSend = async (message) => {
    console.log(userProfile,)
    if (newMessage.trim() && userProfile) {
      console.log("kkk")
      await sendMessage(chatId, userProfile?.uid,authUser.uid, newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <HStack spacing={4}>
        <InputGroup>
          <InputGroup>
            <Input
              type="text"
              placeholder="Start messaging"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputRightAddon><Image src='../../../public/assets/SEND.png' w={35}/></InputRightAddon>
          </InputGroup>
        </InputGroup>
      </HStack>
    </div>
  )
}

export default ChatInput
