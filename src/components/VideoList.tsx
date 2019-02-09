import * as React from 'react';
import ArchiveVideo, { Cast } from '../domain/ArchiveVideo';
import { Item, Header, Icon } from 'semantic-ui-react';
import VideoItem from '../containers/VideoItem';

export interface VideoListProps {
    videos?: ArchiveVideo[];
    selectedCast?: Cast;
}

const VideoList: React.FunctionComponent<VideoListProps> = ({
    videos = [],
    selectedCast = undefined,
}) => (
    <>
        {selectedCast && (<>
        <Header as='h2' dividing>
            <Icon name="user circle" />
            <Header.Content>
                <span className="cast-name-hilight">{selectedCast.name}</span>
                さんの動画一覧
            </Header.Content>
        </Header>
        </>)}
        <Item.Group divided>
            {videos.map((video, i) => (
                <VideoItem key={i} video={video} hilightCast={selectedCast} />
            ))}
        </Item.Group>
    </>
);

export default VideoList;