import * as React from 'react'
import ArchiveVideo, { Cast } from '../domain/ArchiveVideo';
import { Item, Icon, Button, Label } from 'semantic-ui-react';


export interface VideoItemProps {
    video: ArchiveVideo;
    tapCast?: (cast: Cast) => void;
    tapVimeo?: (video: ArchiveVideo) => void;
}

const VideoItem: React.FunctionComponent<VideoItemProps> = ({
    video,
    tapCast = (cast: Cast) => {},
    tapVimeo = (video: ArchiveVideo) => {},
}) => (
    <Item>
        <Item.Content>
            <Item.Meta>{video.dateString}</Item.Meta>

            <Item.Header>
                {video.casts.map(cast => cast.name).join(" × ")}
            </Item.Header>
            <Item.Description>{video.title}</Item.Description>

            <Item.Extra>
                <Button primary floated='right' onClick={() => tapVimeo(video)}>
                    <Icon name="vimeo" />
                    Vimeo
                </Button>
                {video.casts.reverse().map((cast, i) => (
                    <Button size="mini" key={i} floated="right" onClick={() => tapCast(cast)}>
                        {cast.name}
                    </Button>
                ))}
            </Item.Extra>
        </Item.Content>
    </Item>
);

export default VideoItem;
