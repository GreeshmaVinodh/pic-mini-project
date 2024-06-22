import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import useSearchUser from "../../hooks/useSearchUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { createOrGetChat } from "../../firebase/chat/newChat";
import { listenForMessages } from "../../firebase/chat/listenMessage";
import './ChatBody.css';

const MessageContainer = ({ message }) => {
  return (
    <div className="messageContainer">
      <p>{message.message}</p>
    </div>
  );
};

const ChatBody = () => {
  const { userProfile } = useSearchUser();
  const [authUser] = useAuthState(auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initChat = async () => {
      const chatDocRef = await createOrGetChat(userProfile?.uid, authUser.uid);

      listenForMessages(chatDocRef.id, (newMessages) => {
        setMessages(newMessages);
      });
    };

    userProfile && initChat();
  }, [userProfile, authUser]);

  return (
    <div className="chatBody">
      {messages.map((message) => {
        return <MessageContainer key={message.id} message={message} />;
      })}
    </div>
  );
};

export default ChatBody;
