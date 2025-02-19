import { useCart } from "../hooks/useCart";
import {
  Box,
  Link,
  Image,
  HStack,
  Float,
  Circle,
} from "@chakra-ui/react";
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
  const { textColor, accentColor, borderColor, bgColor } =
    useCustomColor();

  return (
    <HStack
      padding="3px"
      color={textColor}
      bg={bgColor}
      justifyContent={"space-between"}
    >
      <Link asChild color={textColor}>
        <RouterLink to="/">
          <Image src={logo} boxSize="60px" rounded={100} />
        </RouterLink>
      </Link>
      <SearchInput onSearch={onSearch} />

      <RouterLink to="/cart">
        <Box
          position="relative"  bg="transparent" _hover={{ opacity: 0.8 }}
        >
          <BsCart size="20"/>
          <Float>
            <Circle size="5" color={textColor}  bg={accentColor}>
              {items.length}
            </Circle>
          </Float>
        </Box>
      </RouterLink>
      <ColorModeButton borderColor={borderColor} rounded={20} />
    </HStack>
  );
};

export default NavBar;
