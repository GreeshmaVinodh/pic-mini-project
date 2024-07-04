import { Box, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useAuthStore from "../../store/authStore";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const authUser = useAuthStore((state) => state.user);
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box
        my={2}
        borderRadius={4}
        padding={"10px"}
        w={"full"}
        maxH={"300px"}
        border={"1px solid #127B7E"}
        overflow={"auto"}
      >
        {post.imageURL ? (
          <img src={post.imageURL} alt="Post" />
        ) : (
          ((authUser["userType"]=='Innovator') && post.isNew === true ? (
            <Text filter="auto" blur="5px">
              {post.caption}
            </Text>
          ) : (
            <Text>{post.caption}</Text>
          ))
        )}
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
};

export default FeedPost;