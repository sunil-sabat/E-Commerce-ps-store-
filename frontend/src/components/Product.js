import { Link as RouterLink } from "react-router-dom";
import { Flex, Box, Image, Heading, Link, Text } from "@chakra-ui/react";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: "none" }}
    >
      <Box
        maxW="sm"
        borderRadius="lg"
        overflow="hidden"
        bgColor="whiteAlpha.800"
        transition="all"
        _hover={{ shadow: "md" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          minH="400px"
          objectFit="cover"
          maxH="400px"
          objectFit="cover"
          minW="100%"
        />
        <Flex py="5" px="4" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="3">
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <Text fontSize="2xl" fontWeight="medium" color="orange.900">
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Product;
