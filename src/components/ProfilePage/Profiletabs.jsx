// import { Box, Flex, Text } from "@chakra-ui/react";
// import { BsGrid3X3, BsBookmark } from "react-icons/bs";
// import useAuthStore from "../../store/authStore";
// import useUserProfileStore from "../../store/userProfileStore";

// const Profiletabs = () => {
//   const authUser = useAuthStore((state) => state.user);
//   const userProfile = useUserProfileStore((state) => state.userProfile);

//   return (
//     <Flex
//       w={"full"}
//       justifyContent={"center"}
//       gap={{ base: 4, sm: 10 }}
//       textTransform={"uppercase"}
//       fontWeight={"bold"}
//     >
//       <Flex
//         borderTop={"1px solid white"}
//         alignItems={"center"}
//         p="3"
//         gap={1}
//         cursor={"pointer"}
//       >
//         <Box fontSize={20}>
//           <BsGrid3X3 color={"#127B7E"} />
//         </Box>
//         <Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
//           {authUser?.userType === 'Innovator' ? 'Ideas' : 'Events'}
//         </Text>
//       </Flex>
//       {authUser?.userType === 'Innovator' && userProfile?.userType === 'Innovator' && (
//         <Flex alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
//           <Box fontSize={20}>
//             <BsBookmark color={"#127B7E"} />
//           </Box>
//           <Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
//             Progress
//           </Text>
//         </Flex>
//       )}
//     </Flex>
//   );
// };

// export default Profiletabs;

import { Box, Flex, Text } from "@chakra-ui/react";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useState } from "react";

const Profiletabs = () => {
  const authUser = useAuthStore((state) => state.user);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const [activeTab, setActiveTab] = useState("Ideas");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Ideas":
        // Render the "Ideas" section content here
        return <div></div>;
      case "Progress":
        // Render the "Progress" section content here
        return <div></div>;
      default:
        return null;
    }
  };

  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
      direction="column"
    >
      <Flex
        w={"full"}
        justifyContent={"center"}
        gap={{ base: 4, sm: 10 }}
        textTransform={"uppercase"}
        fontWeight={"bold"}
      >
        <Flex
          borderTop={"1px solid white"}
          alignItems={"center"}
          p="3"
          gap={1}
          cursor={"pointer"}
          onClick={() => handleTabClick("Ideas")}
          bg={activeTab === "Ideas" ? "gray.200" : ""}
        >
          <Box fontSize={20}>
            <BsGrid3X3 color={"#127B7E"} />
          </Box>
          <Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
            {authUser?.userType === "Innovator" ? "Ideas" : "Events"}
          </Text>
        </Flex>
        {authUser?.userType === "Innovator" && userProfile?.userType === "Innovator" && (
          <Flex
            alignItems={"center"}
            p="3"
            gap={1}
            cursor={"pointer"}
            onClick={() => handleTabClick("Progress")}
            bg={activeTab === "Progress" ? "gray.200" : ""}
          >
            <Box fontSize={20}>
              <BsBookmark color={"#127B7E"} />
            </Box>
            <Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
              Progress
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex w="full" justifyContent="center" mt={4}>
        {renderTabContent()}
      </Flex>
    </Flex>
  );
};

export default Profiletabs;