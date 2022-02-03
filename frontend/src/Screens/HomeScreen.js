import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Grid } from "@chakra-ui/react";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Heading as="h2" fontSize="3xl" mb="8" color="green.900">
        Latest Products
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            lg: "repeat(4, 1fr)",
            md: "1fr 1fr 1fr",
            sm: "1fr 1fr",
            base: "1fr",
          }}
          gap="8"
        >
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
