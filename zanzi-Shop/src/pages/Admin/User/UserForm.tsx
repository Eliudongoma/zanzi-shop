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
import toast from "react-hot-toast";
import axios from "axios";
import FormField from "../../../components/FormField";
import { useCustomColor } from "../../../hooks/useCustomColor";
import {  useEffect, useState } from "react";
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
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      _id:editingUser?._id || "",
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
      console.log("Editing user:", editingUser);
    }
  }, [editingUser, reset]);
  const onsubmit = async (data: User) => {
    console.log("Form data submitted:", data);
    console.log("Editing user:", editingUser);
    // console.log(data)
    console.log("Loading state false");
    setIsLoading(true);
    try {
      if (editingUser) {
        const response = await userService.update(data._id, data);
        toast.success(response.message);
      } else {
        const response = await userService.create(data);
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
      console.log("Loading state false");
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (data: User) => {
    console.log("Form submit triggered with data:", data);
    onsubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
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
              label="Last Name"
              name="lastName"
              register={register}
              placeHolder="Enter Last Name"
              error={errors.lastName}
            />
          </HStack>
          <HStack>
            <FormField<User>
              label="Email"
              name="email"
              register={register}
              error={errors.email}
            />
           {!editingUser && <FormField<User>
              label="Password"
              name="password"
              register={register}
              type="password"
              error={errors.password}
              togglePassword={true}
            />}
          </HStack>
          <HStack>
            <FormField<User>
              label="Phone Number"
              name="phoneNumber"
              register={register}
              error={errors.phoneNumber}
            />
            <FormField<User>
              label="Role"
              name="role"
              register={register}
              error={errors.role}
              component="custom"
            >
              <SelectItems
                collections={roles}
                value={watch("role") ? [watch("role")] : []}
                onchange={(value) => {
                  setValue("role", (value[0] as "admin" | "user") || ""); // Update form field with first value
                }}
              />
            </FormField>
          </HStack>
        </Fieldset.Root>
        <Button
          type="submit"
          bg={buttonBg}
          color={buttonText}
          disabled={isLoading}
          width={"full"}
        >
          {isLoading ? <Spinner /> : editingUser ? "Update User" : "Create User"}
        </Button>
      </VStack>
    </form>
  );
};

export default UserForm;
