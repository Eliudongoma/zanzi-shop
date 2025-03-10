import { Box, Button, Table, useDisclosure } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../../components/ui/dialog";
import { Product } from "../../../types";
import ProductForm from "./ProductForm";
import { useState } from "react";
import useFetchProducts from "../../../hooks/FetchData/useFetchProducts";
import { productService } from "../../../services/apiServices";
import Loading from "../../../components/Loading";
import AppError from "../../../components/AppError";

const ProductManagement = () => {
  const { data: products, loading, fetchData, error, attempts } = useFetchProducts();
  const { open, onOpen, onClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    onOpen();
  };
  const handleDelete = async (id: string) => {
    try {
      await productService.delete(id);
      fetchData();
    } catch (error) {
      console.log("Error deleting Product", error);
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
              <Table.Cell>ksh {product.price}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>
                <Button size="sm" mr={2} onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(product._id)}
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
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody
            style={{
              maxHeight: "60vh",
              overflow: "auto",
              padding: "1rem",
            }}
          >
            <ProductForm
              onSuccess={fetchData}
              onClose={onClose}
              editingProduct={editingProduct}
            />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductManagement;
