import * as React from 'react';
import ArchiveVideo, { Cast } from '../domain/ArchiveVideo';
import { Item, Header, Icon } from 'semantic-ui-react';
import VideoItem from './VideoItem';

export interface VideoListProps {
    videos: ArchiveVideo[],
    selectedCast?: Cast,
}

const VideoList: React.FunctionComponent<VideoListProps> = ({
    videos,
    selectedCast = null,
}) => (
    <>
        {selectedCast && (
        <Header as='h2' dividing>
            <Icon name="user circle" />
            <Header.Content>{selectedCast.name}　動画一覧</Header.Content>
        </Header>
        )}
        <Item.Group divided>
            {videos.map((video, i) => (<VideoItem video={video} key={i} />))}
        </Item.Group>
    </>
);

export default VideoList;