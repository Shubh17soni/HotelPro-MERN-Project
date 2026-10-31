import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(<BrowserRouter><App/><ToastContainer position="top-right" autoClose={2500}/></BrowserRouter>);
