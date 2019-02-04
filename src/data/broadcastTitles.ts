import BroadcastTitle, { Cast } from "../domain/BroadcastTitle";
import json from "./titles-data";


const broadcastTitles: BroadcastTitle[] =
 json.map((row): BroadcastTitle => ({
    title:      row.title,
    casts:      row.members.map( member => ({ name: member }) ),
    url:        row.url,
    dateString: row.date,
    date:       new Date(row.date),
    rawJson:    row,
 }));

export default broadcastTitles;
