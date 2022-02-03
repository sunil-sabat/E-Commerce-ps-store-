import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUser, deleteUser } from "../actions/userActions";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import {
  IoCheckmarkCircleSharp,
  IoPencilSharp,
  IoCloseCircleSharp,
  IoTrashBinSharp,
} from "react-icons/io5";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUser());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure ?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <Heading as="h1" mb="2" fontSize="3xl" mt="3">
        Users
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box
          overflow={{ lg: "auto", md: "scroll", sm: "scroll", base: "scroll" }}
          bgColor="white"
          rounded="lg"
          px="5"
          py="5"
          mt="5"
        >
          <Table variant="striped" colorScheme="green" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>EMAIL</Th>
                <Th>ADMIN</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Td>
                  <Td>
                    {user.isAdmin ? (
                      <Icon
                        as={IoCheckmarkCircleSharp}
                        color="green.600"
                        w="8"
                        h="8"
                      />
                    ) : (
                      <Icon
                        as={IoCloseCircleSharp}
                        color="red.600"
                        w="8"
                        h="8"
                      />
                    )}
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/user/${user._id}/edit`}
                        colorScheme="orange"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
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

export default UserListScreen;
