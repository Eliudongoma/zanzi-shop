import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
  SelectItem,
  SelectContent,
  SelectLabel,
} from "@chakra-ui/react";

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
const SelectCategory = () => {
  return (
    <SelectRoot collection={categories} >
      <SelectLabel>Product Category</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select Category" />
      </SelectTrigger>

      <SelectContent position={"absolute"} mt={10}>
        {categories.items.map((cat) => (
          <SelectItem key={cat.value} item={cat.value}>
            {cat.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default SelectCategory;
