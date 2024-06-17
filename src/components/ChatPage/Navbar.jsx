// NavBar.js
import { Link, Flex, Avatar, VStack, Box } from "@chakra-ui/react";

const NavBar = ({ selectedUser }) => {
  return (
    <div>
      {selectedUser && (
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={selectedUser.profilePicURL} size={"md"} />
          <VStack spacing={2} alignItems={"flex-start"}>
            <Link to={`/${selectedUser.username}`}>
              <Box fontSize={12} color={"#127B7E"} fontWeight={"bold"}>
                {selectedUser.name}
              </Box>
            </Link>
          </VStack>
        </Flex>
      )}
    </div>
  );
};

export default NavBar;