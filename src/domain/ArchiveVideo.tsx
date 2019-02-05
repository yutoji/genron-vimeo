export interface Cast {
    name: string
}

interface ArchiveVideo {
    title: string
    casts: Cast[]
    dateString: string
    url: string
    date: Date
    rawJson?: any
}

export default ArchiveVideo
