import { useState } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Flex, Box, VStack, Input, Button, Spinner } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate  = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
        setLoading(true)
        try {
          await loginUser(email, password);
          toast.success('Login successful!');
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
            <form onSubmit={handleLogin}>
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
                  {isLoading ? <Spinner/> : "Login"}
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
  );
};

export default Login;
