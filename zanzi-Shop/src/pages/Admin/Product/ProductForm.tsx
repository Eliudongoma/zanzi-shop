import {
  Button,
  createListCollection,
  Fieldset,
  HStack,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Product } from "../../../types";
import { productService } from "../../../services/apiServices";
import ProductSchema from "../../../Schemas/ProductSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "../../../components/ImagePicker";
import toast from "react-hot-toast";
import axios from "axios";
import FormField from "../../../components/FormField";
import { useCustomColor } from "../../../hooks/useCustomColor";
import { useEffect, useState } from "react";
import SelectItems from "../../../components/SelectItems";

interface ProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingProduct: Product | null;
}
const categories = createListCollection({
  items: [
    { value: "foods & Bevarages", label: "Foods & Bevarages" },
    { value: "spices", label: "Spices" },
    { value: "electronics", label: "Electronics" },
    { value: "foods & Bevaragess", label: "Foods & Bevarages" },
    { value: "spicess", label: "Spices" },
    { value: "electronicss", label: "Electronics" },
  ],
});

const ProductForm = ({
  onSuccess,
  onClose,
  editingProduct,
}: ProductFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
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
  };
  const { buttonBg, buttonText } = useCustomColor();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    }
  }, [editingProduct, reset]);
  const onSubmit = async (data: Product) => {
    setIsLoading(true);
    try {
      if (editingProduct) {
        const response = await productService.update(data._id, data);
        toast.success(response.message);
      } else {
        const response = await productService.create(data);
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
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <VStack gap={3}>
        <Fieldset.Root>
          <FormField<Product>
            label="Name"
            name="name"
            register={register}
            placeHolder="Enter Product Name"
            error={errors.name}
          />
          <FormField<Product>
            label="Description"
            name="description"
            register={register}
            placeHolder="Enter Product Description"
            error={errors.description}
            component="textarea"
          />
          <HStack>
            <FormField<Product>
              label="Price"
              name="price"
              register={register}
              error={errors.price}
              type="number"
            />
            <FormField<Product>
              label="Weight"
              name="weight"
              register={register}
              error={errors.weight}
            />
          </HStack>
          <HStack>
            <FormField<Product>
              name="category"
              register={register}
              error={errors.category}
              component="custom"
            >
              <SelectItems
                collections={categories}
                value={watch("category") ? [watch("category")] : []}
                onchange={(value) => {
                  setValue("category", value[0] || ""); // Update form field with first value
                }}
              />
            </FormField>

            <FormField<Product>
              label="Stock"
              name="stock"
              register={register}
              error={errors.stock}
              type="number"
            />
          </HStack>
          <FormField<Product>
            label="Image URL"
            name="imageUrl"
            register={register}
            error={errors.imageUrl}
            component="custom"
          >
            <ImagePicker onUpload={handleImageUpload} />
            <Input type="hidden" {...register("imageUrl")} />
          </FormField>
        </Fieldset.Root>
        <Button
          mt={4}
          bg={buttonBg}
          color={buttonText}
          type="submit"
          width="full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner />
          ) : editingProduct ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </Button>
      </VStack>
    </form>
  );
};

export default ProductForm;
