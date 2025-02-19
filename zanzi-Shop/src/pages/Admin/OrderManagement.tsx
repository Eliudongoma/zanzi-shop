import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  useDisclosure,
  Input,
  Textarea,
  Fieldset,
} from '@chakra-ui/react';
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../components/ui/dialog";
import { productService } from '../../services/api';
import { Product } from '../../types';
import { Field } from '../../components/ui/field';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { open, onOpen, onClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await productService.getAll();
    if (!data) return;
    //
    setProducts(data);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    onOpen();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
    await fetchProducts();
  };

  return (
    <Box>
      <Button colorScheme="teal" mb={4} onClick={() => {
        setEditingProduct(null);
        onOpen();
      }}>
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
          {products.map(product => (
            <Table.Row key={product._id}>
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
          <form onSubmit={handleSubmit}>
            <Fieldset.Content>
              <Field label="name">
                <Input defaultValue={editingProduct?.name} name="name" />
              </Field>
            </Fieldset.Content>
            <Fieldset.Content mt={4}>
              <Field label="description">
                <Textarea defaultValue={editingProduct?.description} name="description" />
              </Field>
            </Fieldset.Content>
            <Fieldset.Content mt={4}>
              <Field label="price">
                <Input defaultValue={editingProduct?.price} type="number" />
              </Field>
            </Fieldset.Content>
            <Button mt={4} colorScheme="teal" type="submit">
              Submit
            </Button>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
    </Box>
  );
};

export default ProductManagement;