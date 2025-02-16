import { useRef } from "react";
import { InputGroup } from "./ui/input-group";
import { BsSearch } from "react-icons/bs";
import { Input } from "@chakra-ui/react";

interface SearchInputProps {
  onSearch: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }: SearchInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(ref.current?.value ?? "");
    }}>
      <InputGroup flex={1} startElement= {<BsSearch />}>
      <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search products..."
          variant="flushed"
        />
      </InputGroup>
    </form>
  );
}

export default SearchInput;