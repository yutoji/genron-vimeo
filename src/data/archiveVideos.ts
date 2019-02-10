import ArchiveVideo, { Cast } from "../domain/ArchiveVideo";
import json from "./titles-data";

const archiveVideos: ArchiveVideo[] =
 json.map((row): ArchiveVideo => ({
    title:      row.title,
    casts:      row.members.map( member => ({ name: member }) ),
    url:        row.url,
    dateString: row.date,
    date:       new Date(row.date),
    rawJson:    row,
 }))
 .sort((a, b) => a.date.getTime() - b.date.getTime())
 .reverse() // 最新順

export default archiveVideos;
