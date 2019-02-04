const fs = require('fs')

const readFile = (path: string, callback: (text: string) => void) => {
    fs.readFile(path, 'utf8', function (err: any, data: string) {
        if (err) {
            console.error(err)
            return
        }
        callback(data)
    })
}

const trim = (origin: string) => origin.replace(/^\s+|\s+$/g,'')

interface Link {
    title: string,
    members: string[],
    date: string,
    url: string,
}

const columnsToObject = (columns: string[]): Link => ({
        title: trim(columns[0]),
        members: columns[1].split("、").map(s => trim(s)),
        date: trim(columns[2]),
        url: trim(columns[3])
})

        
const parseText = (text: string) => {
    const lines = text.split("\n")
    const rows = lines.map((line: string): string[] => line.split("\t") )
    const objects = rows.map(columns => columnsToObject(columns) )
    return objects
}

const filterLink = (link: Link): boolean => (
    link.title !== "" && link.date !== "" && link.members.length > 0 && 
    link.url.indexOf("http") === 0
);

(() => {
    if (process.argv.length != 3) {
        console.error("Usage: ts-node makeTitleMap.ts sources/xxxxx.txt")
        return
    }
    const FILEPATH = process.argv[2]
    readFile(FILEPATH, (text: string) => {
        const links = parseText(text)
        const filteredLinks = links.filter(filterLink)
        const excludedLinks = links.filter(link => links.indexOf(link) < 0)
        if (excludedLinks.length > 0) {
            console.error("Something has filtered.")
        }
        const json = JSON.stringify(filteredLinks, null, "\t")
        const result = "/* Made at [" + new Date().toString() + "] */\n" +
            "const json = \n" +
            json +
            ";\n\n" +
            "export default json;";
        console.log( result )
    })
})();