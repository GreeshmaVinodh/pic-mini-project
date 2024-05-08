import {Flex,Box,Text, InputGroup, InputRightElement,Button,Input,useDisclosure} from '@chakra-ui/react';
import { useRef,useState } from 'react';
import { NotificationsLogo,UnlikeLogo,CommentLogo} from '../../../public/assets/constants';
import useAuthStore from '../../store/authStore';
import usePostComment from "../../hooks/usePostComment";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../Utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({post, isProfilePage, creatorProfile}) => {
  const {isCommenting,handlePostComment}=usePostComment();
  const [comment,setComment]=useState("");
  const authUser = useAuthStore(state => state.user);
  const commentRef = useRef(null);
  const {handleLikePost,isLiked,likes}=useLikePost(post);
  const {isOpen,onOpen,onClose} = useDisclosure();

  const handleSubmitComment = async ()  => {
    await handlePostComment(post.id,comment)
    setComment("")
  }

  return (
    <Box mb={10} marginTop={"auto"}>
    <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
     <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18} >
        {!isLiked? <NotificationsLogo/>: <UnlikeLogo/>}
      </Box>
      <Box cursor={"pointer"} fontSize={18} onClick = {() => commentRef.current.focus()}>
        <CommentLogo/>
      </Box>
    </Flex>
    <Text fontWeight={600} fontSize={'sm'} >
      {likes}{" "}likes
    </Text>
    {isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}
    {!isProfilePage &&(
      <>
           <Text fontSize={'sm'} fontWeight={700}>
    {creatorProfile?.username}{" "}
      <Text as='span' fontWeight={400}>
        {post.description}
      </Text>
    </Text>
    {post.comments.length > 0 && (
      <Text fontSize={'sm'} color={'#127B7E'} cursor={"pointer"} onClick={onOpen}>
        view all {post.comments.length} comments
      </Text> 
    )}
    {/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
    {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
      </>
    )}
    {authUser && (
       <Flex
       alignItems={'center'}
       gap={2}
       justifyContent={'space-between'}
       w={'full'}
     >
       <InputGroup>
         <Input variant={'flushed'} 
            placeholder={'Add a comment...'} 
            fontSize={14}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            ref={commentRef}
         />
         <InputRightElement>
           <Button
             size={"xs"}
             fontSize={12}
             color={"#127B7E"}
             fontWeight={'semibold'}
             padding={4}
             _hover={{
               color: "#127B7E",
             }}
             bg={"transparent"}
             onClick={handleSubmitComment}
             isLoding={isCommenting}

           >
             Post</Button>
         </InputRightElement>
       </InputGroup>
     </Flex>
    )}
    </Box>
  );
};
export default PostFooter;
