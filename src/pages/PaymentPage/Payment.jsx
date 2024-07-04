import { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "../../hooks/useShowToast";
import './Payment.css';

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
  const [paymentComplete, setPaymentComplete] = useState(false);
  const showToast = useShowToast();
  // const navigate = useNavigate();
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

  useEffect(() => {
    const checkRedirect = () => {
      const redirectTime = sessionStorage.getItem("redirectTime");
      if (redirectTime) {
        const now = new Date().getTime();
        if (now - redirectTime >= 6000) { // 1 minute
          showToast("Success", "Payment successful!", "success");
          sessionStorage.removeItem("redirectTime");
          setPaymentComplete(true);
        }
      }
    };

    const interval = setInterval(checkRedirect, 1000);
    return () => clearInterval(interval);
  }, [showToast]);

  const handleRedirect = () => {
    sessionStorage.setItem("redirectTime", new Date().getTime());
    window.location.href = "https://buy.stripe.com/test_9AQ02bbZE4Or3YsbII";
  };

  if (!post) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <>
      <div className='payment'>
        {!paymentComplete ? (
          <>
          <div>
          <Text>The idea you have selected is authorized by PIC as an New or Innovative idea. To view the details of the idea you have to pay a certain amount to the innovator.</Text>
          <Button onClick={handleRedirect}>Pay Now</Button>
          </div>
          </>
          
        ) : (
          <Box mt={4}>
            <Text>Payment successful!</Text>
            <Button onClick={onOpen}>View Post Details</Button>
          </Box>
        )}
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