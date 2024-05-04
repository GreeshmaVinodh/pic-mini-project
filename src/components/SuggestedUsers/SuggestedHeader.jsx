import { Avatar,Flex,Text, Button} from '@chakra-ui/react';
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";


const SuggestedHeader = () => {

  const {handleLogout , isLoggingOut} = useLogout();
  const authUser = useAuthStore((state) => state.user);

	if (!authUser) return null;
  return (
    <Flex justifyContent={"space-between"} alignItems={'center'} w={'full'}>
        <Flex alignItems={'center'} gap={2}>
          <Link to={`${authUser.username}`}>
            <Avatar size={"lg"} src={authUser.profilePicURL} />
          </Link>
          <Link to={`${authUser.username}`}>
            <Text fontSize={12} fontWeight={'bold'}>
            {authUser.username}
            </Text>
          </Link>
        </Flex>   
        <Button
            onClick= {handleLogout}
            isLoading = {isLoggingOut}
            variant = {'ghost'}
            _hover = {{bg: "transparent"}}
            fontSize={14}
            fontWeight={'medium'}
            color={'#127B7E'}
            cursor={'pointer'}
        >Log out
        </Button>
    </Flex>
  );
};
export default SuggestedHeader;