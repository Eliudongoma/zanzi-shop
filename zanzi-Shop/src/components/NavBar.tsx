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
  const {textColor, buttonBg, borderColor, bgColor, buttonText}=useCustomColor();

  return (
    <HStack padding="3px" color={textColor} bg={bgColor} justifyContent={"space-between"}>
        <Link asChild color={textColor} >
          <RouterLink to="/">
            <Image src={logo} boxSize="60px" rounded={100} />
          </RouterLink>
        </Link>
      <SearchInput onSearch={onSearch} />
      <Button
        asChild
        bg={buttonBg} color={buttonText} _hover={{ opacity: 0.8 }}
      >
        <RouterLink to="/cart">
          <Box display="flex" alignItems="center">
            <BsCart/>
            <Badge color={textColor} rounded={40}>{items.length}</Badge>
          </Box>
        </RouterLink>
      </Button>
      <ColorModeButton borderColor={borderColor} rounded={20}/>
    </HStack>
  );
};

export default NavBar;
