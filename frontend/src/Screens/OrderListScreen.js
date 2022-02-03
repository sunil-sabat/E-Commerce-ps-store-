import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderAction";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { IoCloseCircleSharp } from "react-icons/io5";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Heading as="h1" mb="5" fontSize="3xl">
        Orders
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box
          bgColor="white"
          py="5"
          px="5"
          rounded="lg"
          shadow="lg"
          overflow={{ lg: "auto", md: "scroll", sm: "scroll", base: "scroll" }}
        >
          <Table size="sm" variant="striped" colorScheme="green">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>USER</Th>
                <Th>DATE</Th>
                <Th>TOTAL PRICE</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.user && order.user.name}</Td>
                  <Td>{order.createdAt.substring(0, 10)}</Td>
                  <Td>₹{order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Icon
                        as={IoCloseCircleSharp}
                        w="8"
                        h="8"
                        color="red.600"
                      />
                    )}
                  </Td>
                  <Td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <Icon
                        as={IoCloseCircleSharp}
                        w="8"
                        h="8"
                        color="red.600"
                      />
                    )}
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/orders/${order._id}`}
                        color="teal"
                      >
                        Details
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default OrderListScreen;
