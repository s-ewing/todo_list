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
} from "@chakra-ui/react";
import login from "../../services/auth";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await login(formData.email, formData.password);
      setUser(token);
      alert("Success!");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <Box bg="green.200" border="1px solid" borderRadius="lg" p={8}>
      <Heading textAlign="center" fontSize="xx-large" mb={4} fontWeight="medium">Log In</Heading>
      <form onSubmit={handleLogin}>
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

          <Button type="submit" colorScheme="green" mt={4}>
            Log In
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
