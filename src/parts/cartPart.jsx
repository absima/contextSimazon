import { useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import Message from '../components/message';
import { Container, Row, Col, ListGroup, Image, Form } from 'react-bootstrap';

import { useContext } from 'react';
import { ProjContext } from '../contexter';

export default function CartPart() {
  const navigate = useNavigate();

  const { useCart, setCartItems, loggedin } = useContext(ProjContext);
  const { cart, updateCart, removeFromCart } = useCart();

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');

  let quant;
  if (cart.length !== 0) {
    quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;
  } else {
    quant = qtyInUrl ? Number(qtyInUrl) : 1;
  }

  // update badge count
  useEffect(() => {
    setCartItems(cart.length > 0 ? cart.reduce((a, item) => a + item.quantity, 0) : 0);
  }, [cart, setCartItems]);

  const checkoutHandler = () => {
    // If not logged in, send to login with redirect back to checkout
    if (!loggedin || !localStorage.getItem('token')) {
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  return (
    <Container className="maindiv">
      <Link className="btn btn-light my-3" to="/products">
        <button>
          <i className="fa fa-arrow-left"></i> &nbsp; Go Back
        </button>
      </Link>

      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cart.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/products">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fluid
                        rounded
                        style={{ height: '7rem', width: 'auto' }}
                      />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.title}</Link>
                    </Col>

                    <Col md={2}>€{item.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        className="select"
                        value={item.quantity}
                        onChange={(e) => updateCart(item._id, Number(e.target.value))}
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="fa fa-trash"></i> Remove
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <ListGroup variant="flush" className="card1 card-body">
            <ListGroup.Item>
              <h1>Summary</h1>
              <h2>{cart.reduce((acc, item) => acc + item.quantity, 0)} items</h2>
              Total price &nbsp; €
              {cart
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <button
                className="block buttoncolor"
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}


// import { useEffect, useState } from 'react';
// import { useParams, useLocation, Link } from 'react-router-dom';
// import Message from '../components/message';
// import {
//   Container,
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Form,
//   Button,
// } from 'react-bootstrap';

// import { useContext } from 'react';
// import { ProjContext } from '../contexter';

// export default function CartPart() {
//   const { product, useCart, cartItems, setCartItems } = useContext(ProjContext);

//   const { cart, updateCart, removeFromCart, clearCart } = useCart();

//   const params = useParams();
//   console.log('params -- -- -- -- ', params);

//   const { search } = useLocation();
//   const qtyInUrl = new URLSearchParams(search).get('qty');

//   let quant;
//   if (cart.length !== 0) {
//     quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;
//   } else {
//     quant = qtyInUrl ? Number(qtyInUrl) : 1;
//   }

//   // setCartItems whenever there is change in cart
//   useEffect(() => {
//     setCartItems(
//       cart.length > 0 ? cart.reduce((a, item) => a + item.quantity, 0) : 0
//     );
//   }, [cart]);

//   console.log('cart -- -- -- -- ', cart);
//   console.log('product', product);
//   console.log('quant', quant);
//   console.log('localStorage', localStorage);

//   const checkoutHandler = () => {
//     props.history.push('/login?redirect=shipping');
//   };

//   return (
//     <Container className="maindiv">
//       <Link className="btn btn-light my-3" to="/products">
//         <button >
//           <i className="fa fa-arrow-left"></i> &nbsp;
//           Go Back
//         </button>
//       </Link>
//       <Row>
//         <Col md={8}>
//           <h1>Shopping Cart</h1>
//           {cart.length === 0 ? (
//             <Message>
//               Your cart is empty <Link to="/home">Go Back</Link>
//             </Message>
//           ) : (
//             <ListGroup variant="flush">
//               {cart.map((item, idx) => (
//                 <ListGroup.Item key={item._id}>
//                   <Row>
//                     <Col md={2}>
//                       <Image
//                         src={item.thumbnail}
//                         alt={item.title}
//                         fluid
//                         rounded
//                         style={{ height: '7rem', width: 'auto' }}
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Link to={`/product/${item._id}`}>{item.title}</Link>
//                     </Col>
//                     <Col md={2}>€{item.price}</Col>
//                     <Col md={2}>
//                       <Form.Control
//                         as="select"
//                         className="select"
//                         value={item.quantity}
//                         onChange={(e) => {
//                           const newQuantity = Number(e.target.value);
//                           updateCart(item._id, newQuantity);
//                         }}
//                       >
//                         {[...Array(item.stock).keys()].map((x) => (
//                           <option key={x + 1} value={x + 1} className="option">
//                             {x + 1}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Col>
//                     <Col md={2}>
//                       <button
//                         type="button"
//                         variant="light"
//                         // className='button'
//                         onClick={() => {
//                           console.log('item._id', item._id);
//                           removeFromCart(item._id);
//                         }}
//                       >
//                         <i className="fa fa-trash"></i> Remove
//                       </button>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Col>
//         <Col md={4}>
//           {/* <div className="card1 card-body"> */}
//           <ListGroup variant="flush" className="card1 card-body">
//             <ListGroup.Item key="subtotal">
//               <h1>Summary</h1>
//               <h2>
//                 {cart.reduce((acc, item) => acc + item.quantity, 0)}
//                 &nbsp; items in cart
//               </h2>
//               Total price &nbsp; €
//               {cart
//                 .reduce((acc, item) => acc + item.quantity * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//             <ListGroup.Item key="proceed">
//               <button
//                 // type="button"
//                 // style={{ width: '100%',
//                 //  backgroundColor: '#918585',
//                 // color: 'black',

//                 // }}
//                 className="block buttoncolor"
//                 disabled={cart.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed To Checkout
//               </button>
//             </ListGroup.Item>
//           </ListGroup>
//           {/* </div> */}
//         </Col>
//       </Row>
//     </Container>
//   );
// }
