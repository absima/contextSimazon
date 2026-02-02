import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProjContext } from '../contexter';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

const Dashboard = () => {
  const {
    api_url,
    customer,
    setCustomer,
    loading,
    setLoading,
    error,
    setError,
    setLoggedin,
  } = useContext(ProjContext);

  const navigate = useNavigate();

  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoggedin(false);
      setCustomer(null);
      navigate('/login');
      return;
    }

    const fetchMe = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${api_url}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCustomer(res.data.user);
        setLoggedin(res.data.authenticated);
      } catch (err) {
        console.error(err);
        setError(err);
        setCustomer(null);
        setLoggedin(false);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!customer) fetchMe();
  }, [api_url, customer, navigate, setCustomer, setError, setLoading, setLoggedin]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchRecentOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError(null);

        const res = await axios.get(`${api_url}/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const all = Array.isArray(res.data) ? res.data : [];
        setRecentOrders(all.slice(0, 3));
      } catch (err) {
        console.error(err);
        setOrdersError('Could not load recent orders');
        setRecentOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (customer?._id) fetchRecentOrders();
  }, [api_url, customer?._id]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCustomer(null);
    setLoggedin(false);
    navigate('/login');
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0 text-white">Dashboard</h2>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </Col>
      </Row>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message variant="danger">Failed to load your account.</Message>
      ) : customer ? (
        <Row className="g-3">
          {/* Account card */}
          <Col md={6}>
            <div className="p-3 rounded bg-dark text-white">
              <h5 className="mb-3">Account</h5>
              <div>
                <strong>Name:</strong> {customer.name}
              </div>
              <div>
                <strong>Username:</strong> {customer.username}
              </div>
              <div>
                <strong>Email:</strong> {customer.email}
              </div>

              <div className="mt-3 d-flex gap-2 flex-wrap">
                <Link className="btn btn-light" to="/profile/edit">
                  Edit profile
                </Link>
                <Link className="btn btn-secondary" to="/orders">
                  My orders
                </Link>
              </div>
            </div>
          </Col>

          {/* Recent orders */}
          <Col md={6}>
            <div className="p-3 rounded bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Recent Orders</h5>
                <Link className="btn btn-sm btn-outline-light" to="/orders">
                  View all
                </Link>
              </div>

              {ordersLoading ? (
                <div className="py-2">
                  <LoadingIndicator />
                </div>
              ) : ordersError ? (
                <Message variant="danger">{ordersError}</Message>
              ) : recentOrders.length === 0 ? (
                <Message variant="info">No orders yet.</Message>
              ) : (
                <Table striped bordered hover responsive variant="dark" className="mb-0">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o._id}>
                        <td style={{ wordBreak: 'break-all' }}>
                          <Link to={`/orders/${o._id}`} className="text-light">
                            {o._id}
                          </Link>
                        </td>
                        <td>
                          {o.createdAt
                            ? new Date(o.createdAt).toLocaleDateString()
                            : '-'}
                        </td>
                        <td>€{o.totalPrice ?? 0}</td>
                        <td>{o.isPaid ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Col>

          <Col md={12}>
            <div className="p-3 rounded bg-dark text-white">
              <h5 className="mb-3">Quick actions</h5>
              <div className="d-flex gap-2 flex-wrap">
                <Link className="btn btn-outline-light" to="/cart">
                  Go to cart
                </Link>
                <Link className="btn btn-outline-light" to="/products">
                  Continue shopping
                </Link>
              </div>
              <div className="mt-3 text-white-50" style={{ fontSize: 14 }}>
                Tip: If your session expires, you’ll be redirected to login.
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Message variant="warning">No user data found.</Message>
      )}
    </Container>
  );
};

export default Dashboard;
