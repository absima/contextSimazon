import { useContext} from 'react';
// import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

import { ProjContext } from '../contexter';

export default function HomePart(props) {
  const {
    // api_url,
    products,
    // setProducts,
    loading,
    // setLoading,
    error,
    // setError,
    // cart,
    // setCart,
  } = useContext(ProjContext);
  

  console.log('products -- -- -- -- ', products);

  return (
    <Container>
      {/* <Row> */}
<Row className="mb-2">
  <Col>
    <h1>Latest Products</h1>
  </Col>
</Row>

<Row className="product-grid g-3 g-md-4">
  {loading ? (
    <LoadingIndicator />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    (products ?? []).map((product) => (
      <Product key={product._id} product={product} />
    ))
  )}
</Row>

    </Container>
  );
}
