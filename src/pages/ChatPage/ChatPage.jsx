import { Box, Container, Flex } from "@chakra-ui/react";
import ChatSidebar from "../../components/ChatPage/ChatSidebar";
import ChatSection from "../../components/ChatPage/ChatSection";
import './ChatPage.css';

const ChatPage = () => {
  return (
    <div>
      <Container maxW={"container.lg"} fontFamily="Sora, sans-serif">
        <Flex direction={{ base: "column", lg: "row" }} gap={10}>
          <Box
            flex={3}
            display={{ base: "none", lg: "block" }}
            maxW={{ base: "full", lg: "250px" }}
            mr={{ lg: 50 }}
          >
            <ChatSidebar />
          </Box>
          <Box
            flex={3}
            display={{ base: "block", lg: "none" }}
            maxW={{ base: "full", lg: "300px" }}
            mb={{ base: 5, lg: 0 }}
          >
            <ChatSidebar />
          </Box>
          <div className="vertical-line"  ></div>
          <Box flex={5} py={10}>
            <ChatSection />
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default ChatPage;
