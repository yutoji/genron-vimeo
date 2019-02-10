import Loader from './Loader'
import * as fs from 'fs'

if (process.argv.length != 3) {
    throw Error("Usage: `ts-node ./writevimeos.ts [output_filepath]`")
}
const outputPath = process.argv[2]

console.log("will output to: " + outputPath)

const makeTsString = (json: string): string => {
    const prefix = "/* Made at " + Date().toString() + " \*/"
    const startConst = "const json = "
    const exportDefault = "export default json;"
    const result = `${prefix}\n${startConst}\n\n${json}\n\n${exportDefault}\n`
    return result
}

const writeTo = (filepath: string, json: string) => {
    const tsBody = makeTsString(json)
    fs.writeFileSync(filepath, tsBody)
    console.log("Successfully done.")
}

const loader = new Loader()
loader.loadVimeoListJson(json => {
    if (json == null) {
        throw new Error("Failed.")
        return
    }
    writeTo(outputPath, json)
})

console.log("Hello, Vimeo videos loader.")