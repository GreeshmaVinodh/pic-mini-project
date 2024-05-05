// import { Image } from "@chakra-ui/react";
// import { useContext, useEffect, useRef } from "react";
// // import { ChatContext } from "../../context/ChatContext";
// import { AuthContext } from "../../context/AuthContext";

// const Message = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   // const { data } = useContext(ChatContext);

//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   return (
//     <div
//       ref={ref}
//       className={`message ${message.senderId === currentUser.uid && "owner"}`}
//     >
//       <div className="messageInfo">
//         <Image className="icon" src="../../../public/assets/avatar.png" />
//         <span className="text2">Just now</span>
//       </div>
//       <div className="messageContent">
//         <p className="dialog">{message.text}</p>
//       </div>
//     </div>
//   );
// };

// export default Message;

import { Image } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import avatarImage from "../../../public/assets/avatar.png";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <Image className="icon" src={avatarImage} alt="Avatar" />
        <span className="text2">Just now</span>
      </div>
      <div className="messageContent">
        <p className="dialog">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;