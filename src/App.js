import React, { Component } from 'react';
import './App.css';
import MapScene from './containers/MapScene';
import NavSidebar from './containers/NavSidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavSidebar />
        <MapScene />
      </div>
    );
  }
}

export default App;
