import { useCart } from "../hooks/useCart";
import { Badge, Box, Button, Link, Image, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchInput from "./SearchInput";

interface NavBarProps {
  onSearch: (search: string) => void;
}

const NavBar = ({ onSearch }: NavBarProps) => {
  const { items } = useCart();

  return (
    <HStack padding="3px" color="white">
      <Link asChild color="white">
        <RouterLink to="/">
          <Image src={logo} boxSize="60px" rounded={100} />
        </RouterLink>
      </Link>
      <SearchInput onSearch={onSearch} />
      <Button
        asChild
        colorScheme="whiteAlpha"
        color="white"
        variant={"outline"}
      >
        <RouterLink to="/cart">
          <Box display="flex" alignItems="center" gap={2}>
            <span>Cart</span>
            <Badge>{items.length}</Badge>
          </Box>
        </RouterLink>
      </Button>
    </HStack>
  );
};

export default NavBar;
