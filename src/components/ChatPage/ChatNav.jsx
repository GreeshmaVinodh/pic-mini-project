import {
    Flex,
    Avatar,
    VStack,
    Box,
  } from "@chakra-ui/react";

const ChatNav = () => {
  return (
    <div>
      <div className="list">
        <Flex alignItems={"center"} gap={2}>
            <Avatar src='../../../public/assets/avatar.png' size={"md"} />
          <VStack spacing={2} alignItems={"flex-start"}>
            {/* <Link to={`/${user.username}`}> */}
              <Box fontSize={12} color={"#127B7E"} fontWeight={"bold"}>
                {/* {user.name} */}Username
              </Box>
            {/* </Link> */}
          </VStack>
        </Flex>
        </div>
    </div>
  )
}
export default ChatNav;

