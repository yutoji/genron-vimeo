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
        <img src="/logo/twitter_header_photo_1.png" className="header-logo" />
        <Container text>
          <Header as="h1">
            <a href="/">ゲンロンVimeo動画一覧</a>
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
