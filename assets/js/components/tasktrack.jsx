import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Nav from './nav';

export default function tasktrack_init(store){
  ReactDOM.render(
    <Provider store={store}>
      <Tasktrack />
    </Provider>,
    document.getElementById('root')
  );
}

let Tasktrack= connect((state) => state)((props) =>{
  return <Router>
    <div>
      <Nav />
    
    </div>
  </Router>;
})
