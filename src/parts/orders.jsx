import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProjContext } from '../contexter';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

export default function Orders() {
  const { api_url } = useContext(ProjContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${api_url}/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Could not load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [api_url]);

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">My Orders</h2>
          <Link className="btn btn-outline-light" to="/dashboard">
            Back
          </Link>
        </Col>
      </Row>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders.length === 0 ? (
        <Message variant="info">No orders yet.</Message>
      ) : (
        <div className="p-3 rounded bg-dark">
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td style={{ wordBreak: 'break-all' }}>
                    <Link to={`/orders/${o._id}`} className="text-light">
                        {o._id}
                    </Link>
                </td>
                <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '-'}</td>
                <td>€{o.totalPrice ?? 0}</td>
                <td>{o.isPaid ? 'Yes' : 'No'}</td>
                <td>{o.status || 'Created'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )}
    </Container>
  );
}
