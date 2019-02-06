import { Cast } from "./domain/ArchiveVideo";
import { VideoAction, VideoActionType } from "./actions/video";

export interface AppState {
    selectedCast?: Cast,
}

export const initialState = {
    selectedCast: null,
}

type Action = VideoAction

const appReducer = (state: AppState, action: Action) => {
    console.log(action.type);
    switch (action.type) {
        case VideoActionType.SELECT_CAST:
            return {
                ...state,
                selectedCast: action.cast,
            };
        case VideoActionType.OPEN_VIDEO:
            return state;
    }
    return state
};

export default appReducer;
