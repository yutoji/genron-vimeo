import ArchiveVideo, { Cast } from "./domain/ArchiveVideo";
import { VideoAction, VideoActionType } from "./actions/video";
import archiveVideos from "./data/archiveVideos";
import getUniqueSortedCasts from "./domain/getUniqueSortedCasts";

export interface AppState {
    allVideos: ArchiveVideo[];
    allCasts: Cast[];
    videos: ArchiveVideo[];
    showingCastTags: Cast[];
    selectedCast?: Cast;
}

type Action = VideoAction

const allCasts = getUniqueSortedCasts(archiveVideos.flatMap(video => video.casts));
const DEFAULT_SHOWING_CAST_TAGS = 22;

export const initialState = {
    allVideos: archiveVideos,
    allCasts: allCasts,
    videos: archiveVideos,
    showingCastTags: allCasts.slice(0, DEFAULT_SHOWING_CAST_TAGS),
    selectedCast: undefined,
}

const appReducer = (state: AppState, action: Action): AppState => {
    console.log(action.type);
    switch (action.type) {
        case VideoActionType.SELECT_CAST:
            const selectedCast = action.cast;
            return {
                ...state,
                videos: selectedCast && state.allVideos.filter(
                    (video) => video.casts.some(cast => cast.name == selectedCast.name)
                ) || state.allVideos,
                selectedCast,
            };
        case VideoActionType.SHOW_ALL_VIDEO:
            return {
                ...state,
                videos: state.allVideos,
                selectedCast: undefined,
            }
        case VideoActionType.OPEN_VIDEO:
            return state;
        case VideoActionType.SHOW_ALL_CAST_TAGS:
            return {
                ...state,
                showingCastTags: state.allCasts,
            };
        case VideoActionType.DEFAULT_CAST_TAGS:
            return {
                ...state,
                showingCastTags: state.allCasts.slice(0, DEFAULT_SHOWING_CAST_TAGS),
            };
        case VideoActionType.DEFAULT_CAST_TAGS_AND_RESET_SELECTED:
            return {
                ...state,
                videos: state.allVideos,
                selectedCast: undefined,
                showingCastTags: state.allCasts.slice(0, DEFAULT_SHOWING_CAST_TAGS),
            };
    }
    return state
};

export default appReducer;
