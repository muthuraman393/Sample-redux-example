import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './Counter';
import storet from './store';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wait! Our very best offer is right here.</h1>
        </header>
        <p className="App-intro">
         Great plan, at our lowest price!
        </p>
		<Counter store={storet}/>
      </div>
    );
  }
}

export default App;
