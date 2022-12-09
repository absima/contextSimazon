// parts to include in the main page
import { Col, Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/productSlice';
import { selectUser } from '../redux/userSlice';
import { selectLoading, selectError } from '../redux/productSlice';
import { getAllProducts } from '../redux/productSlice';
import { useEffect } from 'react';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import Product from '../components/product';
import SearchPart from '../parts/searchPart';
import HeaderPart from '../parts/headerPart';
import FooterPart from '../parts/footerPart';
import { selectProducts } from '../redux/productSlice';

export default function MainPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <HeaderPart />
      <SearchPart />
      <Container>
        <Row>
          <Col>
            {loading ? (
              <LoadingIndicator />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <FooterPart />
    </div>
  );
}



