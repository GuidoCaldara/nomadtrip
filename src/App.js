import React from 'react';
import FormContainer from './components/Form/Form.container';
import ResultsList from './components/Results/ResultsList';
import { createStore } from 'redux';
import { Provider } from "react-redux";

import './App.css';


const initialState = {
  results: undefined,
  loading: false
};

const reducer = (state = initialState, action) => {
  if(action.type === "UPDATE") {
    return {
      results: action.payload.data,
      loading: true
    };
  }
  if(action.type === "START_FETCH") {
    return {
      ...state,
      loading: true
    };
  }
  if(action.type === "STOP_FETCH") {
    return {
      ...state,
      loading: false
    };
  }
  return state
}

const store = createStore(reducer);



function App() {
  return (
    <div>
    <Provider store={store}>
      <FormContainer/>
      <ResultsList/>
    </Provider>

    </div>
  );
}

export default App;
