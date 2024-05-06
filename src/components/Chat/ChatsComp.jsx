// import { HStack, Image, VStack, Text } from "@chakra-ui/react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { ChatContext } from "../../context/ChatContext";
// import { firestore } from "../../firebase/firebase";

// const ChatsComp = () => {
//   const [chats, setChats] = useState([]);
//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(firestore, "chatss", currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => {
//         unsub();
//       };
//     };

//     currentUser.uid && getChats();
//   }, [currentUser.uid]);

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <>
//       <div className="comp1">
//       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
//             <div  key={chat[0]}
//               onClick={() => handleSelect(chat[1].userInfo)}>
//               <div className="comp1">
//                 <HStack spacing={4}>
//                   <Image
//                     className="icon"
//                     src="../../../public/assets/avatar.png"
//                   />
//                   <VStack spacing={0} alignItems={"start"}>
//                     <Text className="text">{chat[1].userInfo?.username}</Text>
//                     <Text className="text2">{chat[1].lastMessage?.text}</Text>
//                   </VStack>
//                 </HStack>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default ChatsComp;

import { HStack, Image, VStack, Text } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { firestore } from "../../firebase/firebase";
import avatarImage from '../../../public/assets/avatar.png';

const ChatsComp = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(firestore, "chatss", currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data() || {}));
      });
      return () => unsub();
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <div className="comp1">
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.sort((a, b) => b[1].date - a[1].date).map((chat) => (
            <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
              <HStack spacing={4}>
                <Image className="icon" src={avatarImage} alt="Avatar" />
                <VStack spacing={0} alignItems={"start"}>
                  <Text className="text">{chat[1].userInfo?.username}</Text>
                  <Text className="text2">{chat[1].lastMessage?.text}</Text>
                </VStack>
              </HStack>
            </div>
          ))
        ) : (
          <Text>No chats found</Text>
        )}
      </div>
    </>
  );
};

export default ChatsComp;