import { Fieldset, Input, Textarea, Button } from "@chakra-ui/react";
import { Product } from "../../../types";
import { useEffect, useState } from "react";
import { productService } from "../../../services/api";
import ProductSchema from "./ProductSchema";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "../../../components/ui/field";


const ProductForm = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { open, onOpen, onClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { handleSubmit, register, formState:{errors}, } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: editingProduct?.name || "",
      description: editingProduct?.description || "",
      price: editingProduct?.price || 0,  
      weight: editingProduct?.weight || "",
      category: editingProduct?.category || "",
      imageUrl: editingProduct?.imageUrl || "",
      stock: editingProduct?.stock || 0,
    },

  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = async (data: Product) => {
    try {
      await productService.create(data);

      await fetchProducts();
      onClose();
    } catch (error) {
      console.log(error);
    }

    // Handle form submission
  };
  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field label="Name">
            <Input {...register("name")} />
            {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Description">
            <Textarea
              {...register("description")}
            />
            {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Price">
            <Input {...register("price")} type="number" />
            {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Weight">
            <Input {...register("weight")} />
            {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Category">
            <Input {...register("category")} />
            {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Image URL">
            <Input {...register("imageUrl")} />
            {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}
          </Field>
        </Fieldset.Content>
        <Fieldset.Content mt={4}>
          <Field label="Stock">
            <Input {...register("stock")} type="number" />
            {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}
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
