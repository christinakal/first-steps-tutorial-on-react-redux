import React from 'react';
//import './App.css';

import {Provider} from "react-redux";
import {createStore} from "redux";

import reducer from "./redux/reducer"
import Display from "./components/Display"
import ToAdd from "./components/ToAdd"

const store = createStore(reducer, ['Use Redux']);

function App() {
  return (
    <Provider store={store}>
      <ToAdd />
      <Display />
      {console.log(store.getState())}
    </Provider>
  );
}

export default App;
