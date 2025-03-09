import { Spinner, Text, VStack } from "@chakra-ui/react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <VStack gap={4} align="center" justify="center" minH="200px">
      <Spinner size="xl" color="blue.500" borderWidth="4px" animationDuration="0.65s" />
      <Text fontSize="lg" color="gray.600">
        {message}
      </Text>
    </VStack>
  );
};

export default Loading;