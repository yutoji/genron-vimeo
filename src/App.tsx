import React, { Component } from 'react';
import './App.css';
import archiveVideos from './data/archiveVideos';
import ArchiveVideo from './domain/ArchiveVideo';
import VideoItem from './containers/VideoItem';
import { Item, Container } from 'semantic-ui-react';
import VideoList from './components/VideoList';

const videos: ArchiveVideo[] = archiveVideos

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container text>
          <VideoList videos={videos} selectedCast={videos[0].casts[0]} />
        {/*
          <Item.Group divided>
            {videos.map((video, i) => (<VideoItem video={video} key={i} />))}
          </Item.Group>
        */}
        </Container>
      </div>
    );
  }
}

export default App;
