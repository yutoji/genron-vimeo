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
