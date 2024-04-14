export class SS {
    static sequenceMatching(search, target) {
        let lastIndex = 0,
            matches = 0,
            gaps = 0,
            test = '',
            misses = 0
        for (let i = 0; i < search.length; i++) {
            const p1 = search[i]
            for (let j = lastIndex; j < target.length; j++) {
                const p2 = target[j]
                if (p1 == p2) {
                    matches++
                    gaps += (j - lastIndex)
                    lastIndex = j + 1
                    break
                }
                else {
                    misses++
                }
            }
        }
        // console.log(test)

        return {
            matchesCount: matches,
            gaps,
            misses
        }
    }

    /*
        [101, 115, 116, 97, 98, 108, 105, 115, 104, 101, 100]
        [105, 115, 116, 97, 98, 108, 105, 115, 104, 101, 100]
    */


    // return indexes of closely matching data from array
    static findClosely(search, collection , maxResult = 10) {
        return new Promise((res, rej) => {
            const output = []
            const time = Date.now()

            console.time("search time")
            let lastGap = -1
            for (let c = 0; c < collection.length; c++) {
                const target = collection[c]
                const { matchesCount, gaps } = SS.sequenceMatching(search, target)
                if (matchesCount >= search.length) {
                    if(lastGap == -1 || lastGap >= gaps) {
                        output.push({ index: c, gaps , matchesCount })
                        lastGap = gaps
                    } 
                }
            }
            console.timeEnd("search time")

            res({
                results: output,
                took_time: (Date.now() - time) / 1000
            })
        })
    }
}