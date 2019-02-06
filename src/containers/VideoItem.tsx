import ArchiveVideo, { Cast } from "../domain/ArchiveVideo";
import { AppState } from '../reducer';
import { Dispatch } from "react";
import { VideoAction, selectCast, openVideo } from "../actions/video";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoItem, { VideoItemProps } from '../components/VideoItem';

interface StateProps {
}

interface DispatchProps {
    tapCast: (cast: Cast) => void;
    tapVimeo: (video: ArchiveVideo) => void;
}

const mapStateToProps = (state: AppState): StateProps => ({

})

const mapDispatchToProps = (dispatch: Dispatch<VideoAction>): DispatchProps => 
    bindActionCreators(
        {
            // props to making Action func
            tapCast: (cast: Cast) => selectCast(cast), // selectCast(cast) returns VideoAction
            tapVimeo: (video: ArchiveVideo) => openVideo(video), // openVideo return VideoAction
        },
        dispatch as any
    )

export default connect<StateProps, DispatchProps, VideoItemProps>(
    mapStateToProps,
    mapDispatchToProps,
)(VideoItem);
