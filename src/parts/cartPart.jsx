// create cart screen
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, Form } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
} from 'react-bootstrap';
import {
  addNremove,
  selectCart,
  selectLoading,
  selectError,
} from '../redux/productSlice';

export default function CartPart() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { search } = useLocation();

  const qtyInUrl = new URLSearchParams(search).get('qty');
  let quant;
  if (cart.length !== 0) {
    quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;
    // dispatch(addNremove({ id, quant }));
  } else {
    quant = qtyInUrl ? Number(qtyInUrl) : 1;
    // dispatch(addNremove({ id, quant }));
  }

  // const quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;

  const qtysInit = cart.map((item) => item.num);
  const [qties, setQties] = useState([]);

  const [qty, setQty] = useState(quant);
  const [flag, setFlag] = useState('add');

  

  // write useEffect to dispatch addNremove

  useEffect(() => {
    if (id) {
      dispatch(addNremove(id, qty, flag));
    }
  }, [id, qty, flag, dispatch]);

  // const removeFromCartHandler = (id) => {
  //   dispatch(deleteFromCart(id));
  // };

  const checkoutHandler = () => {
    props.history.push('/login?redirect=shipping');
  };

  return (
    <Container className="maindiv">
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cart.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/home">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item, idx) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.title}</Link>
                    </Col>
                    <Col md={2}>€{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={qties[idx] || item.num}
                        onChange={(e) => {
                          const chosen = Number(e.target.value);
                          const newQties = [...qties];
                          newQties[idx] = chosen;
                          setQties(newQties);
                          setQty(chosen);
                          setFlag('add');
                        }}
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          // setQty(item.num);
                          // setFlag('remove');
                          dispatch(addNremove(item._id, item.num, 'remove'));
                        }}
                      >
                        <i className="fa fa-trash"></i> Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush" className="card card-body">
            <ListGroup.Item>
              <h2>
                Subtotal ({cart.reduce((acc, item) => acc + item.num, 0)}) items
              </h2>
              €
              {cart
                .reduce((acc, item) => acc + item.num * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                // style={{ width: '100%',
                //  backgroundColor: '#918585',
                //   color: 'black',

                // }}
                className="block"
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
