import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Heading,
  Box,
  Grid,
  Text,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderAction";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currVal) => acc + currVal.price * (currVal.qty || 1),
      0
    );
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      console.log(clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
        console.log(sdkReady);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const orderDeliverHandler = () => dispatch(deliverOrder(order));

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <Flex w="full" py="2" direction="column" mt="2">
      <Grid
        templateColumns={{
          lg: "3fr 2fr",
          md: "1fr 1fr",
          sm: "1fr",
          base: "1fr",
        }}
        gap="20"
      >
        {/* {column1} */}
        <Flex direction="column" marginTop="1">
          <Box borderBottom="1px" py="6" borderColor="geen.900">
            {/* {shipping} */}
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Shipping
            </Heading>
            <Text>
              Name:<strong>{order.user.name}</strong>
            </Text>
            <Text>
              Email:
              <strong>
                <a
                  style={{ textDecoration: "underline" }}
                  href={`mailto:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </strong>
            </Text>
            <Text>
              Address:
              <strong>
                {" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </strong>
            </Text>
            <Text mt="2">
              {order.isDelivered ? (
                <Message type="success">
                  Delivered On {order.DeliveredAt}
                </Message>
              ) : (
                <Message type="error">Not Delivered</Message>
              )}
            </Text>
          </Box>
          {/* {Payment Method} */}
          <Box borderBottom="1px" py="6" borderColor="green.900">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Payment Method
            </Heading>
            <Text>
              <strong>Method: </strong>{" "}
              <span style={{ textTransform: "capitalize" }}>
                {order.paymentMethod}
              </span>
            </Text>
          </Box>
          {/* {Order items} */}
          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="3">
              Order Items
            </Heading>
            <Box>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <Box py="2">
                  {order.orderItems.map((item, idx) => (
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
                        {item.qty || 1} x ₹{item.price} = ₹
                        {(item.qty || 1) * item.price}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Flex>
        {/* {column 2} */}
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
                ₹{order.itemsPrice}
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
                ₹{order.shippingPrice}
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
                ₹{order.taxPrice}
              </Text>
            </Flex>

            {/* {total price} */}
            <Flex py="2" alignItems="center" justifyContent="space-between">
              <Text fontSize="xl">Items</Text>
              <Text fontWeight="bold" fontSize="xl" color="orange.900">
                ₹{order.totalPrice}
              </Text>
            </Flex>
          </Box>
          {!order.isPaid && (
            <Box>
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </Box>
          )}

          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <Button
              type="button"
              bgColor="green.900"
              colorScheme="white"
              onClick={orderDeliverHandler}
            >
              Mark As Delivered
            </Button>
          )}
        </Flex>
      </Grid>
    </Flex>
  );
};

export default OrderScreen;
