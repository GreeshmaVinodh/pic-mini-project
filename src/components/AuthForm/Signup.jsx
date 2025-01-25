import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailandPassword from "../../hooks/useSignUpWithEmailandPassword";
import "./AuthForm.css";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    userType : "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { error, signup } = useSignUpWithEmailandPassword();
  return (
    <>
      <RadioGroup defaultValue='1'>
      <Stack spacing={4} direction='row'>
      <Radio value='Innovator'
      onChange={(e) => setInputs({ ...inputs, userType: e.target.value })}>
        Government Authorities
      </Radio>
      <Radio value='Organization'
      onChange={(e) => setInputs({ ...inputs, userType: e.target.value })}>
       Citizen</Radio>
     </Stack>
    </RadioGroup>
      <Input
        placeholder="Name"
        type="text"
        w={"full"}
        fontSize={"sm"}
        value={inputs.name}
        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
      />
      <Input
        placeholder="Username"
        type="text"
        w={"full"}
        fontSize={"sm"}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder="Email"
        type="email"
        w={"full"}
        fontSize={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          w={"full"}
          fontSize={"sm"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement h="full">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <button className="btn" onClick={() => signup(inputs)}>
        Signup
      </button>
    </>
  );
};

export default Signup;
