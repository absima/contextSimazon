import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { selectCart } from '../redux/productSlice';
import { getUserProfile } from '../redux/userSlice';

const ProfilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  console.log('params', params);
  // useEffect(() => {
  //   dispatch(getUserProfile(params.username));
  // }, [dispatch, params.username]);

  return (
    <div className="container, maindiv">
      <h1>Profile Page</h1>
      <div className="profile-page__container">
        <div className="profile-page__container__title">
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Welcome back, {params.username}!
          </h1>

          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            You have{' '}
            {cart.length > 0 ? cart.reduce((a, item) => a + item.num, 0) : 0}{' '}
            items in your cart
          </p>
          {cart.length > 0 ? (
            <div>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                Your cart:
              </p>
              <ol>
                {cart.map((item) => (
                  <li key={item._id}>
                    <div>
                    Name: {item.title} 
                    </div>
                    <div>
                    Description: {item.description} 
                    </div>
                    <div>
                    Quantity: x {item.num? item.num : 1}
                    </div>
                    <div>
                    Price per piece: ${item.price}
                    </div>
                    <div>
                    Subtotal price: ${item.num * item.price}
                    </div>

                    
                  </li>
                ))}
              </ol>

              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                Total: ${cart.reduce((a, item) => a + item.num * item.price, 0)}
              </p>

              <button
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                Checkout
              </button>

              <button
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                Clear Cart
              </button>
            </div>
          ) : (
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              Your cart is empty
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
