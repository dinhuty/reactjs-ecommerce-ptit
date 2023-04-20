import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './components/Redux/store';
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor='#ededed' highlightColor='#faf7f7'>
        <ToastContainer limit={1}></ToastContainer>
        <App />
      </SkeletonTheme>
    </Provider>

  </React.StrictMode>
);

reportWebVitals();
