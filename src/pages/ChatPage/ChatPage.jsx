import { Box, Container, Flex } from "@chakra-ui/react";
import ChatSidebar from "../../components/ChatPage/ChatSidebar";
import ChatSection from "../../components/ChatPage/ChatSection";
import './ChatPage.css';


const ChatPage = () => {
  
  return (
    <div>
      <Container maxW={"container.lg"} fontFamily="Sora , sans-serif">
      <Flex gap={10}>
      <Box
          flex={3}
          mr={50}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
        >
          <ChatSidebar/>
        </Box>
        <div className="vertical-line"></div>
        <Box flex={2} py={10} top={0}>
            <ChatSection/>
        </Box>
      </Flex>
    </Container>
    </div>
  )
}

export default ChatPage;

