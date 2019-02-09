export interface Cast {
    name: string,
    numVideos?: number,
};

interface ArchiveVideo {
    title: string
    casts: Cast[]
    dateString: string
    url: string
    date: Date
    rawJson?: any
};

export default ArchiveVideo;
