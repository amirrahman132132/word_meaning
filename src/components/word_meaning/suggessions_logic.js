import { charToCodeArray , codeArrayToChar } from "./../../scripts/commons"
import { SS } from "./sequencial_search"
export default function suggessions_logic(){
    const codes = []
    async function loadData(){
        const data = await import('./dictionary.json')
        await dataProcessing(data)
        return true
    }

    function dataProcessing(data){
        return new Promise((res,rej)=>{
            const wordList = Object.keys(data)
            for(let i = 0; i < wordList.length; i++){
                const word = wordList[i]
                codes[i] = charToCodeArray(word)
            }
            res()
        })   
    }

    async function search(val , callback){
        const res = await SS.findClosely(charToCodeArray(val) , codes)
        const formatted = res.results.slice(-20).map((each,i)=>{
            return codeArrayToChar(codes[each.index])
        })
        return formatted.sort((a,b) => a.length - b.length)
    }

    return {
        search ,
        loadData
    }
}