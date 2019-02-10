import * as React from 'react';
import ArchiveVideo, { Cast } from '../domain/ArchiveVideo';
import { Item, Header, Icon, Button, ButtonGroup } from 'semantic-ui-react';
import VideoItem from '../containers/VideoItem';
import logger from '../logger';

export interface VideoListProps {
    videos?: ArchiveVideo[];
    selectedCast?: Cast;
    tapCastClose?: () => void;
    isOmmitingVideos?: boolean;
    tapShowMore?: () => void;
}

const DEFAULT_VISIBLE_VIDEOS_COUNT = 30;

const VideoList: React.FunctionComponent<VideoListProps> = ({
    videos = [],
    selectedCast = undefined,
    tapCastClose = () => {},
    isOmmitingVideos = true,
    tapShowMore = () => {},
}) => {
    const needsOmmit = isOmmitingVideos && videos.length > DEFAULT_VISIBLE_VIDEOS_COUNT;
    const visibleVideos = needsOmmit && videos.slice(0, DEFAULT_VISIBLE_VIDEOS_COUNT) || videos;
    return (
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
            {visibleVideos.map((video, i) => (
                <VideoItem key={i} video={video} />
            ))}
        </Item.Group>
        {needsOmmit &&
        <Button onClick={tapShowMore} fluid size="big">
            <Icon name="triangle down" />
            Show More Videos ({videos.length - visibleVideos.length})
        </Button>
        }
    </>
)};

export default VideoList;