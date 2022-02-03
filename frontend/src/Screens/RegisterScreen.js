import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
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

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Flex width="full" alignItems="center" justifyContent="center" py="8">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Register
        </Heading>

        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}

        <form onSubmit={SubmitHandler}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              required
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input
              required
              type="email"
              placeholder="username@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </FormControl>{" "}
          <Spacer h="3" />
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              required
              type="password"
              placeholder="Confidential"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </FormControl>
          <Spacer h="3" />
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              required
              type="password"
              placeholder="Type password again"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </FormControl>
          <Button type="submit" isLoading={loading} mt="4" colorScheme="green">
            Register
          </Button>
        </form>

        <Flex pt="5">
          <Text fontWeight="semibold">
            Have an account?
            <Link
              as={RouterLink}
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Login
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default RegisterScreen;
