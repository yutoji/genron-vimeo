import ArchiveVideo, { Cast } from "./domain/ArchiveVideo";
import { VideoAction, VideoActionType, selectCast, showAllVideo } from "./actions/video";
import archiveVideos from "./data/archiveVideos";
import getUniqueSortedCasts from "./domain/getUniqueSortedCasts";
import logger from "./logger";
import { Dispatch } from "react";

export interface AppState {
    allVideos: ArchiveVideo[];
    allCasts: Cast[];
    videos: ArchiveVideo[];
    showingCastTags: Cast[];
    selectedCast?: Cast;
    isOmmitingVideos: boolean;
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
    isOmmitingVideos: true,
}

export const changeInitialStateWithURI = (state: AppState): AppState => {
    const hash = location.pathname.slice(1)
    const decodedHash = decodeURI(hash)
    const isTargetCast = (cast: Cast) => (cast.name == hash || cast.name == decodedHash)
    const cast = state.allCasts.find(eachCast => isTargetCast(eachCast))
    if (cast != null) {
        return {
            ...state,
            selectedCast: cast
        }
    }
    return state
}

const pushStateWithPath = (path: string) => {
    if (path == location.pathname) { return }
    if (window.history && window.history.pushState) {
        logger.log("pushState: " + path)
        window.history.pushState({}, "", path)
    }
}

export const changeURIWithState = (state: AppState) =>  {
    const hash = state.selectedCast && state.selectedCast.name || "";
    pushStateWithPath("/" + hash)
}

export const changeStateWithPathIfNeeded = (state: AppState, dispatch: Dispatch<VideoAction>) => {
    logger.log("changeStateWithPathIfNeeded.")
    const castName = location.pathname.slice(1)
    const decodedCastName = decodeURI(castName)
    if (castName == "") {
        if (state.selectedCast == null) {
            return
        }
        logger.log("    dispatch to selectedCast=undefined.")
        return dispatch(showAllVideo())
    }
    const stateCastName = state.selectedCast && state.selectedCast.name || "";
    if ([castName, decodedCastName].some(pathName => pathName == stateCastName)) {
        return
    }
    const nextSelectedCast = state.allCasts.find((c) => (
        c.name == castName || c.name == decodedCastName)
    ) || undefined
    logger.log("    dispatch to selectedCast=" + `${nextSelectedCast}`);
    return dispatch(nextSelectedCast &&
        selectCast(nextSelectedCast) ||
        showAllVideo()
    )
}

const defaultStateForAllVideos = (state: AppState): AppState => ({
    ...state,
    videos: state.allVideos,
    selectedCast: undefined,
    isOmmitingVideos: true,    
})

const appReducer = (state: AppState, action: Action): AppState => {
    logger.log(action.type);
    switch (action.type) {
        case VideoActionType.SELECT_CAST:
            const selectedCast = action.cast;
            return {
                ...state,
                videos: selectedCast && state.allVideos.filter(
                    (video) => video.casts.some(cast => cast.name == selectedCast.name)
                ) || state.allVideos,
                selectedCast,
                isOmmitingVideos: true,
            };
        case VideoActionType.SHOW_ALL_VIDEO:
            return {
                ...defaultStateForAllVideos(state),
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
                ...defaultStateForAllVideos(state),
                showingCastTags: state.allCasts.slice(0, DEFAULT_SHOWING_CAST_TAGS),
            };
        case VideoActionType.SHOW_MORE_VIDEOS:
            return {
                ...state,
                isOmmitingVideos: false,
            };
    }
    return state
};

export default appReducer;
