import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderPart from './parts/headerPart';
import HomePage from './parts/homePage';
import HomePart from './parts/homePart';
import SignUp from './parts/signingup';
import SignIn from './parts/signingin';
import Dashboard from './parts/dashboard';
import FooterPart from './parts/footerPart';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import SearchPart from './parts/searchPart';


function App() {
  return (
    <div
    // className="App"
    >
      <header>
        <HeaderPart />
      </header>
      <main>
        <Routes>
          {/* <Route path="/" element={<FakeHome />} />
          <Route path="/home" element={<FakeHome />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<HomePart />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<CartPart />} />
          <Route path="/product/:id" element={<ProductPart />} />
          <Route path="/cart/:id" element={<CartPart />} />
          <Route path="/category/:id" element={<HomePage />} />
          <Route path="/:search" element={<SearchPart />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
      <footer className="row center">
        <FooterPart />
      </footer>
    </div>
  );
}

export default App;

// import React from 'react';
// import { createBrowserRouter } from 'react-router-dom';
// import HomePart from './parts/homePart';
// import HomePage from './parts/homePage';
// import ProductPart from './parts/productPart';
// import CartPart from './parts/cartPart';
// import SignInOrSignUpPart from './parts/signInNsignUpPart';
// import RegisteredPage from './parts/registeredPage';
// import LoggedInPart from './parts/loggedInPage';
// import AuthLayout from './parts/layout';
// import SearchPart from './parts/searchPart';
// import { useNavigate } from 'react-router-dom';
// import Check from './parts/userinput';

// export const browserRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <AuthLayout />,
//     children: [
//       { path: '/', element: <HomePage /> },
//       { path: '/home', element: <HomePart /> },
//       { path: '/product/:id', element: <ProductPart /> },
//       { path: '/cart/:id', element: <CartPart /> },
//       { path: '/cart', element: <CartPart /> },
//       { path: '/register', element: <SignInOrSignUpPart flag="register" /> },
//       { path: '/login', element: <SignInOrSignUpPart flag="login" /> },
//       { path: '/profile/:username', element: <LoggedInPart /> },
//       { path: '/registered', element: <RegisteredPage /> },
//       { path: '/category/:id', element: <HomePage /> },
//       { path: '/:search', element: <SearchPart /> },
//       { path: '*', element: <h1>Not Found</h1> },
//     ],
//   },
// ]);

// export default function App() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <h1>Welcome back</h1>
//       <Outlet />
//     </div>
//   );
// }

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
