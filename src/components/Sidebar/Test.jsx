import { useState } from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
const Test = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/chat/${text}`);
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={4}>Post Form</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="text" mb={4}>
            <FormLabel>Text</FormLabel>
            <Input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue">Post</Button>
          <Text>{response}</Text>
        </form>
      </Box>
    </Flex>
  );
};
export default Test;
