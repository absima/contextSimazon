import React, { useEffect, useRef, useState, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { ProjContext } from '../contexter';

export default function HeaderPart() {
  const { customer, setCustomer, loggedin, setLoggedin, cartItems } =
    useContext(ProjContext);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep search field synced with URL if you refresh on /search?filter=...
  const [filter, setFilter] = useState(searchParams.get('filter') || '');

  // ✅ stable dropdown (click open/close + click outside closes)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setCustomer(null);
    setLoggedin(false);
    setMenuOpen(false);
    navigate('/login');
  };

  // category select
  const handleSelect = (e) => {
    const value = e.target.value;
    setFilter(value);
    setSearchParams(value ? { filter: value } : {});
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    setSearchParams(value ? { filter: value } : {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = (filter || '').trim();

    setMenuOpen(false);

    if (q) {
      setSearchParams({ filter: q });
      navigate(`/search?filter=${encodeURIComponent(q)}`);
    } else {
      setSearchParams({});
      navigate('/products');
    }
  };

  return (
    <header>
      <Container>
        <Row>
          {/* Brand */}
          <Col xs={12} md={2}>
            <div>
              <Link className="brand" to="/">
                simazon
              </Link>
            </div>
          </Col>

          <Col xs={12} md={7}>
            <div
              style={{
                width: '100%',
                height: '5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <select
                style={{
                  width: '10%',
                  height: '100%',
                  minWidth: '7rem',
                }}
                name="category"
                value="" // keep your previous behavior
                onChange={handleSelect}
              >
                <option value=""> all </option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skin Care</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Decos</option>
              </select>

              <Form
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                }}
                onSubmit={handleSubmit}
              >
                <input
                  style={{
                    width: '82%',
                    height: '100%',
                  }}
                  name="search"
                  type="text"
                  placeholder="Search..."
                  value={filter}
                  onChange={handleFilter}
                />

                <button
                  type="submit"
                  style={{
                    width: '8%',
                    height: '100%',
                    minWidth: '5rem',
                    color: 'gray',
                  }}
                >
                  <i className="fa fa-search"></i>
                </button>
              </Form>
            </div>
          </Col>

          <Col xs={12} md={2}>
            <div className="headerdiv">
              {loggedin && customer ? (
                <div className="dropdown" ref={menuRef}>
                  <button
                    type="button"
                    className="dropdown-toggle-btn"
                    onClick={() => setMenuOpen((v) => !v)}
                  >
                    {customer.username} <i className="fa fa-caret-down"></i>
                  </button>

                  {menuOpen && (
                    <ul className="dropdown-content">
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={() => setMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile/edit"
                          onClick={() => setMenuOpen(false)}
                        >
                          Edit profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/orders" onClick={() => setMenuOpen(false)}>
                          My orders
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-link-btn"
                          onClick={handleLogout}
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link to="/login">Log in</Link>
              )}

              <Link to="/cart">
                &nbsp; <FontAwesomeIcon icon={faCartShopping} size="lg" />
                {cartItems > 0 && <span className="notif">{cartItems}</span>}
              </Link>
            </div>
          </Col>
        </Row>

        <hr />
      </Container>
    </header>
  );
}

