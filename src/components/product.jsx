import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './rating';
import { Col } from 'react-bootstrap';

export default function Product(props) {
  const { product } = props;
  return (
    <Col key={product._id} className="col-12 col-md-6 col-lg-4 card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.thumbnail} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 className="h2title">{product.title}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.stock} // review = stock,  for now
        ></Rating>
        <div className="price">€{product.price}</div>
      </div>
    </Col>
  );
}
