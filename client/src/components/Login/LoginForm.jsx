import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Box,
  Stack,
  Heading,
  Link,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { login } from "../../services/auth";
import useAuth from "../../hooks/useAuth";

const LoginForm = ({ onOpen }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setAuth, persist, setPersist } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, message } = await login(
        formData.email,
        formData.password
      );
      if (accessToken) {
        setAuth({ accessToken });
        setFormData({ email: "", password: "" });
        setError("");
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <Box border="3px solid" borderRadius="lg" p={8} w="500px" bg="cyan.100">
      <Heading textAlign="center" fontSize="5xl" mb={4} fontWeight="medium">
        Log In
      </Heading>
      <Text textAlign="center" fontSize="lg" mb={6} fontWeight="sm">
        Need an account? <Link onClick={() => onOpen()}>Click here</Link>.
      </Text>
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel requiredIndicator>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              focusBorderColor="black"
              border="1px solid"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel requiredIndicator>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              focusBorderColor="black"
              border="1px solid"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            mt={4}
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Checkbox
            isChecked={persist}
            onChange={togglePersist}
            colorScheme="teal"
            size="lg"
            p={1}
            borderColor="blackAlpha.900"
          >
            <Text fontSize="lg">Trust This Device</Text>
          </Checkbox>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
