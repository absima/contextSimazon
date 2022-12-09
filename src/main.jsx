import React from 'react';
import ReactDOM from 'react-dom/client';
// import CtxtProvider from './contexter';
import App, { browserRouter } from './App';
import './index.css';
import Snowfall from 'react-snowfall';
import { Provider } from 'react-redux';
import store from './redux/store';

import { RouterProvider } from 'react-router-dom';

import CtxtProvider from './xcontexter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CtxtProvider>
      <RouterProvider router={browserRouter}>
        {/* <RouterProvider router={browserRouter} /> */}
        {/* <Snowfall />  */}
        <App />
      </RouterProvider>
    </CtxtProvider>
  </Provider>
);
