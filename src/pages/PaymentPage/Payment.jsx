import { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "../../hooks/useShowToast";
import './Payment.css';
import PaymentGateway from './PaymentGateway'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        showToast("Error", "No post ID provided", "error");
        return;
      }
      try {
        const postRef = doc(firestore, "posts", postId);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          setPost(postDoc.data());
        } else {
          showToast("Error", "Post not found", "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };

    fetchPost();
  }, [postId, showToast]);

  if (!post) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <>
    <PaymentGateway/>
        <div className='payment'>
            This idea is authorized by PIC as an New or Innovative idea. To view the details of the idea you have to pay a certain amount to the innovator.
            <br></br><br></br>
            <Button onClick={onOpen}>Pay Now</Button>
        </div>
      
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent bg={"white"} border={"1px solid #127B7E"}>
          <ModalHeader color={"#127B7E"}>Post Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {post.imageURL ? (
              <img src={post.imageURL} alt="Post" />
            ) : (
              <Text>{post.caption}</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Payment;
