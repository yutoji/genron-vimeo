import { Cast } from "./ArchiveVideo";

const getUniqueSortedCasts = (casts: Cast[]): Cast[] => {
    type Pair = {cast: Cast, count: number};
    let castMap = new Map<string, Pair>()
    casts.forEach(cast => {
        const pair = castMap.get(cast.name) || {cast: cast, count: 0};
        const newPair = {...pair, count: pair.count + 1};
        castMap.set(cast.name, newPair);
    });
    let pairs: Pair[] = []
    castMap.forEach(pair => {pairs.push(pair)});
    const pairsSorted = pairs.sort((a, b) => a.count - b.count).reverse();
    return pairsSorted.map(pair => pair.cast)
};

export default getUniqueSortedCasts;