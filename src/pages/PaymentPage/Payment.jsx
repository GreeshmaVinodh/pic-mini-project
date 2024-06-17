import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

const Payment = () => {
  const [post, setPost] = useState(null);
  const handlePayment = async () => {
    try {
      
      const response = await fetch("/api/posts/123"); 
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error retrieving post:", error);
    }
  };

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <Box bg="white" p={4}>
          <Flex justify="space-between" alignItems="center" mb={4}>
            <Text color="#127B7E" fontSize="xl" fontWeight="bold">
              Payment Gateway
            </Text>
          </Flex>
          <Text mb={4}>
            This idea is authorized as an Innovative or new idea. To view such
            an idea you have to pay a certain amount to the innovator.
          </Text>
          <Button bg="#127B7E" color="white" onClick={handlePayment}>
            Proceed for Payment
          </Button>
        </Box>
        {post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
