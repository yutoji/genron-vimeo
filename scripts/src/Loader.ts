import { parse } from "querystring";

const client = require("request")

const VIMEO_LIST_TSV = "https://docs.google.com/spreadsheets/d/1sGPIJhhnhFzsBS4K5-0JozcNQbK6AqLkObFKJkbHEjo/export?format=tsv&gid=1923150175"
const VALID_VIDEOS_MINIMUM_COUNT = 100

interface Video {
    title: string
    members: string[]
    date: string
    url: string
    rawString: string
    isUndef?: boolean
}

interface UndefVideo {
    rawString: string
    isUndef: boolean
}

const parseVideo = (row: string): Video | UndefVideo => {
    const cols = row.split(/\t/)
    const undefRet = { rawString: row, isUndef: true } 
    if (cols.length < 4) { return undefRet }
    const [title, rawMembers, date, url] = cols.map(s => s.trim())
    const members = rawMembers.split("、")
    const isValid = title.length > 3 &&
                    members.length > 0 && members[0].length > 0 &&
                    date.match(/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/) &&
                    url.match(/^https?:\/\//) &&
                    true;
    if (!isValid) {
        return undefRet
    }
    return {
        title, members, date, url, rawString: row
    }
}

class Loader {
    parse(body: string): Video[] {
        const rows = body.split(/[\n\r]+/)
        const parsedVideos = rows.map(row => parseVideo(row))
        parsedVideos.forEach((videoOpt) => {
            if (videoOpt.isUndef) {
                console.log("Not defined row: \"" + videoOpt.rawString + "\"")
            }
        });
        const videos = parsedVideos.filter(parsed => !parsed.isUndef ).map(v => v as Video)
        videos.slice(0, 3).forEach(video => {
            console.log("Sample defined row: \"" + video.rawString + "\"")
            console.log(video)
        })
        console.log(`rows.length=${rows.length}, parsedVideos.length=${parsedVideos.length}`)
        return videos
    }

    toJson(videos: Video[]): string {
        const json = JSON.stringify(videos, null, "\t")
        return json
    }

    loadVimeoListJson(callback: (videosJson: string | undefined) => void) {
        client.get({
            url: VIMEO_LIST_TSV
        }, (error: any, response: any, body: string) => {
            if (error) {
                callback(undefined)
                return
            }
            const videos = this.parse(body)
            if (videos.length < VALID_VIDEOS_MINIMUM_COUNT) {
                callback(undefined)
            }
            const json = this.toJson(videos)
            callback(json)
        })
    }
}

export default Loader;
