import { SearchLogo } from "../../../public/assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import './ChatSidebar.css'
import { useRef } from "react";
import {
  Input,
  HStack,
  InputGroup,
  Link,
  Flex,
  Avatar,
  VStack,
  Box,
  InputLeftAddon,
} from "@chakra-ui/react";

const Searchbar = () => {
  const searchRef = useRef(null);
  const { user, getUserProfile } = useSearchUser();

  const handleSearchUser = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(searchRef.current.value);
      getUserProfile(searchRef.current.value);
    }
  };

  return (
    <>
      <HStack spacing={4}>
        <InputGroup>
          <InputGroup>
            <InputLeftAddon>
              <SearchLogo />
            </InputLeftAddon>
            <Input
              type="text"
              placeholder="Search user"
              onKeyDown={handleSearchUser}
              ref={searchRef}
            />
          </InputGroup>
        </InputGroup>
      </HStack>
      {user && (
        <div className="list">
        <Flex alignItems={"center"} gap={2}>
          <Link to={`/`}>
            <Avatar src={user.profilePicURL} size={"md"} />
          </Link>
          <VStack spacing={2} alignItems={"flex-start"}>
            <Link to={`/${user.username}`}>
              <Box fontSize={12} color={"#127B7E"} fontWeight={"bold"}>
                {user.name}
              </Box>
            </Link>
          </VStack>
        </Flex>
        </div>
      )}
    </>
  );
};

export default Searchbar;

