import ArchiveVideo, { Cast } from "./domain/ArchiveVideo";
import { VideoAction, VideoActionType, selectCast } from "./actions/video";
import archiveVideos from "./data/archiveVideos";

export interface AppState {
    allVideos: ArchiveVideo[],
    videos: ArchiveVideo[],  
    selectedCast?: Cast,
}

type Action = VideoAction

export const initialState = {
    allVideos: archiveVideos,
    videos: archiveVideos,
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
        case VideoActionType.OPEN_VIDEO:
            return state;
    }
    return state
};

export default appReducer;
