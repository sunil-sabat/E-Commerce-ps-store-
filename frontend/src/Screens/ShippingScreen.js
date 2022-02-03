import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Flex,
  FormControl,
  FormLabel,
  Spacer,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log(cart);

  const [address, setAddress] = useState(shippingAddress.address || "");

  const [city, setCity] = useState(shippingAddress.city || "");

  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.city || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <Flex alignItems="center" justifyContent="center" py="5" w="full" mt="3">
      <FormContainer>
        {/*Add checkout steps */}
        <CheckoutSteps step1 step2 />
        <Heading as="h1" fontSize="3xl" mb="8">
          Shipping
        </Heading>
        <form onSubmit={submitHandler}>
          {/* ADDRESS */}
          <FormControl id="address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Enter your addresss"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Input>
          </FormControl>

          <Spacer h="3" />
          {/* CITY */}
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              placeholder=" Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Input>
          </FormControl>

          <Spacer h="3" />
          {/* POSTALCODE */}
          <FormControl id="postalCode" isRequired>
            <FormLabel>PostalCode</FormLabel>
            <Input
              type="number"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Input>
          </FormControl>
          <Spacer h="3" />
          {/* COUNTRY */}
          <FormControl id="country" isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Input>
          </FormControl>

          <Button type="submit" mt="4" colorScheme="green">
            Continue ...
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default ShippingScreen;
