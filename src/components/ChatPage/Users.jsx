import { VStack } from "@chakra-ui/react";
import User from './User';
import useGetMessagedUsers from "../../hooks/useGetMessagedUsers";

const Users = () => {
  const { isLoading, messagedUsers } = useGetMessagedUsers();
  if (isLoading) return null;

  return (
    <VStack py={4} px={6} gap={1}>
      {messagedUsers.map((user) => (
        <User user={user} key={user.uid} />
      ))}
    </VStack>
  );
};

export default Users;
