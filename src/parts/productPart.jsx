// updating the product part to use redux
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import Rating from '../components/rating';

import {
  getOneProduct,
  selectProduct,
  selectLoading,
  selectError,
} from '../redux/productSlice';

export default function ProductPart() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  let loading = useSelector(selectLoading);
  if (Object.keys(product).length === 0) {
    // console.log('condition', product)
    // return "";
    loading = true;
  }
  // const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  // const addToCartHandler = () => {
  //   props.history.push(`/procut/cart/${id}?qty=${qty}`);
  // };

  // function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  // }

  return (
    <div className="container maindiv">
      {loading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : Object.keys(product).length > 0 ? (
        <Container>
          <Link className="btn btn-light my-3" to="/home">
            Go Back
          </Link>
          <Row>
            <Col xs={12} md={6}>
              <Carousel
                className="caroimgdiv"
                activeIndex={index}
                onSelect={handleSelect}
              >
                {product.images.map((image, idx) => (
                  <Carousel.Item key={idx}>
                    <Col key={'product_' + String(idx)}>
                      <img src={image} className="carousel-col" />
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
                          <button className="buttoncolor block">
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

// // updating the product part to use redux
// import Carousel from 'react-bootstrap/Carousel';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link, useLocation } from 'react-router-dom';
// import LoadingIndicator from '../components/loading';
// import Message from '../components/message';
// import Rating from '../components/rating';

// import {
//   getOneProduct,
//   selectProduct,
//   selectLoading,
//   selectError,
// } from '../redux/productSlice';

// export default function ProductPart() {
//   const { id } = useParams();
//   const [qty, setQty] = useState(1);
//   const dispatch = useDispatch();
//   const product = useSelector(selectProduct);

//   let loading = useSelector(selectLoading);
//   if (Object.keys(product).length === 0) {
//     // console.log('condition', product)
//     // return "";
//     loading = true
//   }
//   // const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   console.log ('-----------------')
//   console.log('id', id);
//   console.log('product', product);
//   console.log('loading', loading);
//   console.log ('+++++++++++++++++')

//   useEffect(() => {
//     dispatch(getOneProduct(id));
//   }, [dispatch, id]);

//   // const addToCartHandler = () => {
//   //   props.history.push(`/procut/cart/${id}?qty=${qty}`);
//   // };

//   // function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };
//   // }

//   return (
//     <div>
//       {loading ? (
//         <LoadingIndicator></LoadingIndicator>
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (Object.keys(product).length > 0)? (
//         <div>
//           <Link to="/">Back to result</Link>
//           <div className="row top">
//             <div className="col-2">
//               <Row>
//                 <Carousel activeIndex={index} onSelect={handleSelect}>
//                   {
//                     product.images.map((image, idx) => (
//                       <Carousel.Item key={idx}>
//                         <Col key={'product_' + String(idx)}>
//                           <img src={image} className="carousel-col" />
//                         </Col>
//                       </Carousel.Item>
//                     ))
//                   }
//                 </Carousel>
//               </Row>
//             </div>
//             <div className="col-1">
//               <ul>
//                 <li>
//                   <h1>{product.title}</h1>
//                 </li>
//                 <li>
//                   <Rating
//                     rating={product.rating}
//                     numReviews={product.stock} // review = stock,  for now
//                   ></Rating>
//                 </li>
//                 <li>Price: €{product.price}</li>
//                 <li>
//                   Description:
//                   <p>{product.description}</p>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-1">
//               <div className="card1 card-body">
//                 <ul>
//                   <li>
//                     <div className="liprodiv">
//                       <div>Price</div>
//                       <div className="price">€{product.price}</div>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="liprodiv">
//                       <div>Status</div>
//                       <div>
//                         {product.stock % 10 > 0 ? ( // some adjustment
//                           <span className="success">In Stock</span>
//                         ) : (
//                           <span className="danger">Unavailable</span>
//                         )}
//                       </div>
//                     </div>
//                   </li>
//                   {product.stock > 0 && (
//                     <>
//                       <li>
//                         <div className="liprodiv">
//                           <div>Qty</div>
//                           <div>
//                             <select
//                               value={qty}
//                               onChange={(e) => setQty(e.target.value)}
//                             >
//                               {[...Array(product.stock % 10).keys()].map(
//                                 (x) => (
//                                   <option key={x + 1} value={x + 1}>
//                                     {x + 1}
//                                   </option>
//                                 )
//                               )}
//                             </select>
//                           </div>
//                         </div>
//                       </li>
//                       <li>
//                         <Link to={`/cart/${id}?qty=${qty}`}>
//                           <button className="buttoncolor block">Add to Cart</button>
//                         </Link>
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//       : ""}
//     </div>
//   );
// }
