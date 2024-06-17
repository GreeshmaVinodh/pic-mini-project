import {
    Flex,
    Avatar,
    VStack,
    Box,
  } from "@chakra-ui/react";
import useSearchUser from "../../hooks/useSearchUser";

const ChatNav = () => {
<<<<<<< HEAD
    const { user } = useSearchUser();
    console.log(user)
=======
  const {userProfile}=useSearchUser()
  // console.log(userProfile)
>>>>>>> da3d6bb9136e86375f38e0369e50f0e369209442
  return (
    <div>
      <div className="list">
        <Flex alignItems={"center"} gap={2}>
            <Avatar src='../../../public/assets/avatar.png' size={"md"} />
          <VStack spacing={2} alignItems={"flex-start"}>
            {/*<Link to={`/${user.username}`}> */}
              <Box fontSize={12} color={"#127B7E"} fontWeight={"bold"}>
                {userProfile?.username}
              </Box>
            {/* </Link> */}
          </VStack>
        </Flex>
        </div>
    </div>
  )
}
export default ChatNav;

