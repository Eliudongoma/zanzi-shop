import { Box, Button, HStack, Table, useDisclosure } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../../components/ui/dialog";
import { useEffect, useState } from "react";
import useFetchUsers from "../../../hooks/FetchData/useFetchUsers";
import { User } from "../../../types";
import { userService } from "../../../services/apiServices";
import UserForm from "./UserForm";
import AppError from "../../../components/AppError";
import Loading from "../../../components/Loading";
import { CiEdit } from "react-icons/ci";
import { LuTrash2 } from "react-icons/lu";
import { Tooltip } from "../../../components/ui/tooltip";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";

const UserManagement = () => {
  const { data: users, loading, fetchData, error } = useFetchUsers();
  const { open, onOpen, onClose } = useDisclosure();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
  const handleEdit = (user: User) => {
    console.log("Editing user:", user);
    setEditingUser(user);
    onOpen();
  };
  const handleDelete = async (id: string) => {
    // console.log(id)
    try {
      const response = await userService.delete(id);
      toast.success(response.message)
      fetchData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !isInitialFetchDone) {
        console.log("Fetching users due to auth state change...");
        fetchData().then(() => {
          setIsInitialFetchDone(true); // Mark fetch as done
        });
      }
    });
    return () => unsubscribe();
  }, [fetchData, isInitialFetchDone]);
  
  if (loading) {
      return <Loading message={`Loading users...)`} />;
    }
  
    if (error) {
      return <AppError error={error} onRetry={fetchData} />;
    }

  return (
    <Box>
      <Button
        colorScheme="teal"
        mb={4}
        onClick={() => {
          setEditingUser(null);
          onOpen();
        }}
      >
        Add New user
      </Button>

      <Table.Root variant="line">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>First Name</Table.ColumnHeader>
            <Table.ColumnHeader>Last Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email Address</Table.ColumnHeader>
            <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={user.firebaseUid || index}>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phoneNumber}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <HStack>
                  <Tooltip showArrow content="Edit">
                    <CiEdit size="25px" onClick={() => handleEdit(user)}>
                      Edit
                    </CiEdit>
                  </Tooltip>
                  <Tooltip showArrow content="Delete">
                    <LuTrash2
                      size="25px"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </LuTrash2>
                  </Tooltip>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent
          style={{
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <DialogHeader>
            {editingUser ? "Edit user" : "Add New user"}
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody
            style={{
              maxHeight: "60vh",
              overflow: "auto",
              padding: "1rem",
            }}
          >
            <UserForm
              onSuccess={fetchData}
              onClose={onClose}
              editingUser={editingUser}
            />
            {/* <Register/> */}
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default UserManagement;
