import { useState } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Flex, Box, VStack, Input, Button, Spinner, Heading } from "@chakra-ui/react";
import { useCustomColor } from "../../hooks/useCustomColor";
import useUserRole from "../../hooks/useUserRole";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate  = useNavigate();
  const [error, setError]  = useState<string | null>(null);
  const { textColor, bgColor, buttonBg, buttonText} = useCustomColor();
  const {role} = useUserRole();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
        setLoading(true)
        try {
          await loginUser(email, password);
          toast.success('Login successful!');
          navigate(role === "admin" ? "/admin" : "/products");
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }    
  };

  return (
    <Flex height="100vh" align="center" justify="center">
          <Box
            bg={bgColor}
            p={8}
            rounded="lg"
            boxShadow="lg"
            width={{ base: "90%", md: "400px" }}
          >
            <Heading mb={5}>LOGIN</Heading>
            {error && <p color={textColor}>{error} <br/></p>}
           
            <form onSubmit={handleLogin}>
              <VStack gap={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  color={textColor}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" color={buttonText} bg={buttonBg} width="full" disabled={isLoading}>
                  {isLoading ? <Spinner/> : "Login"}
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
  );
};

export default Login;
