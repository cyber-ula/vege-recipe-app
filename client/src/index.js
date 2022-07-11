//import Symbol_observable from 'symbol-observable';
import {Provider} from 'react-redux'
import { applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers';
import { configureStore } from '@reduxjs/toolkit'
import { createRoot} from "react-dom/client";


import App from './App.js'
import React from 'react';

const store = configureStore({reducer: reducers}, compose(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <App />
    </Provider>

)