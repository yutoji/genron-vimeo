import { Cast } from "../domain/ArchiveVideo";
import { connect } from "react-redux";
import CastTagList, { CastTagListProps } from "../components/CastTagList";
import { AppState } from "../reducer";
import { bindActionCreators } from "redux";
import { Dispatch } from "react";
import { selectCast, VideoAction, showAllCastTags, showAllVideo, defaultCastTags, defaultCastTagsAndResetSelected } from "../actions/video";


interface StateProps {
    casts: Cast[];
    selectedCast?: Cast;
    numMoreShowable: number;
}

interface DispatchProps {
    tapCast: (cast: Cast) => void;
    tapShowMore: () => void;
    tapDefault: () => void;
    tapMinimize: () => void;
}

export default connect<StateProps, DispatchProps, CastTagListProps>(
    // mapStateToProps
    ((state: AppState): StateProps => ({
        casts: state.showingCastTags,
        selectedCast: state.selectedCast,
        numMoreShowable: state.allCasts.length - state.showingCastTags.length,
    })) as any,
    // mapDispatchToProps
    (dispatch: Dispatch<VideoAction>): DispatchProps => 
        bindActionCreators({
            tapCast: cast => selectCast(cast),
            tapShowMore: showAllCastTags,
            tapDefault: defaultCastTagsAndResetSelected,
            tapMinimize: defaultCastTags,
        }, dispatch as any)
)(CastTagList);
