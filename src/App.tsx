import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import archiveVideos from './data/archiveVideos';
import * as ui from 'semantic-ui-react'
import ArchiveVideo from './domain/ArchiveVideo';

const videos: ArchiveVideo[] = archiveVideos

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
        {videos.map( (video, i) => (
        <>
            <div key={i}>{video.title}</div>
            {video.casts.map((cast, j) => (
              <span key={i.toString() + "-" + j.toString()}>
              {cast.name}, 
              </span>
            ))}
        </>
        ))}
        </ui.Container>
      </div>
    );
  }
}

export default App;
