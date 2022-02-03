import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  Button,
  Divider,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Link,
} from "@chakra-ui/react";
import Rating from "../components/Rating";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };
  console.log(product);
  return (
    <>
      <Flex mb="5">
        <Button as={RouterLink} to="/" bgColor="green.900" colorScheme="white">
          Go Back
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid
            templateColumns={{
              lg: "5fr 4fr 3fr",
              md: "1fr 1fr 1fr",
              sm: "1fr 1fr ",
              base: "1fr ",
            }}
            gap="10"
          >
            {/* Column 1 */}
            <Image
              src={product.image}
              alt={product.name}
              borderRadius="md"
              mt="4"
            />

            {/* Column 2 */}
            <Flex direction="column">
              <Heading as="h6" fontSize="base" color="gray.500">
                {product.brand}
              </Heading>
              <Heading as="h2" fontSize="4xl" mb="2">
                {product.name}
              </Heading>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <Heading
                as="h5"
                my="5"
                fontSize="4xl"
                fontWeight="bold"
                color="orange.900"
              >
                ₹{product.price}
              </Heading>
              <Text>{product.description}</Text>
            </Flex>

            {/* Column 3 */}
            <Flex direction="column">
              <Flex justifyContent="space-between" py="2">
                <Text>Price:</Text>
                <Text fontWeight="bold">₹{product.price}</Text>
              </Flex>

              <Flex justifyContent="space-between" py="2">
                <Text>Status:</Text>
                <Text fontWeight="bold">
                  {product.countInStock > 0 ? "In Stock" : "Not Available"}
                </Text>
              </Flex>

              <Divider />

              {product.countInStock > 0 && (
                <Flex justifyContent="space-between" py="2">
                  <Text>Qty:</Text>
                  <Select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    width="30%"
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}

              <Button
                textTransform="uppercase"
                letterSpacing="wide"
                colorScheme="white"
                bgColor="green.900"
                my="2"
                _hover={{ color: "orange.200" }}
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Flex>
          </Grid>

          {/* Review form */}
          <Box mt="10">
            <Box>
              <Heading as="h2" size="xl" mb="4">
                Reviews
              </Heading>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}

              <Box p="4" bgColor="white" rounded="md" mb="1">
                {product.reviews.map((review) => (
                  <Flex direction="column" key={review._id} mb="5">
                    <Flex justifyContent="space-between">
                      <Text fontSize="lg">
                        <strong>{review.name}</strong> on {console.log(review)}
                        {console.log(review.createdAt)}
                        {review.createdAt.substring(0, 10)}
                      </Text>
                      <Rating value={review.rating} />
                    </Flex>
                    <Text mt="2">{review.comment}</Text>
                  </Flex>
                ))}
              </Box>

              {/* FORM */}
              <Box
                p="10"
                bgColor="white"
                rounded="md"
                mt="10"
                border="2px"
                borderColor="gray.300"
              >
                <Heading as="h3" size="lg" mb="6">
                  Write a review
                </Heading>

                {errorProductReview && (
                  <Message type="error">{errorProductReview}</Message>
                )}

                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <FormControl id="rating" mb="3">
                      <FormLabel>Rating</FormLabel>
                      <Select
                        placeholder="Select option"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option>Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Okay</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Execellent</option>
                      </Select>
                    </FormControl>

                    <FormControl id="comment" mb="3">
                      <FormLabel>Comment</FormLabel>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Textarea>
                    </FormControl>

                    <Button
                      colorScheme="white"
                      bgColor="green.900"
                      type="submit"
                    >
                      Post Review
                    </Button>
                  </form>
                ) : (
                  <Message>
                    Please{" "}
                    <Link as={RouterLink} to="/login">
                      login
                    </Link>{" "}
                    to write a review
                  </Message>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductScreen;
