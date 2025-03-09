import { useState } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Flex, Box, VStack, Button, Spinner, Heading, Fieldset } from "@chakra-ui/react";
import { useCustomColor } from "../../hooks/useCustomColor";
import useUserRole from "../../hooks/useUserRole";
import LoginSchema from "./LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../components/FormField";
import { z } from "zod";

type LoginFormValues = z.infer<typeof LoginSchema>

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate  = useNavigate();
  const [error, setError]  = useState<string | null>(null);
  const { textColor, bgColor, buttonBg, buttonText} = useCustomColor();
  const {role} = useUserRole();

  const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<LoginFormValues>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const onSubmit = async (data:LoginFormValues) => {
        setLoading(true)
        try {
          await loginUser(data.email, data.password);
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
            {error && <VStack align={"start"} color={textColor}>
              <p>{error} </p> <br/>
            </VStack>}
           
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={4}>
                <Fieldset.Root>
                  <FormField<LoginFormValues>
                  type="email"
                  label="Email address"
                  name="email"
                  register={register}
                  placeHolder="Enter email address"
                  error={errors.email}
                  />
                  <FormField<LoginFormValues>
                    type="passowrd"
                    togglePassword={true}
                    label="Password"
                    name="password"
                    register={register}
                    placeHolder="Enter your Password"
                    />
                </Fieldset.Root>               
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
