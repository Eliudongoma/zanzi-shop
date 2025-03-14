import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  ListCollection,
} from "@chakra-ui/react";

interface CollectProps {
  value: string;
  label: string;
}
type SelectProps<T extends CollectProps> = {
  collections: ListCollection<T>;
  onchange: (value: string|string[]) => void;
  value: string[];
};
const SelectItems = <T extends CollectProps>({
  collections,
  onchange,
  value,
}: SelectProps<T>) => {
  return (
    <SelectRoot
      collection={collections}
      value={value}
      onValueChange={(details) => {
        // Chakra UI's SelectRoot provides selected value(s) via onValueChange
        const selectedValue = details.value; // This is an array of selected values
        onchange(selectedValue); // Pass the array to the parent
      }}
    >
      {/* <SelectLabel></SelectLabel> */}
      <SelectTrigger>
        <SelectValueText placeholder="Select" />
      </SelectTrigger>

      <SelectContent position={"absolute"} mt={10}>
        {collections.items.map((cat) => (
          <SelectItem key={cat.value} item={cat.value}>
            {cat.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default SelectItems;
