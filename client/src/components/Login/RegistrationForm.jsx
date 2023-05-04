import { useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Box,
  useToast,
} from "@chakra-ui/react";
import { register } from "../../services/auth";

const RegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const toast = useToast();

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
        setFormData({ email: "", password: "" });
        setError("");
        onClose();
        toast({
          title: "Account Created!",
          description: "You may now log in.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  return (
    <Box>
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleRegister}>
        <Stack spacing={4} p={4} mb={3}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              focusBorderColor="black"
              border="1px solid"
            />
          </FormControl>
          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              focusBorderColor="black"
              border="1px solid"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg">
            Create Account
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
