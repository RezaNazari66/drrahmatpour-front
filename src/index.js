import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


render(
    <BrowserRouter>
        <App/>
        <ToastContainer/>
    </BrowserRouter>,
    document.getElementById('root')
);

