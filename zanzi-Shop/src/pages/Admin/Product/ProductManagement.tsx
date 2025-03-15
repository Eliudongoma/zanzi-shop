import { Box, Button, HStack, Table, useDisclosure } from "@chakra-ui/react";
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
import toast from "react-hot-toast";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { Tooltip } from "../../../components/ui/tooltip"
import { LuTrash2 } from "react-icons/lu";

const ProductManagement = () => {
  const { data: products, loading, fetchData, error } = useFetchProducts();
  const { open, onOpen, onClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    onOpen();
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await productService.delete(id);
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
  if (loading) {
    return <Loading message={'Loading products...'} />;
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
                <HStack>
                  <Tooltip showArrow content="Edit" >
                    <CiEdit size="25px" onClick={() => handleEdit(product)}>
                      Edit
                    </CiEdit>
                  </Tooltip>
                  <Tooltip showArrow content="Delete">
                    <LuTrash2
                      size="25px"
                      onClick={() => handleDelete(product._id)}
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
