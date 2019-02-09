import * as React from 'react';
import { Cast } from "../domain/ArchiveVideo";
import { Button, Segment, Icon } from "semantic-ui-react";

export interface CastTagListProps {
    casts?: Cast[];
    selectedCast?: Cast;
    numMoreShowable?: number;
    tapCast?: (cast: Cast) => void;
    tapShowMore?: () => void;
    tapDefault?: () => void;
    tapMinimize?: () => void;
}

const CastTagList: React.FunctionComponent<CastTagListProps> = ({
    casts = [],
    selectedCast = undefined,
    numMoreShowable = 0,
    tapCast = (cast: Cast) => {},
    tapShowMore = () => {},
    tapDefault = () => {},
    tapMinimize = () => {},
}) => (<>
    <Segment piled>
        <Icon name="users" />登壇者一覧<br />
        <Button size="mini" icon="globe" onClick={tapDefault} />
        {casts.map((cast, i) => (
            <Button size="mini" key={i} onClick={() => tapCast(cast)} 
                color={selectedCast === cast && "yellow" || undefined }>
                {cast.name}{cast.numVideos && (" (" + cast.numVideos + ")")}
            </Button>
        ))}
        {numMoreShowable > 0 &&
            (<Button size="mini" color="grey" onClick={tapShowMore}>
                Show More...（{numMoreShowable}）
            </Button>)
        ||
            (<Button size="mini" color="grey" onClick={tapMinimize} icon="close" />)
        }
    </Segment>
</>);

export default CastTagList;
