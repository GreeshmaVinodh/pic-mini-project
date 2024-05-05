// import { HStack, Image, VStack, Text, Divider } from "@chakra-ui/react";
// import MessagesComp from "./MessagesComp";
// import InputComp from "./InputComp";
// import { useContext } from "react";
// import { ChatContext } from "../../context/ChatContext";

// const ChatPart = () => {
//   const { data } = useContext(ChatContext);

//   return (
//     <div className="chatNav">
//       <HStack spacing={4}>
//         <Image className="icon" src="../../../public/assets/avatar.png" />
//         <VStack spacing={0} alignItems={"start"}>
//           <Text className="text">{data.user?.username}</Text>
//           {/* <Text className='text2' size={8}>Active 5 mins ago</Text> */}
//         </VStack>
//       </HStack>
//       <Divider className="divider" />
//       <MessagesComp />
//       <InputComp />
//     </div>
//   );
// };

// export default ChatPart;

import { HStack, Image, VStack, Text, Divider } from "@chakra-ui/react";
import MessagesComp from "./MessagesComp";
import InputComp from "./InputComp";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import avatarImage from "../../../public/assets/avatar.png";

const ChatPart = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chatNav">
      <HStack spacing={4}>
        <Image className="icon" src={avatarImage} alt="Avatar" />
        <VStack spacing={0} alignItems={"start"}>
          <Text className="text">{data.user?.username}</Text>
          {/* <Text className='text2' size={8}>Active 5 mins ago</Text> */}
        </VStack>
      </HStack>
      <Divider className="divider" />
      <MessagesComp />
      <InputComp />
    </div>
  );
};

export default ChatPart;