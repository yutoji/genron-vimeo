import ArchiveVideo, { Cast } from "../domain/ArchiveVideo";

export enum VideoActionType {
    OPEN_VIDEO = "OPEN",
    SELECT_CAST = "SELECT_CAST",
    SHOW_ALL_VIDEO = "SHOW_ALL_VIDEO",
}

export interface VideoAction {
    type: string,
    video?: ArchiveVideo,
    cast?: Cast,
}

export const openVideo = (video: ArchiveVideo): VideoAction => ({
    type: VideoActionType.OPEN_VIDEO,
    video: video,
});

export const selectCast = (cast: Cast): VideoAction => ({
    type: VideoActionType.SELECT_CAST,
    cast: cast,
});

export const showAllVideo = () => ({
    type: VideoActionType.SHOW_ALL_VIDEO,
})