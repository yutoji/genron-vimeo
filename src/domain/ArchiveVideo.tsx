export interface Cast {
    name: string
}

export default interface ArchiveVideo {
    title: string
    casts: Cast[]
    dateString: string
    url: string
    date: Date
    rawJson?: any
}

