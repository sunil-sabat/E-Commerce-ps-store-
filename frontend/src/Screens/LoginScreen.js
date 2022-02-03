import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Button,
  Text,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Input,
  Spacer,
} from "@chakra-ui/react";

import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { CART_ITEMS_RESET } from "../constants/cartConstants";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect.length > 1 ? `/${redirect}` : `${redirect}`);
    }
  }, [userInfo, navigate, redirect]);

  const SubmitHandler = (e) => {
    dispatch({ type: CART_ITEMS_RESET });
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Flex
      width="full"
      alignItems="center"
      justifyContent="center"
      py="8"
      mt="4"
    >
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          LogIn
        </Heading>
        {error && <Message type="error">{error}</Message>}
        <form onSubmit={SubmitHandler}>
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="username@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </FormControl>{" "}
          <Spacer h="3" />
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Confidential"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button
              type="submit"
              isLoading={loading}
              mt="4"
              colorScheme="green"
            >
              Login
            </Button>
          </FormControl>
        </form>
        <Flex pt="5">
          <Text fontWeight="semibold">
            New Customer ?
            <Link
              as={RouterLink}
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              <Spacer h="2" />
              Register
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default LoginScreen;
