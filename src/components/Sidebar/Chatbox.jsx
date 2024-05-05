import { Box, Link, Tooltip } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const Chatbox = () => {
	return (
        <Tooltip
                    hasArrow
                    label={"Message"}
                    placement="right"
                    ml={1}
                    openDelay={500}
                    display={{ base: "block", md: "none" }}
                >
                <Link
                    display={"flex"}
                    to={"/chat"}
                    as={RouterLink}
                    alignitems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    mt={"auto"}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    >
                    <FiMessageCircle  size={25} color={"#127B7E"}/>
                    <Box display={{ base: "none", md: "block" }} color={"#127B7E"}>
                        Message
                    </Box>
                </Link>
            </Tooltip>
        );
    };
        
export default Chatbox