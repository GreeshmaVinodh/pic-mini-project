import { Box, Flex, Image,  Tooltip, Link} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import SidebarItems from "./SidebarItems";
import useLogout from "../../hooks/useLogout";
const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Box
      height={"100vh"}
      w={{base : "80px" , md : "16vw"}}
      borderRight={"1px solid #127B7E"}
      py={8}
      position={"sticky"}
      top={5}
      left={0}
      px={{ base: 2, md: 4 }}
      justifyContent={"space-between"}
    >
      <Flex direction={"column"} gap={3} w="full">
        <Image src="/public/assets/PIC LOGO.png" alt="PIC" marginBottom={10} />
      </Flex>
      <Flex direction={"column"}  gap={5}cursor={"pointer"} >
					<SidebarItems position={"sticky"}/>
				</Flex>
      <Tooltip
        hasArrow
        label={"Logout"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}  
      >
        <Link
          onClick={handleLogout}
          display={"flex"}
          to={"/auth"}
          as={RouterLink}
          alignitems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderradius={6}
          paddingTop={5}
          p={2}
          w={{ base: 10, md: "full" }}
          justifycontent={{ base: "center", md: "flex-end" }}
        >
          <BiLogOut size={25} color={"#127B7E"}/>
          <Box 
            display={{ base: "none", md: "block" }} 
            color={"#127B7E"} 
            isLoading={isLoggingOut}
          >
            Logout
          </Box>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default Sidebar;