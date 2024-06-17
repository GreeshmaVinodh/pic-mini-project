import { Flex, Container, VStack, Image, Box } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./AuthStyle.css";
const AuthPage = () => {
  return (
    <>
      <Box className="logo">
        <Image src="/public/assets/PIC LOGO.png" h={58} alt="PIC" />
      </Box>
      <Flex
        minH={"80vh"}
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
      >
        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={50}>
            {/* Left hand-side */}
            <Box display={{ base: "none", md: "block" }}>
              <Box className="tagline" textAlign={"left"}>
                Inspiring Tomorrows <br></br>Innovators,
              </Box>
              <Box className="highlight" textAlign={"left"}>
                today!
              </Box>
            </Box>
            {/* Right hand-side */}
            <VStack spacing={4} align={"stretch"}>
              <AuthForm />
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};
export default AuthPage;
