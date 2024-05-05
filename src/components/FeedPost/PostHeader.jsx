import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
const PostHeader = ({username,avatar}) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap={2} border={'1px #127B7E'}>
            <Avatar src={avatar} alt="user image" size={'sm'}/>
            <Flex fontSize={12} fontWeight={"bold"} gap='2'>
                {username}
                <Box color={"black.500"}>• 1w</Box>
            </Flex>
        </Flex>
        <Box
          cursor={'pointer'}
        >
         <Button
            size={"xl"}
            bg={"#127B7E"}
            fontSize={10}
            color={"white"}
            fontWeight={'semibold'}
            padding={3}
            justifyContent={'space-between'}
            _hover={{
              color: "white",
            }}
            transition={"0.2 ease in out"}
          >
            Follow
          </Button>
        </Box>
    </Flex>
  )
  
};
export default PostHeader;
