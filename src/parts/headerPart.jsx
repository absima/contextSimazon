import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  Link,
  useSearchParams,
  useParams,
} from 'react-router-dom';

import { Form } from 'react-bootstrap';

import { useContext } from 'react';
import { ProjContext } from '../contexter';

export default function HeaderPart() {
  const { customer, setCustomer, loggedin, cartItems } =
    useContext(ProjContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const prms = useParams();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);

  // handle logout
  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    // localStorage.clear();
    setCustomer('');
    // setLoggedin(false);
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

  console.log('searchParams', searchParams);
  console.log('filter', filter);
  console.log('search', search);

  
  return (
    <header className="header">
      <Container>
        <Row
          className="align-items-end"
          style={{
            // backgroundColor: 'white',
            height: '5.5rem',
            // borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Col xs={12} md={2}>
            <div
            // className="headerdiv"
            >
              <div>
                <Link className="brand" to="/">
                  simazon
                </Link>
              </div>
            </div>
          </Col>

          <Col
            xs={12}
            md={7}
            // className="search"
          >
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
                // className="selectCategory"
                style={{
                  width: '10%',
                  height: '100%',
                  minWidth: '7rem',
                }}
                name="category"
                value=""
                // value={filter}
                // value = {searchParams.get("filter") || ""}
                onChange={
                  (e) => 
                  handleSelect(e)
                }
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
                style={{
                  width: '100%', 
                  height: '100%',
                  display: 'flex',
                }}

                onSubmit={ 
                  (e) =>
                  handleSubmit(e)
                  // handleFilter
                }
              >
                <input
                  // className="input"
                  style={{
                    width: '82%',
                    height: '100%',
                  }}
                  name="search"
                  type="text"
                  placeholder="Search..."
                  value={filter}
                  onChange={ 
                    (e) => 
                    handleFilter(e)
                    // handleSubmit
                  }
                />
                <button
                  type="submit"
                  style={{
                    width: '8%',
                    height: '100%',
                    minWidth: '5rem',
                    color: 'gray',
                    }}
                  // className="selectCategory"
                >
                  <i className="fa fa-search "></i>
                </button>
              </Form>
            </div>
          </Col>

          <Col xs={12} md={2}>
            <div className="headerdiv">
              {
                // customer && flagg == 'login' &&
                loggedin && customer ? (
                  <div className="dropdown">
                    {customer.username} <i className="fa fa-caret-down"></i>
                    <ul className="dropdown-content">
                      <li>
                        <Link to={`/dashboard`}> Profile </Link>
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
                        <Link to="/products" onClick={handleLogout}>
                          Log out
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  // navigate('/login', { replace: true })
                  <Link to="/login">Log in</Link>
                )
              }
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
