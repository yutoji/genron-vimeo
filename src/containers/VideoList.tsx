import ArchiveVideo, { Cast } from '../domain/ArchiveVideo';
import { AppState } from '../reducer';
import { Dispatch } from 'react';
import { VideoAction, showAllVideo } from '../actions/video';
import { bindActionCreators } from 'redux';
import VideoList, { VideoListProps } from '../components/VideoList';
import { connect } from 'react-redux';

interface StateProps {
    videos: ArchiveVideo[];
    selectedCast?: Cast;
}

interface DispatchProps {
    tapCastClose: () => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
    videos: state.videos,
    selectedCast: state.selectedCast,
})

const mapDispatchToProps = (dispatch: Dispatch<VideoAction>): DispatchProps => 
    bindActionCreators(
        {
            tapCastClose: showAllVideo
        },
        dispatch as any
    );

export default connect<StateProps, DispatchProps, VideoListProps>(
    mapStateToProps as any,
    mapDispatchToProps,
)(VideoList);
