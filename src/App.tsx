import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import broadcastTitles from './data/broadcastTitles';
import * as ui from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <ui.Container text>
        {broadcastTitles.map( (item, i) => (
            <div key={i}>{item.title}</div>
        ))}
        </ui.Container>
      </div>
    );
  }
}

export default App;
