import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// get all products from redux
import {
  getAllProducts,
  selectProducts,
  selectLoading,
  selectError,
} from '../redux/productSlice';
import { Col, Container, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';

export default function HomePart(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

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

