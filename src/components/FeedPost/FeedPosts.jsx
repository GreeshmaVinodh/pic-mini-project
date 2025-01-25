import { Box, Container, Flex, Text } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPost/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import useAuthStore from "../../store/authStore";

const HomePage = () => {
  const authUser = useAuthStore((state) => state.user); // Get the authenticated user info

  return (
    <Container maxW={"container.lg"} fontFamily="Sora, sans-serif">
      <Flex direction="column" gap={10} py={10}>
        {/* Welcome Message */}
        <Box bg="teal.100" p={4} rounded="md" textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            Welcome {authUser.userType === "Innovator" ? "Back, Innovator" : "to the Portal"}!
          </Text>
        </Box>

        {/* Conditional Layout Based on userType */}
        <Flex gap={10}>
          {authUser.userType === "Innovator" ? (
            <>
              {/* Content for Innovators */}
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
            </>
          ) : (
            <>
              {/* Content for Other Users */}
              <Box flex={1} py={10} textAlign="center">
                <Text fontSize="lg" color="gray.600">
                  Welcome to the portal! Explore and create events to connect with others.
                </Text>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default HomePage;

