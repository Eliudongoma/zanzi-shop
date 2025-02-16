import React from "react";
import { useCart } from "../hooks/useCart";
import { Badge, Box, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const { items } = useCart();

  return (
    <Box bg={"teal.500"} color={"white"} px={4} py={3}>
      <Flex
        maxW="container.xl"
        mx="auto"
        justify="space-between"
        align="center"
      >
        <Flex gap={4}>
          <Link asChild color="white">
            <RouterLink to="/">Home</RouterLink>
          </Link>
          <Link asChild color="white">
            <RouterLink to="/products">Products</RouterLink>
          </Link>
          <Flex gap={4} align="center">
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
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
