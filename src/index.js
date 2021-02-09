import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import {Provider, createClient, Client, defaultExchanges, dedupExchange, fetchExchange} from 'urql'
import {cacheExchange} from '@urql/exchange-graphcache'

import 'bootstrap/dist/css/bootstrap.min.css';


import { getToken } from './token'
import './index.css';
import App from './components/App';

const cache = cacheExchange({})

const client = new Client({
  url: 'http://localhost:8000/graphql/',
  fetchOptions: () => {
    const token = getToken()
    // return token ? { headers: { Authorization: token}} : {}
    return {
      headers: { Authorization: token ? `JWT ${token}` : '' },      
    }
  },
  exchanges: [dedupExchange, cache, fetchExchange]
})

ReactDOM.render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)