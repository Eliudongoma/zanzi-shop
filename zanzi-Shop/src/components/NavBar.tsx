import { useCart } from "../hooks/useCart";
import { Badge, Box, Button, Link, Image, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchInput from "./SearchInput";
import { BsCart } from "react-icons/bs";
import { ColorModeButton } from "./ui/color-mode";
import { useCustomColor } from "../hooks/useCustomColor";


interface NavBarProps {
  onSearch: (search: string) => void;
}

const NavBar = ({ onSearch }: NavBarProps) => {
  const { items } = useCart();
  const {bgColor,textColor}=useCustomColor();

  return (
    <HStack bg={bgColor} padding="3px" color={textColor} justifyContent={"space-between"}>
        <Link asChild color={textColor} >
          <RouterLink to="/">
            <Image src={logo} boxSize="60px" rounded={100} />
          </RouterLink>
        </Link>
      <SearchInput onSearch={onSearch} />
      <Button
        asChild
        colorScheme="whiteAlpha"
        color={textColor}
        variant={"outline"}
      >
        <RouterLink to="/cart">
          <Box display="flex" alignItems="center">
            <BsCart/>
            <Badge rounded={40}>{items.length}</Badge>
          </Box>
        </RouterLink>
      </Button>
      <ColorModeButton/>
    </HStack>
  );
};

export default NavBar;
