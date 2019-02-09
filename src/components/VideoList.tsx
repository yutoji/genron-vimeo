import * as React from 'react';
import ArchiveVideo, { Cast } from '../domain/ArchiveVideo';
import { Item, Header, Icon, Button, ButtonGroup } from 'semantic-ui-react';
import VideoItem from '../containers/VideoItem';

export interface VideoListProps {
    videos?: ArchiveVideo[];
    selectedCast?: Cast;
    tapCastClose?: () => void;
}

const VideoList: React.FunctionComponent<VideoListProps> = ({
    videos = [],
    selectedCast = undefined,
    tapCastClose = () => {}
}) => (
    <>
        <Header as='h2' dividing>
            <Header.Content>
            {selectedCast && (<>
                <Icon name="user circle" />
                <span className="cast-name-hilight">{selectedCast.name}</span>
                さんの動画一覧
                &nbsp;&nbsp;
                <Icon name="close" className="cursor-pointer" onClick={tapCastClose} />
            </>) || (<>
                <Icon name="globe" /><span>すべての動画</span> 
            </>)}
            </Header.Content>
        </Header>
        <Item.Group divided>
            {videos.map((video, i) => (
                <VideoItem key={i} video={video} />
            ))}
        </Item.Group>
    </>
);

export default VideoList;