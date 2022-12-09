// create a new component called ProfilePage that will be used to display the user's profile information using the user's username as a parameter in the URl.

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
  useEffect(() => {
    dispatch(getUserProfile(params.username));
  }, [dispatch, params.username]);

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <div className="profile-page__container__title">
          {params.username}'s Profile
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

//   const user = useSelector(selectUser);
//   const cart = useSelector(selectCart);
//   const params = useParams();
//   const { username } = params;
//   const { name, email, password } = user;

//   useEffect(() => {
//     getUserProfile(username);
//   }, [username]);

//   return (
//     <div className="profile-page">
//       <div className="profile-page__container">
//         <div className="profile-page__container__title">
//           Profile Page
//         </div>
//         <div className="profile-page__container__content">
//           <div className="profile-page__container__content__name">
//             {name}
//           </div>
//           <div className="profile-page__container__content__email">
//             {email}
//           </div>
//           <div className="profile-page__container__content__password">
//             {password}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// return (
//   <div className="profile-page">
//     <div className="profile-page__container">
//       <div className="profile-page__container__title">
//         {username}'s Profile
//       </div>
//       <div className="profile-page__container__content">
//         <div className="profile-page__container__content__left">
//           <div className="profile-page__container__content__left__image">
//             <img src="/images/profile.png" alt="profile" />
//           </div>
//           <div className="profile-page__container__content__left__name">
//             {username}
//           </div>
//           <div className="profile-page__container__content__left__email">
//             {user.email}
//           </div>
//         </div>
//         <div className="profile-page__container__content__right">
//           <div className="profile-page__container__content__right__title">
//             Orders
//           </div>
//           <div className="profile-page__container__content__right__orders">
//             {cart.map((item) => (
//               <div className="profile-page__container__content__right__orders__order">
//                 <div className="profile-page__container__content__right__orders__order__image">
//                   <img
//                     src={item.image
//                       //  ? item.image : "/images/no-image.png"} alt="product" />
//                       .replace('http://localhost:5000', '')
//                       .replace('https://simazon.herokuapp.com', '')}
//                     alt="product"
//                   />
//                 </div>
//                 <div className="profile-page__container__content__right__orders__order__name">
//                   {item.name}
//                 </div>
//                 <div className="profile-page__container__content__right__orders__order__price">
//                   ${item.price}
//                 </div>
//                 <div className="profile-page__container__content__right__orders__order__qty">
//                   Qty: {item.num}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// };

// export default ProfilePage;
