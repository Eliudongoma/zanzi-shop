import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../hooks/useAuth";
import { Flex, Box, VStack, Input, Button, Spinner, Fieldset } from "@chakra-ui/react";
import { User } from "../../types";
import { Field } from "../../components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RegisterSchema from "./RegisterSchema";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firebaseUid: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      registeredAt: new Date(),
      role: "user",
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(email, password);
      toast.success("Registration successful!");
      navigate("/"); // Redirect to home or dashboard
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
            <Fieldset.Root>
              <Fieldset.Content>
                <Field label="FirstName">
                  <Input {...register("firstName")} />
                  {errors.firstName && (
                    <span style={{ color: "red" }}>{errors.firstName.message}</span>
                  )}
                </Field>
              </Fieldset.Content>
              <Fieldset.Content mt={4}>
                <Field label="LastName">
                  <Input {...register("lastName")} />
                  {errors.lastName && (
                    <span style={{ color: "red" }}>
                      {errors.lastName.message}
                    </span>
                  )}
                </Field>
              </Fieldset.Content>
              <Fieldset.Content mt={4}>
                <Field label="Email">
                  <Input {...register("email")} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}
                </Field>
              </Fieldset.Content>
              <Fieldset.Content mt={4}>
                <Field label="Phone Number">
                  <Input {...register("phoneNumber")} />
                  {errors.phoneNumber && (
                    <span style={{ color: "red" }}>
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </Field>
              </Fieldset.Content>
              <Fieldset.Content mt={4}>
                <Field label="Category">
                  <Input {...register("password")} type="password"/>
                  {errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.password.message}
                    </span>
                  )}
                </Field>
              </Fieldset.Content>
              
            </Fieldset.Root>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Register"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
