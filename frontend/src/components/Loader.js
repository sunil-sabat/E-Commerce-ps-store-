import { Spinner, Flex } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.900"
        size="xl"
        label="Loading..."
      />
    </Flex>
  );
};

export default Loader;
