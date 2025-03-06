import { Fieldset, Input, Textarea, Button } from "@chakra-ui/react";
import { Product } from "../../../types";
import { productService } from "../../../services/apiServices";
import ProductSchema from "./ProductSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "../../../components/ui/field";
import { v4 as uuidv4 } from "uuid";
import ImagePicker from "../../../components/ImagePicker";
import toast from "react-hot-toast";
import axios from "axios";

interface ProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingProduct: Product | null;
}

const ProductForm = ({
  onSuccess,
  onClose,
  editingProduct,
}: ProductFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      _id: editingProduct?._id || "",
      name: editingProduct?.name || "",
      description: editingProduct?.description || "",
      price: editingProduct?.price || 0,
      weight: editingProduct?.weight || "",
      category: editingProduct?.category || "",
      imageUrl: editingProduct?.imageUrl || "",
      stock: editingProduct?.stock || 0,
    },
  });
  const handleImageUpload = (imageUrl: string) => {
    setValue("imageUrl", imageUrl);
  }

  const onSubmit = async (data: Product) => {
    try {
      if(editingProduct){
        const response = await productService.update(data._id,data);
        toast.success(response.message)
      }else{
        const newProduct = { ...data, _id: uuidv4() };
        const response = await productService.create(newProduct);
        toast.success(response.message)
      }
      onSuccess();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

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
            <ImagePicker onUpload={handleImageUpload}/>
            {errors.imageUrl && (
              <span style={{ color: "red" }}>{errors.imageUrl.message}</span>
            )}
          </Field>
          <Input type="hidden" {...register("imageUrl")} />
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
