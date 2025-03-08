import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../hooks/useAuth";
import {
  Flex,
  Box,
  VStack,
  Input,
  Button,
  Spinner,
  Fieldset,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RegisterSchema from "./RegisterSchema";
import { z } from "zod";
import { userService } from "../../services/apiServices";
import { useCustomColor } from "../../hooks/useCustomColor";
import useUserRole from "../../hooks/useUserRole";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const Register = () => {
  const { role } = useUserRole();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { textColor, bgColor, buttonBg, buttonText } = useCustomColor();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firebaseUid: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      registeredAt: new Date(),
      role: "admin",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      const firebaseUser = await registerUser(
        data.email,
        data.password,
        data.role
      );
      const userData = {
        ...data,
        firebaseUid: firebaseUser.uid,
      };
      const response = await userService.create(userData);
      toast.success(response.message);

      //Wait for role to be set by useUserRole
      const waitForRole = () => {
        return new Promise<void>((resolve) => {
          const checkRole = setInterval(() => {
            if (role) {
              clearInterval(checkRole);
              resolve();
            }
          }, 100);
        });
      };
      await waitForRole();
      navigate(role === "admin" ? "/admin" : "/products");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      return;
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4}>
            <Fieldset.Root color={textColor}>
              <Fieldset.Legend fontSize={40} mb={2} color={textColor}>
                Signup
              </Fieldset.Legend>
              <Fieldset.Content>
                <Field label="FirstName">
                  <Input {...register("firstName")} />
                  {errors.firstName && (
                    <span style={{ color: "red" }}>
                      {errors.firstName.message}
                    </span>
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
                <Field label="Password">
                  <Input {...register("password")} type="password" />
                  {errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.password.message}
                    </span>
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
            </Fieldset.Root>
            <Button
              type="submit"
              color={buttonText}
              bg={buttonBg}
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
