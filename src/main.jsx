// import React from 'react';
import ReactDOM from 'react-dom/client';
// import CtxtProvider from './contexter';
import App from './App';
import './index.css';
// import Snowfall from 'react-snowfall';
// import { Provider } from 'react-redux';
// import store from './redux/store';

// import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import CtxtProvider from './contexter';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
    <CtxtProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {/* <Snowfall /> */}
        <App />
        
      </BrowserRouter>
    </CtxtProvider>
  // </Provider>
);
