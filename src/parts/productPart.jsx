// updating the product part to use redux
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import Rating from '../components/rating';

import { useContext } from 'react';
import { ProjContext } from '../contexter';

export default function ProductPart() {
  const {
    api_url,
    products,
    product,
    setProduct,
    loading,
    setLoading,
    error,
    useCart,
    // cart,
    // setCart,
  } = useContext(ProjContext);

  const { addToCart } = useCart();
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  // function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const getProduct = (id) => {
    const product = products.find((p) => p._id === id);
    setProduct(product);
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);
  

  // const getProduct = async (id) => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(`${api_url}/item/${id}`);
  //     setProduct(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProduct(id);
  // }, [id]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // console.log(product);
  // console.log(loading);
  // console.log(qty);

  return (
    <div className="container maindiv">
      {loading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : Object.keys(product).length > 0 ? (
        <Container>
          <Link className="btn btn-light my-3" to="/products">
            <button>
              <i className="fa fa-arrow-left"></i> &nbsp; Go Back
            </button>
          </Link>
          <Row>
            <Col xs={12} md={6}>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {product.images.map((image, idx) => (
                  <Carousel.Item key={idx}>
                    <Col key={'product_' + String(idx)} className="imageCol">
                      <img
                        src={image}
                        style={{ height: '100%', width: 'auto' }}
                      />
                    </Col>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col md={3}>
              {/* jeighihge */}
              <ul>
                <li>
                  <h1>{product.title}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.stock} // review = stock,  for now
                  ></Rating>
                </li>
                <li>Price: €{product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
              {/* fhehgoheo */}
            </Col>
            <Col md={3}>
              <div className="card1 card-body">
                <ul>
                  <li>
                    <div className="liprodiv">
                      <div>Price</div>
                      <div className="price">€{product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="liprodiv">
                      <div>Status</div>
                      <div>
                        {product.stock % 10 > 0 ? ( // some adjustment
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.stock > 0 && (
                    <>
                      <li>
                        <div className="liprodiv">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.stock % 10).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link to={`/cart/${id}?qty=${qty}`}>
                          <button
                            className="buttoncolor block"
                            onClick={() => addToCart(product, qty)}
                          >
                            Add to Cart
                          </button>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        ''
      )}
    </div>
  );
}
