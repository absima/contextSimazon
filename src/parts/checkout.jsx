import React, { useContext, useMemo, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ProjContext } from '../contexter';
import Message from '../components/message';
import LoadingIndicator from '../components/loading';

export default function Checkout() {
  const navigate = useNavigate();
  const { api_url, useCart, loggedin, setCartItems } = useContext(ProjContext);
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totals = useMemo(() => {
    const itemsPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 5; // demo rule
    const totalPrice = itemsPrice + shippingPrice;
    return { itemsPrice, shippingPrice, totalPrice };
  }, [cart]);

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!loggedin || !token) {
      navigate('/login?redirect=/checkout');
      return;
    }
    if (cart.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        orderItems: cart.map((item) => ({
          productId: item._id,
          title: item.title,
          qty: item.quantity,
          price: item.price,
          thumbnail: item.thumbnail,
        })),
        itemsPrice: Number(totals.itemsPrice.toFixed(2)),
        shippingPrice: Number(totals.shippingPrice.toFixed(2)),
        totalPrice: Number(totals.totalPrice.toFixed(2)),
      };

      const res = await axios.post(`${api_url}/orders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearCart(); 
      setCartItems(0);
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="maindiv">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h1>Checkout</h1>
          <Link className="btn btn-light" to="/cart">
            Back to cart
          </Link>
        </Col>
      </Row>

      {cart.length === 0 ? (
        <Message>
          Cart is empty. <Link to="/products">Go shopping</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush" className="card1 card-body">
              <ListGroup.Item>
                <h2>Review items</h2>
                {cart.map((item) => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      {item.title} x {item.quantity}
                    </div>
                    <div>€{(item.quantity * item.price).toFixed(2)}</div>
                  </div>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <ListGroup variant="flush" className="card1 card-body">
              <ListGroup.Item>
                <h2>Summary</h2>
                <div className="liprodiv">
                  <div>Items</div>
                  <div>€{totals.itemsPrice.toFixed(2)}</div>
                </div>
                <div className="liprodiv">
                  <div>Shipping</div>
                  <div>€{totals.shippingPrice.toFixed(2)}</div>
                </div>
                <hr />
                <div className="liprodiv">
                  <div><strong>Total</strong></div>
                  <div><strong>€{totals.totalPrice.toFixed(2)}</strong></div>
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <button
                  className="block buttoncolor"
                  disabled={loading || cart.length === 0}
                  onClick={placeOrder}
                >
                  {loading ? <LoadingIndicator /> : 'Place Order'}
                </button>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
}
