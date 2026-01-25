// src/parts/editProfile.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProjContext } from '../contexter';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

const EditProfile = () => {
  const {
    api_url,
    customer,
    setCustomer,
    loading,
    setLoading,
    error,
    setError,
  } = useContext(ProjContext);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // hydrate form from customer
  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setEmail(customer.email || '');
    }
  }, [customer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token || !customer?._id) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.put(
        `${api_url}/user/${customer._id}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend returns updated user (without password)
      setCustomer(res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h2>Edit Profile</h2>
        </Col>
      </Row>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <form
              onSubmit={handleSubmit}
              className="p-3 rounded bg-dark text-white"
            >
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-light" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </button>
              </div>

              <div
                className="mt-3 text-white-50"
                style={{ fontSize: '0.9rem' }}
              >
                Password changes should be handled separately.
              </div>
            </form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EditProfile;
