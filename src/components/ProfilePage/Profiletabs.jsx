import { Box, Flex, Text } from "@chakra-ui/react";
import { BsGrid3X3} from "react-icons/bs";
// import useAuthStore from "../../store/authStore";
// import useUserProfileStore from "../../store/userProfileStore";

const Profiletabs = () => {
  // const authUser = useAuthStore((state) => state.user);
  // const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
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
      >
        <Box fontSize={20}>
          <BsGrid3X3 color={"#127B7E"} />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
         POSTS
        </Text>
      </Flex> 
    </Flex>
  );
};

export default Profiletabs;

