import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../hooks/useAuth";
import { Flex, Box, VStack, Input, Button, Spinner } from "@chakra-ui/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      await registerUser(email, password);
      toast.success('Registration successful!');
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }    
  };

  return (
    <Flex height="100vh" align="center" justify="center">
      <Box
        bg="gray.100"
        p={8}
        rounded="lg"
        boxShadow="lg"
        width={{ base: "90%", md: "400px" }}
      >
        <form onSubmit={handleRegister}>
          <VStack gap={4}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              required
            />
            <Button type="submit" colorScheme="blue" width="full" disabled={isLoading}>
              {isLoading ? <Spinner/> : "Register"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
