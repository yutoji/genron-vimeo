import ArchiveVideo, { Cast } from '../domain/ArchiveVideo';
import { AppState } from '../reducer';
import { Dispatch } from 'react';
import { VideoAction, showAllVideo, showMoreVideos } from '../actions/video';
import { bindActionCreators } from 'redux';
import VideoList, { VideoListProps } from '../components/VideoList';
import { connect } from 'react-redux';

interface StateProps {
    videos: ArchiveVideo[];
    selectedCast?: Cast;
    isOmmitingVideos: boolean;
}

interface DispatchProps {
    tapCastClose: () => void;
    tapShowMore: () => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
    videos: state.videos,
    selectedCast: state.selectedCast,
    isOmmitingVideos: state.isOmmitingVideos,
})

const mapDispatchToProps = (dispatch: Dispatch<VideoAction>): DispatchProps => 
    bindActionCreators(
        {
            tapCastClose: showAllVideo,
            tapShowMore: showMoreVideos,
        },
        dispatch as any
    );

export default connect<StateProps, DispatchProps, VideoListProps>(
    mapStateToProps as any,
    mapDispatchToProps,
)(VideoList);
