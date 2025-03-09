import {
  Button,
  createListCollection,
  Fieldset,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { User } from "../../../types";
import { userService } from "../../../services/apiServices";
import RegisterSchema from "../../Authentication/RegisterSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";
import FormField from "../../../components/FormField";
import { useCustomColor } from "../../../hooks/useCustomColor";
import { useEffect, useState } from "react";
import SelectItems from "../../../components/SelectItems";

interface UserFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingUser: User | null;
}
const roles = createListCollection({
  items: [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ],
});

const UserForm = ({ onSuccess, onClose, editingUser }: UserFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firebaseUid: editingUser?.firebaseUid || "",
      firstName: editingUser?.firstName || "",
      lastName: editingUser?.lastName || "",
      email: editingUser?.email || "",
      phoneNumber: editingUser?.phoneNumber || "",
      password: editingUser?.password || "",
      registeredAt: editingUser?.registeredAt || new Date(),
      role: editingUser?.role || "user",
    },
  });

  const { buttonBg, buttonText } = useCustomColor();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingUser) {
      reset(editingUser);
    }
  }, [editingUser, reset]);
  const onSubmit = async (data: User) => {
    setIsLoading(true);
    try {
      if (editingUser) {
        const response = await userService.update(data.firebaseUid, data);
        toast.success(response.message);
      } else {
        const newUser = { ...data, _id: uuidv4() };
        const response = await userService.create(newUser);
        toast.success(response.message);
      }
      onSuccess();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <VStack gap={3}>
        <Fieldset.Root>
          <HStack>
            <FormField<User>
              label="First Name"
              name="firstName"
              register={register}
              placeHolder="Enter First Name"
              error={errors.firstName}
            />
            <FormField<User>
              label="LastName"
              name="lastName"
              register={register}
              placeHolder="Enter Last Name"
              error={errors.lastName}
            />
          </HStack>
          <FormField<User>
            label="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <HStack>
            <FormField<User>
              label="Phone Number"
              name="phoneNumber"
              register={register}
              error={errors.phoneNumber}
            />
            <FormField<User>
              name="role"
              register={register}
              error={errors.role}
              component="custom"
            >
              <SelectItems collections={roles} />
            </FormField>
          </HStack>
        </Fieldset.Root>
        <Button
          mt={4}
          bg={buttonBg}
          color={buttonText}
          type="submit"
          width="full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner />
          ) : editingUser ? (
            "Update User"
          ) : (
            "Create User"
          )}
        </Button>
      </VStack>
    </form>
  );
};

export default UserForm;
