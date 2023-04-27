import { useState } from "react";
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
} from "@chakra-ui/react";
import { login, register } from "../../services/auth";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { status, message } = await register(
        formData.email,
        formData.password
      );
      if (status === "success") {
        setFormData({ email: "", password: "" })
        setError("");
        setIsRegistering(false);
        alert("Account created!");
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, message } = await login(
        formData.email,
        formData.password
      );
      if (accessToken) {
        setUser(accessToken);
        setFormData({ email: "", password: "" })
        setError("");
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <Box bg="green.200" border="1px solid" borderRadius="lg" p={8} w="500px">
      <Heading
        textAlign="center"
        fontSize="xx-large"
        mb={4}
        fontWeight="medium"
      >
        Log In
      </Heading>
      {isRegistering ? (
        <Heading textAlign="center" fontSize="sm" mb={4} fontWeight="sm">
          Already have an account? Log in{" "}
          <Link onClick={() => setIsRegistering(false)}>here</Link>.
        </Heading>
      ) : (
        <Heading textAlign="center" fontSize="sm" mb={4} fontWeight="sm">
          Need an account? Sign up{" "}
          <Link onClick={() => setIsRegistering(true)}>here</Link>.
        </Heading>
      )}
      <form>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>

          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {isRegistering ? (
            <Button
              type="submit"
              colorScheme="green"
              mt={4}
              onClick={handleRegister}
            >
              Register
            </Button>
          ) : (
            <Button
              type="submit"
              colorScheme="green"
              mt={4}
              onClick={handleLogin}
            >
              Log In
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
