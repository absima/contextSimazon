import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePart from './parts/homePart';
import HomePage from './parts/homePage';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import SignInOrSignUpPart from './parts/signInNsignUpPart';
import RegisteredPage from './parts/registeredPage';
import LoggedInPart from './parts/loggedInPage';
import AuthLayout from './parts/layout';
import SearchPart from './parts/searchPart';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePart /> },
      { path: '/product/:id', element: <ProductPart /> },
      { path: '/cart/:id', element: <CartPart /> },
      { path: '/cart', element: <CartPart /> },
      { path: '/register', element: <SignInOrSignUpPart flag="register" /> },
      { path: '/login', element: <SignInOrSignUpPart flag="login" /> },
      { path: '/profile/:username', element: <LoggedInPart /> },
      { path: '/registered', element: <RegisteredPage /> },
      { path: '/category/:id', element: <HomePage /> },
      { path: '/:search', element: <SearchPart /> },
      { path: '*', element: <h1>Not Found</h1> },
    ],
  },
]);


export default function App() {
  return (
    <div>
      <h1>Welcome back</h1>
      <Outlet />
    </div>
  );
}



// ReactDOM.render(
//   <Provider store={store}>
//     <RouterProvider router={browserRouter}>
//       <BrowserRouter>
//         <HeaderPart />
//         <HomePart />
//         <ProductPart />
//         <CartPart />
//         <SignInOrSignUpPart />
//         <ProfilePage />
//         <FooterPart />
//         <RegisteredPage />
//         <LoggedInPart />
//         <HomePage />
//         <App />
//       </BrowserRouter>
//     </RouterProvider>
//   </Provider>,
//   document.getElementById('root')
// );

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //       {/* <CtxtProvider> */}
// //       <Provider store={store}>
// //         <App />
// //       </Provider>
// //       {/* </CtxtProvider> */}
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );



// // update the app.js file
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';

// import HeaderPart from './parts/headerPart';
// import HomePart from './parts/homePart';
// import HomePage from './parts/homePage';
// import ProductPart from './parts/productPart';
// import CartPart from './parts/cartPart';
// import SignInOrSignUpPart from './parts/signInNsignUpPart';
// import FooterPart from './parts/footerPart';
// import RegisteredPage from './parts/registeredPage';
// import LoggedInPart from './parts/loggedInPage';

// function App() {
//   return (
//     <div 
//     // className="App"
//     >
//       {/* <header>
//         <HeaderPart />
//       </header>
//       {/* <main>
//         <Routes>
//           <Route path="/" element={<HomePart />} />
//           <Route path="/product/:id" element={<ProductPart />} />
//           <Route path="/cart/:id" element={<CartPart />} />
//           <Route path="/cart" element={<CartPart />} />
//           <Route path="/login" element={<SignInOrSignUpPart flag="login" />} />
//           <Route
//             path="/register"
//             element={<SignInOrSignUpPart flag="register" />}
//           />
//           <Route path="/registered" element={<RegisteredPage />} />
//           <Route path="/loggedin" element={<LoggedInPart />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/category/:id" element={<HomePage />} />
//           <Route path="/search" element={<HomePage />} />
//           <Route path="*" element={<h1>Not Found</h1>} />
//         </Routes>
//       </main> */}
//       {/* <footer className="row center">
//         <FooterPart />
//       </footer> */}
//     </div>
//   );
// }

// export default App;
