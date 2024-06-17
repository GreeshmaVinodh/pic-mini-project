import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import useSearchUser from "../../hooks/useSearchUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { createOrGetChat } from "../../firebase/chat/newChat";
import { listenForMessages } from "../../firebase/chat/listenMessage";


const ChatBody = () => {
  const {userProfile}=useSearchUser();
  const [authUser] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  // const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const chatDocRef = await createOrGetChat(userProfile?.uid, authUser.uid);
      // setChatId(chatDocRef.id);

      listenForMessages(chatDocRef.id, (newMessages) => {
        setMessages(newMessages);
      });
    };

    userProfile && initChat();
  }, [userProfile, authUser]);

  // console.log(messages)
  return (
    <div className="chatBody">
        {
          messages.map((message) => {
            return <p>{message.message}</p>
          })
        }
    </div>
  )
}

export default ChatBody
