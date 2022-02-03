import { Flex, Text } from "@chakra-ui/react";
const date = new Date();

const Footer = () => {
  return (
    <Flex as="footer" justifyContent="center" py="6">
      <Text>
        @Copyright {date.getFullYear()}. P-store all rights are reserved.
      </Text>
    </Flex>
  );
};

export default Footer;
