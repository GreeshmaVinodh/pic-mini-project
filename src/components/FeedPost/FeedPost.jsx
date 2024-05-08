import { Box, Text } from '@chakra-ui/react';
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';


const FeedPost = ({post}) => {
const { userProfile } = useGetUserProfileById(post.createdBy);
  return  (
		<>
      		<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4}padding={"10px"} w={'full'} maxH={"300px"} border={'1px solid #127B7E'} overflow={'auto'}>
				<Text> {post.caption} </Text>
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</>
  )
};	
export default FeedPost;
