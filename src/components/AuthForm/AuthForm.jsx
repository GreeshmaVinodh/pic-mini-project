import { Box, VStack, Flex, Text} from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./AuthForm.css"
// import GoogleAuth from "./GoogleAuth";


const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <Box className="box1" padding={4}>
      <VStack spacing={4}>
        <Text className='txt'>{isLogin ? "LOGIN" : "SIGN UP"}</Text>
          
        {isLogin ? <Login /> : <Signup />}

        {/* <Flex alignItems={'center'} justifyContent={'center'} my={0}  w={60} >
          <Box flex={2} h={"1px"} bg={"gray.500"} />
						<Text mx={1} color={"gray.500"}>
							or
						</Text>
					<Box flex={2} h={"1px"} bg={"gray.500"} />
        </Flex>
        
        <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"}/> */}

        <Box padding={5}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Box mx={2} fontSize={14}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Box>
            <Box onClick={() => setIsLogin(!isLogin)} color={"#127B7E"} cursor={"pointer"}>
              {isLogin ? "Sign up" : "Log in"}
            </Box>
          </Flex>
			</Box>
      </VStack>
    </Box> 
  )
}

export default AuthForm;
