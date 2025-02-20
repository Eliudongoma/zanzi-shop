import { Box, Button, Table } from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../../components/ui/dialog";
import { Product } from "../../../types";
import ProductForm from "./ProductForm";

const ProductManagement = () => {
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    onOpen();
  };

  return (
    <Box>
      <Button
        colorScheme="teal"
        mb={4}
        onClick={() => {
          setEditingProduct(null);
          onOpen();
        }}
      >
        Add New Product
      </Button>

      <Table.Root variant="line">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>Stock</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product, index) => (
            <Table.Row key={product._id || index}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>
                <Button size="sm" mr={2} onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red">
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogHeader>
          {/* <DialogTrigger /> */}
          <DialogBody>
            <ProductForm />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductManagement;
