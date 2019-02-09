import ArchiveVideo, { Cast } from "../domain/ArchiveVideo";
import { Dispatch } from "react";

export enum VideoActionType {
    OPEN_VIDEO = "OPEN",
    SELECT_CAST = "SELECT_CAST",
    SHOW_ALL_VIDEO = "SHOW_ALL_VIDEO",
    SHOW_ALL_CAST_TAGS = "SHOW_ALL_CAST_TAGS",
    DEFAULT_CAST_TAGS = "OMMIT_CAST_TAGS",
}

export interface VideoAction {
    type: string,
    video?: ArchiveVideo,
    cast?: Cast,
}

export const openVideo = (video: ArchiveVideo) => (): VideoAction => {
    window.open(video.url)
    return {
        type: VideoActionType.OPEN_VIDEO,
        video: video,
    }
};

export const selectCast = (cast: Cast): VideoAction => {
    const element = document.getElementById("video-select-ref");
    if (element != null && element.scrollIntoView) {
        element.scrollIntoView()        
    }
    return ({
        type: VideoActionType.SELECT_CAST,
        cast: cast,
    })
};

export const showAllVideo = () => ({
    type: VideoActionType.SHOW_ALL_VIDEO,
})

export const showAllCastTags = () => ({
    type: VideoActionType.SHOW_ALL_CAST_TAGS,
})

export const defaultCastTags = () => ({
    type: VideoActionType.DEFAULT_CAST_TAGS,
})
