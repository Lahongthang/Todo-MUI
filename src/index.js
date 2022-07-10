import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { fetchTodos } from './features/todos/todosSlice';
import { fetchColors } from './features/filters/filtersSlice';

const getTodos = Promise.resolve(store.dispatch(fetchTodos({})))
const getColors = Promise.resolve(store.dispatch(fetchColors({})))

Promise.all([getTodos, getColors]).then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <Provider store={store}>
        <App />
      </Provider>
  );
  reportWebVitals();
})

