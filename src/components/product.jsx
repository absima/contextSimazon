// import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './rating';
import { Col } from 'react-bootstrap';

export default function Product(props) {
  const { product } = props;

  return (
//      <Col
//   key={product._id}
//   className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-5col"
// >
    <Col className="product-col col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-5col">
      <div className="product-card">
        <Link to={`/product/${product._id}`}>
          <div className="product-media">
            <img
              className="product-thumb"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
        </Link>

        <div className="product-body">
          <Link to={`/product/${product._id}`}>
            <h2 className="h2title">{product.title}</h2>
          </Link>

          <Rating rating={product.rating} numReviews={product.stock} />
          <div className="price">€{product.price}</div>
        </div>
      </div>
    </Col>
  );
}

