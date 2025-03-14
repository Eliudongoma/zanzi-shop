import React from 'react';
import { Box, Text, Button, VStack, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCustomColor } from '../hooks/useCustomColor';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const {textColor}=useCustomColor()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgGradient="linear(to-r, gray.800, black)"
      color= {textColor}
      textAlign="center"
    >
      <VStack gap={6}>
        <Heading fontSize="6xl">404</Heading>
        <Text fontSize="2xl">Oops! Page Not Found</Text>
        <Text fontSize="lg">The page you're looking for doesn't exist or has been moved.</Text>
        <Button colorScheme="yellow" onClick={() => navigate('/')}>Go Home</Button>
      </VStack>
    </Box>
  );
};
