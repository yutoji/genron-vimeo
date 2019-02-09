import React, { Component } from 'react';
import './App.css';
import archiveVideos from './data/archiveVideos';
import ArchiveVideo from './domain/ArchiveVideo';
import { Item, Container } from 'semantic-ui-react';
import VideoList from './containers/VideoList';

const videos: ArchiveVideo[] = archiveVideos

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container text>
          <VideoList />
        </Container>
      </div>
    );
  }
}

export default App;
