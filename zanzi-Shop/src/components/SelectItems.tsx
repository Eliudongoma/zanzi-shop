import { SelectRoot, SelectLabel, SelectTrigger, SelectValueText, SelectContent, SelectItem, ListCollection } from '@chakra-ui/react'

interface CollectProps{
  value: string;
  label: string;
}
type SelectProps<T extends CollectProps> = {
  collections: ListCollection<T>
}
const SelectItems = <T extends CollectProps>({collections} : SelectProps<T>) => {
  return (
    <SelectRoot collection={collections} >
          <SelectLabel>Product Category</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select Category" />
          </SelectTrigger>
    
          <SelectContent position={"absolute"} mt={10}>
            {collections.items.map((cat) => (
              <SelectItem key={cat.value} item={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
  )
}

export default SelectItems
