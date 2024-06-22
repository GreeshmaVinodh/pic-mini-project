import React from "react";
import './ChatBody.css';
import useSearchUser from "../../hooks/useSearchUser";

const MessageContainer = ({ message, authUser }) => {
  const isAuthUser = message.senderId === authUser.uid;
  const {userProfile}=useSearchUser()

  return (
    <div className={`messageContainer ${isAuthUser ? "alignRight" : "alignLeft"}`}>
      {!isAuthUser && (
        <div className="userInfo">
          <img src={userProfile?.profilePicURL} alt={`${userProfile?.username}}'s avatar`} className="avatar" />
          <span className="username">{userProfile?.username}</span>
        </div>
      )}
      <div className="messageBox">
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default MessageContainer;
