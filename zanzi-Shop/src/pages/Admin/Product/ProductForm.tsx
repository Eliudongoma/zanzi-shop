import { Fieldset, Input, Textarea, Button } from "@chakra-ui/react";
import { Product } from "../../../types";
import { useCallback, useEffect } from "react";
import { productService } from "../../../services/api";
import ProductSchema from "./ProductSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "../../../components/ui/field";
import { v4 as uuidv4 } from "uuid";

interface ProductFormProps {
  setProducts: (products: Product[]) => void;
  onClose: () => void;
  editingProduct: Product | null;
}

const ProductForm = ({
  setProducts,
  onClose,
  editingProduct,
}: ProductFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      _id: editingProduct?._id || "",
      name: editingProduct?.name || "",
      description: editingProduct?.description || "",
      price: editingProduct?.price || 0,
      weight: editingProduct?.weight || 0,
      category: editingProduct?.category || "",
      imageUrl: editingProduct?.imageUrl || "",
      stock: editingProduct?.stock || 0,
    },
  });

  const onSubmit = async (data: Product) => {
    console.log(data);

    try {
      const newProduct = { ...data, _id: uuidv4() };
      await productService.create(newProduct);

      await fetchProducts();
      onClose();
    } catch (error) {
      console.log(error);
    }

    // Handle form submission
  };
  const fetchProducts = useCallback(async () => {
    try {
      const data = await productService.getAll();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field label="Name">
            <Input {...register("name")} />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
            )}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Description">
            <Textarea {...register("description")} />
            {errors.description && (
              <span style={{ color: "red" }}>{errors.description.message}</span>
            )}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Price">
            <Input {...register("price")} type="number" />
            {errors.price && (
              <span style={{ color: "red" }}>{errors.price.message}</span>
            )}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Weight">
            <Input {...register("weight")} />
            {errors.weight && (
              <span style={{ color: "red" }}>{errors.weight.message}</span>
            )}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Category">
            <Input {...register("category")} />
            {errors.category && (
              <span style={{ color: "red" }}>{errors.category.message}</span>
            )}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Image URL">
            <Input {...register("imageUrl")} />
            {errors.imageUrl && (
              <span style={{ color: "red" }}>{errors.imageUrl.message}</span>
            )}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Stock">
            <Input {...register("stock")} type="number" />
            {errors.stock && (
              <span style={{ color: "red" }}>{errors.stock.message}</span>
            )}
          </Field>
        </Fieldset.Content>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
};

export default ProductForm;
