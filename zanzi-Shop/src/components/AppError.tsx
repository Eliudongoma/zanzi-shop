import { Button, Text, VStack } from "@chakra-ui/react";

interface ErrorProps {
  error: Error;
  onRetry?: () => void; // Optional retry function
  retryText?: string;   // Custom retry button text
  customTitle?: string;
}

const Error = ({ error, onRetry, retryText = "Retry", customTitle }: ErrorProps) => {
  return (
    <VStack gap={4} align="center" justify="center" minH="200px" p={4}>
      <Text fontSize="xl" color="red.500" fontWeight="bold">
        {customTitle  || "Oops, something went wrong!"}
      </Text>
      <Text fontSize="md" color="gray.600" textAlign="center">
        {error.message}
      </Text>
      {onRetry && (
        <Button
          colorScheme="blue"
          onClick={onRetry}
          size="md"
          px={6}
          _hover={{ bg: "blue.600" }}
        >
          {retryText}
        </Button>
      )}
    </VStack>
  );
};

export default Error;