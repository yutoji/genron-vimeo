import * as React from 'react'
import ArchiveVideo from '../domain/ArchiveVideo';
import { Item, Icon, Button, Label } from 'semantic-ui-react';


export interface VideoItemProps {
    video: ArchiveVideo;
    tapCast?: () => void;
    tapVimeo?: () => void;
}

const VideoItem: React.FunctionComponent<VideoItemProps> = ({
    video,
    tapCast = () => {},
    tapVimeo = () => {},
}) => (
    <Item>
        <Item.Content>
            <Item.Meta>{video.dateString}</Item.Meta>

            <Item.Header>
                {video.casts.map(cast => cast.name).join(" × ")}
            </Item.Header>
            <Item.Description>{video.title}</Item.Description>

            <Item.Extra>
                <Button primary floated='right'>
                    <Icon name="vimeo" />
                    Vimeo
                </Button>
                {video.casts.reverse().map((cast, i) => (
                    <Button size="mini" key={i} floated="right">
                        {cast.name}
                    </Button>
                ))}
            </Item.Extra>
        </Item.Content>
    </Item>
);

export default VideoItem;
