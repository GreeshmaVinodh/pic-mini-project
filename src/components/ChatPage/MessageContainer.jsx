import './ChatBody.css';
import useSearchUser from "../../hooks/useSearchUser";
import { AvatarGroup,Avatar } from "@chakra-ui/react";

const MessageContainer = ({ message, authUser }) => {
  const isAuthUser = message.senderId === authUser.uid;
  const { userProfile } = useSearchUser();

  // Format the timestamp
  const formattedTime = message.timestamp?.toDate().toLocaleTimeString();

  return (
    <div className={`messageContainer ${isAuthUser ? "alignLeft" : "alignRight"}`}>
      {isAuthUser && (
        <div className="userInfo">
          <AvatarGroup size={{ base: "sm", md: "sm" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
            <Avatar src={userProfile?.profilePicURL} alt='As a programmer logo' />
          </AvatarGroup>
          <span className="username">{userProfile?.username}</span>
        </div>
      )}
      <div className="messageBox">
        <p>{message.message}</p>
        <div className="timestamp">{formattedTime}</div>
      </div>
    </div>
  );
};

export default MessageContainer;