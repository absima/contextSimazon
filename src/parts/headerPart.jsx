import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form, Link, useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/productSlice';
import { logoutUser, selectUser } from '../redux/userSlice';

// import { useAuth } from '../auth/useAuth';

export default function HeaderPart() {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const [searchParams, setSearchParams] = useSearchParams();
  const prms = useParams();
  const controller = prms.username ? 1 : 0;
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  // const [flag, setFlag] = useState(0);
  // useEffect(() => {
  //   if (controller === 1 || flag === 1) {
  //     setFlag(1); // logged in flag
  //   } else {
  //     setFlag(0); // logged out flag
  //   }
  // }, [controller, flag]);

  const flag = JSON.parse(JSON.stringify(controller));

  const cartItems =
    cart.length > 0 ? cart.reduce((a, item) => a + item.num, 0) : 0;

  // 
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    flgarr[0] = 0;
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setSearchParams({ filter: e.target.value });
  };

  // select category handler
  const handleSelect = (e) => {
    setFilter(e.target.value);
    setSearchParams({ filter: e.target.value });
  };

  // const handleClear = () => {
  //   setSearch('');
  //   setFilter('');
  //   setSearchParams({});
  // };

  // submit search handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter) {
      setSearchParams({ filter: filter });
    } else {
      setSearchParams({});
    }
    setSearch('');
    // close search bar
    setOpen(false);
    // redirect to search page
    window.location.href = '/search?filter=' + filter;
  };

  useEffect(() => {
    if (search) {
      setSearchParams({ filter: search });
    }
  }, [search]);

  return (
    <header className="header">
      <Container>
        <Row className="align-items-end">
          <Col xs={12} md={3}>
            <div className="headerdiv">
              <div>
                <Link className="brand" to="/">
                  simazon
                </Link>
              </div>
            </div>
          </Col>

          <Col xs={12} md={7} className="search">
            <select
              className="selectCategory"
              name="category"
              value="ab"
              // value={filter}
              // value = {searchParams.get("filter") || ""}
              onChange={handleSelect}
            >
              <option value="">...</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skin Care</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Decos</option>
            </select>
            <Form
              onSubmit={
                handleSubmit
                // handleFilter
              }
            >
              <input
                className="input"
                name="search"
                type="text"
                placeholder="Search..."
                value={filter}
                onChange={
                  handleFilter
                  // handleSubmit
                }
              />
              <button
                type="submit"
                // className="selectCategory"
              >
                <i className="fa fa-search "></i>
              </button>
            </Form>
          </Col>

          {/* <Col xs={12} md={7} className="search1">
            <Row className="align-items-center">
              <Col xs={1} md={1}>
                <div
                  style={{
                    paddingLeft: '1rem',
                  }}
                  className="headerdiv"
                >
                  <select
                    className="selectCategory"
                    name="category"
                    value="ab"
                    onChange={handleSelect}
                  >
                    <option value="">...</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="skincare">Skin Care</option>
                    <option value="groceries">Groceries</option>
                    <option value="home-decoration">Decos</option>
                  </select>
                </div>
              </Col>

              <Col xs={11} md={11}>
                <div className="headerdiv">
                  <Form
                    onSubmit={
                      handleSubmit
                    }
                  >
                    <input
                      className="input"
                      name="search"
                      type="text"
                      placeholder="Search..."
                      value={filter}
                      onChange={
                        handleFilter
                      }
                    />
                    <button type="submit" className="searchButton">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col> */}

          <Col xs={12} md={2}>
            <div className="headerdiv">
              {controller? (
                <div className="dropdown">
                  <Link to="/#">
                    {prms.username} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/#">Profile</Link>
                    </li>
                    <li>
                      <Link to="/#">Orders</Link>
                    </li>
                    <li>
                      <Link to="/#">Messages</Link>
                    </li>
                    <li>
                      <Link to="/#">Settings</Link>
                    </li>
                    <li>
                      <Link to="/home" onClick={handleLogout}>
                        Log out
                      </Link>
                    </li>
                  </ul>
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
