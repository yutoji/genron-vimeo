import React, { Component } from 'react';
import './App.css';
import archiveVideos from './data/archiveVideos';
import ArchiveVideo from './domain/ArchiveVideo';
import { Item, Container, Header, Icon } from 'semantic-ui-react';
import VideoList from './containers/VideoList';
import CastTagList from './containers/CastTagList';

const videos: ArchiveVideo[] = archiveVideos

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container text>
          <Header as="h1">
          ゲンロンVimeo動画一覧
          </Header>
          <CastTagList />
          <div id="video-select-ref"></div>
          <VideoList />
        </Container>
      </div>
    );
  }
}

export default App;
