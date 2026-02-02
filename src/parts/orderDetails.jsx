import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ProjContext } from '../contexter';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

export default function OrderDetails() {
  const { api_url } = useContext(ProjContext);
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${api_url}/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrder(res.data);
      } catch (err) {
        console.error(err);
        setError('Could not load order');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [api_url, id]);

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Order Details</h2>
          <Link className="btn btn-outline-light" to="/orders">
            Back
          </Link>
        </Col>
      </Row>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !order ? (
        <Message variant="warning">Order not found.</Message>
      ) : (
        <Row className="g-3">
          <Col md={8}>
            <div className="p-3 rounded bg-dark text-white">
              <h5 className="mb-3">Items</h5>

              <Table striped bordered hover responsive variant="dark">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.orderItems || []).map((it, idx) => (
                    <tr key={idx}>
                      <td className="d-flex align-items-center gap-2">
                        {it.thumbnail ? (
                          <img
                            src={it.thumbnail}
                            alt={it.title}
                            style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                          />
                        ) : null}
                        <span>{it.title}</span>
                      </td>
                      <td>{it.qty}</td>
                      <td>€{it.price}</td>
                      <td>€{Number(it.qty) * Number(it.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 rounded bg-dark text-white">
              <h5 className="mb-3">Summary</h5>
              <div className="d-flex justify-content-between">
                <span>Items</span>
                <span>€{order.itemsPrice ?? 0}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>€{order.shippingPrice ?? 0}</span>
              </div>
              <hr className="border-secondary" />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>€{order.totalPrice ?? 0}</span>
              </div>

              <div className="mt-3">
                <div>
                  <strong>Status:</strong> {order.status || 'Created'}
                </div>
                <div>
                  <strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}
                </div>
                <div className="text-white-50" style={{ fontSize: 14 }}>
                  Order ID: {order._id}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
