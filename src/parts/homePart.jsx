import { useContext, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

import { ProjContext } from '../contexter';

export default function HomePart(props) {
  const {
    api_url,
    products,
    setProducts,
    loading,
    setLoading,
    error,
    setError,
    // cart,
    // setCart,
  } = useContext(ProjContext);
  

  console.log('products -- -- -- -- ', products);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Latest Products</h1>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
