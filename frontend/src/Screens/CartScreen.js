import {
  Flex,
  Text,
  Grid,
  Heading,
  Box,
  Image,
  Link,
  Select,
  Button,
  Icon,
} from "@chakra-ui/react";
import {
  Link as RouterLink,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { IoTrashBinOutline } from "react-icons/io5";
import { useEffect } from "react";

const CartScreen = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { id: productId } = useParams();
  let qty = searchParams.get("qty");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <Grid gridTemplateColumns="3">
      <Box>
        <Heading mb="8" textColor="green.900">
          Shopping Cart
        </Heading>
        <Flex>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is Empty.{" "}
              <Link as={RouterLink} to="/">
                Go Back
              </Link>
            </Message>
          ) : (
            <Grid
              templateColumns={{
                lg: "4fr 2fr",
                md: "1fr 1fr",
                sm: "1fr",
                base: "1fr",
              }}
              gap="10"
              width="full"
            >
              <Flex direction="column">
                {cartItems.map((item) => (
                  <Grid
                    key={item.product}
                    size="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px"
                    borderColor="green.900"
                    py="4"
                    px="2"
                    rounded="lg"
                    templateColumns={{
                      lg: "1fr 4fr 2fr 2fr 1fr ",
                      md: "1fr lfr 1fr 1fr 1fr",
                      sm: "1fr 1fr 1fr 1fr ",
                      base: "1fr 1fr",
                    }}
                  >
                    {/* {product image} */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      borderRadius="lg"
                      height="14"
                      objectFit="cover"
                    />

                    {/* {product name} */}
                    <Text fontWeight="semibold" fontSize="lg">
                      <Link as={RouterLink} to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Text>
                    {/* {product price} */}
                    <Text fontWeight="bold" fontSize="lg" color="orange.900">
                      ₹{item.price}
                    </Text>
                    {/* {quantity select box} */}
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                      borderColor="green.900"
                      width="20"
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>
                    {/* {delete button} */}
                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() => removeFromCartHandler(item.product)}
                      borderColor="green.900"
                    >
                      <Icon as={IoTrashBinOutline}></Icon>
                    </Button>
                  </Grid>
                ))}
              </Flex>
              <Flex
                direction="column"
                border="1px"
                borderWidth="2"
                borderColor="green.900"
                rounded="md"
                padding="5"
                height="48"
                justifyContent="space-between"
              >
                <Flex direction="column">
                  <Heading as="h2" fontSize="2xl" mb="2" color="gray.900">
                    Subtotal(
                    {cartItems.reduce(
                      (acc, currVal) => acc + (+currVal.qty || 1),
                      0
                    )}
                    )items
                  </Heading>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color="orange.900"
                    mb="4"
                  >
                    ₹
                    {cartItems.reduce(
                      (acc, currVal) =>
                        acc + (currVal.qty || 1) * currVal.price,
                      0
                    )}
                  </Text>
                  <Button
                    type="button"
                    disabled={cartItems.length === 0}
                    size="lg"
                    colorScheme="orange"
                    bgColor="green.900"
                    onClick={checkoutHandler}
                  >
                    Proceed To CheckOut
                  </Button>
                </Flex>
              </Flex>
            </Grid>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default CartScreen;
