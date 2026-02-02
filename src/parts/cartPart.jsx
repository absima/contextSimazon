import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Message from '../components/message';
import { Container, Row, Col, ListGroup, Image, Form } from 'react-bootstrap';

import { useContext } from 'react';
import { ProjContext } from '../contexter';

export default function CartPart() {
  const navigate = useNavigate();

  const { useCart, setCartItems, loggedin } = useContext(ProjContext);
  const { cart, updateCart, removeFromCart } = useCart();

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');

  let quant;
  if (cart.length !== 0) {
    quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;
  } else {
    quant = qtyInUrl ? Number(qtyInUrl) : 1;
  }

  useEffect(() => {
    setCartItems(cart.length > 0 ? cart.reduce((a, item) => a + item.quantity, 0) : 0);
  }, [cart, setCartItems]);

  const checkoutHandler = () => {
    if (!loggedin || !localStorage.getItem('token')) {
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  return (
    <Container className="maindiv">
      <Link className="btn btn-light my-3" to="/products">
        <button>
          <i className="fa fa-arrow-left"></i> &nbsp; Go Back
        </button>
      </Link>

      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cart.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/products">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fluid
                        rounded
                        style={{ height: '7rem', width: 'auto' }}
                      />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.title}</Link>
                    </Col>

                    <Col md={2}>€{item.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        className="select"
                        value={item.quantity}
                        onChange={(e) => updateCart(item._id, Number(e.target.value))}
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="fa fa-trash"></i> Remove
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <ListGroup variant="flush" className="card1 card-body">
            <ListGroup.Item>
              <h1>Summary</h1>
              <h2>{cart.reduce((acc, item) => acc + item.quantity, 0)} items</h2>
              Total price &nbsp; €
              {cart
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <button
                className="block buttoncolor"
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}


