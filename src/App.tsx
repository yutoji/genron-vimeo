import React, { Component } from 'react';
import './App.css';
import archiveVideos from './data/archiveVideos';
import ArchiveVideo from './domain/ArchiveVideo';
import VideoItem from './components/VideoItem';
import { Item, Container } from 'semantic-ui-react';

const videos: ArchiveVideo[] = archiveVideos

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container text>
          <Item.Group divided>
            {videos.map((video, i) => (<VideoItem video={video} key={i} />))}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default App;
