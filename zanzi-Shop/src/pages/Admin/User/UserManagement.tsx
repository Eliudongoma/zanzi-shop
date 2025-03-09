import { Box, Button, Table, useDisclosure } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../../components/ui/dialog";
import { useState } from "react";
import useFetchUsers from "../../../hooks/FetchData/useFetchUsers";
import { User } from "../../../types";
import { userService } from "../../../services/apiServices";
import UserForm from "./UserForm";
import AppError from "../../../components/AppError";
import Loading from "../../../components/Loading";

const UserManagement = () => {
  const { data: users, loading, fetchData, error, attempts } = useFetchUsers();
  const { open, onOpen, onClose } = useDisclosure();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const handleEdit = (user: User) => {
    setEditingUser(user);
    onOpen();
  };
  const handleDelete = async (id: string) => {
    try {
      await userService.delete(id);
      fetchData();
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };
  if (loading) {
      return <Loading message={`Loading products... (Attempt ${attempts + 1} of 3)`} />;
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
                <Button size="sm" mr={2} onClick={() => handleEdit(user)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(user.firebaseUid)}
                >
                  Delete
                </Button>
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
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default UserManagement;
