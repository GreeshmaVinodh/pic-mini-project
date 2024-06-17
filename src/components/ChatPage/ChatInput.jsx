import {
    Input,
    HStack,
    InputGroup,
    Image,
    InputRightAddon,
  } from "@chakra-ui/react";
const ChatInput = () => {
  return (
    <div>
      <HStack spacing={4}>
        <InputGroup>
          <InputGroup>
            <Input
              type="text"
              placeholder="Start messaging"
            />
            <InputRightAddon><Image src='../../../public/assets/SEND.png' w={35}/></InputRightAddon>
          </InputGroup>
        </InputGroup>
      </HStack>
    </div>
  )
}

export default ChatInput
