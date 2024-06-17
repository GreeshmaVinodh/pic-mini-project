import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPost/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
  return (
    <Container maxW={"container.lg"} fontFamily="Sora , sans-serif">
      <Flex gap={10}>
        <Box flex={2} py={10} top={0}>
          <FeedPosts />
        </Box>
        <Box
          flex={3}
          mr={50}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
          borderLeft={"1px solid #127B7E"}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
