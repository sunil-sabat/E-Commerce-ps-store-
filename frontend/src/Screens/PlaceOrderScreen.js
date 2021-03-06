import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Box,
  Grid,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderAction";
import { useEffect } from "react";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, currVal) => acc + currVal.price * currVal.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice < 1000 ? 1000 : 0;
  cart.taxPrice = (18 * cart.itemsPrice) / 100;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order, error } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingPrice: cart.shippingPrice,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    console.log(order);
    if (success) {
      navigate(`/orders/${order._id}`);
    }
  }, [success]);

  return (
    <Flex w="full" py="5" direction="column">
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid
        templateColumns={{
          lg: "3fr 2fr",
          md: "1fr 1fr",
          sm: "1fr",
          base: "1fr",
        }}
        gap="20"
      >
        <Flex direction="column">
          <Box borderBottom="1px" py="6" borderColor="geen.900">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Shipping
            </Heading>
            <Text>
              <strong>Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Text>
          </Box>

          <Box borderBottom="1px" py="6" borderColor="green.900">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Payment Method
            </Heading>
            <Text>
              <strong>Method: </strong>{" "}
              <span style={{ textTransform: "capitalize" }}>
                {cart.paymentMethod}
              </span>
            </Text>
          </Box>
          <Box borderBottom="1px" py="6" borderColor="green.900">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Order Items
            </Heading>
            <Box>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <Box py="2">
                  {cart.cartItems.map((item, idx) => (
                    <Flex
                      key={idx}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Flex py="2" alignItems="center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="12"
                          h="12"
                          objectFit="cover"
                          mr="6"
                        />
                        <Link
                          as={RouterLink}
                          to={`/product/${item.product}`}
                          fontWeight="medium"
                          fontSize="xl"
                        >
                          {item.name}
                        </Link>
                      </Flex>
                      <Text fontSize="lg" fontWeight="semibold">
                        {item.qty || 1} x ???{item.price} = ???
                        {(item.qty || 1) * item.price}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Flex>
        {/* {COLUMN 2} */}
        <Flex
          direction="column"
          bgColor="white"
          justifyContent="space-between"
          py="8"
          px="8"
          shadow="md"
          rounded="lg"
          borderColor="green.900"
        >
          <Box>
            <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
              Order Summery
            </Heading>
            {/* {item price} */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="green.900"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Items</Text>
              <Text fontWeight="bold" fontSize="xl">
                ???{cart.itemsPrice}
              </Text>
            </Flex>

            {/* {Shipping  price} */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="green.900"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Shipping</Text>
              <Text fontWeight="bold" fontSize="xl">
                ???{cart.shippingPrice}
              </Text>
            </Flex>

            {/* {Tax price} */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="green.900"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Tax</Text>
              <Text fontWeight="bold" fontSize="xl">
                ???{cart.taxPrice}
              </Text>
            </Flex>

            {/* {total price} */}
            <Flex py="2" alignItems="center" justifyContent="space-between">
              <Text fontSize="xl">Items</Text>
              <Text fontWeight="bold" fontSize="xl" color="orange.900">
                ???{cart.totalPrice}
              </Text>
            </Flex>
          </Box>
          {error && <Message type="error">{error}</Message>}

          <Button
            size="lg"
            textTransform="uppercase"
            colorScheme="yellow"
            type="button"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};
export default PlaceOrderScreen;
