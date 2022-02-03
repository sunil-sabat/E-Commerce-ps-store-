import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Button,
  Heading,
} from "@chakra-ui/react";
import { savePaymentMethod } from "../actions/cartAction";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(
    paymentMethod || "paypal"
  );

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log();
    dispatch(savePaymentMethod(paymentMethodRadio));
    navigate("/placeOrder");
  };

  return (
    <Flex justifyContent="center " mt="5">
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Heading as="h1" mb="8" fontSize="3xl">
          Payment Method
        </Heading>
        <form onSubmit={submitHandler}>
          <FormControl as="fieldset">
            <FormLabel as="legend">
              <RadioGroup defaultValue={paymentMethodRadio}>
                <HStack spacing="24px">
                  <Radio
                    value="paypal"
                    onChange={(e) => setPaymentMethodRadio(e.target.value)}
                  >
                    payment or credit/debit card
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormLabel>
          </FormControl>
          <Button type="submit" mt="4" colorScheme="green">
            Continue...
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default PaymentScreen;
