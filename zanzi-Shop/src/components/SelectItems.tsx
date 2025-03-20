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
  onchange: (value: string) => void;
  value: string;
};
const SelectItems = <T extends CollectProps>({
  collections,
  onchange,
  value,
}: SelectProps<T>) => {
  return (
    <SelectRoot
      collection={collections}
      value={[value]}
      onValueChange={(details) => {
        const selectedValue = details.value[0] || ""; // Take first value, default to empty string
        onchange(selectedValue); // Pass single string to parent
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
