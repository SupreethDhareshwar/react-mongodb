import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';

class App extends Component {
  render() {
    return (
    <div>
      <Header></Header>
      <Body></Body>
    </div>
    );
  }
}

export default App;
