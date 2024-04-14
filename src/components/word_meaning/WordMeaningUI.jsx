import { Box, Button, Card, DataList, DropdownMenu, Flex, Heading, IconButton, Link, Reset, ScrollArea, Section, SegmentedControl, Select, Separator, Switch, Table, Tabs, Text, TextField, Tooltip, Skeleton } from "@radix-ui/themes"
import AutoComplete from "../autocomplete/AutoComplete"
import { useContext, useEffect, useRef, useState } from "react"
import { Head1, Head2, Head3, Section1, Section2, Section3, Text1, Text2, Text3 } from "../DesignPrimitives"
import WordDetails from "./WordDetails"
import { debounce } from "../../scripts/commons"
import { DarkModeButton } from "../complete_components/Reusables"
import { ContextSystem } from "../Provider"
import { SS } from "./sequencial_search"
import suggessions_logic from "./suggessions_logic"

export default function WordMeaningUI(props) {
    const [suggests, setsuggests] = useState([])
    const [inputVal, setinputVal] = useState("")
    const [searchTerm, setsearchTerm] = useState("")
    const [loading, setloading] = useState(true)
    const sharedData = useContext(ContextSystem)

    // manage prefetched dictionary
    const cachedSearch = useRef()

    useEffect(() => {
        cachedSearch.current = (function () {
            const sl = suggessions_logic()
            sl.loadData().then((res) => {
                setloading(false)
            })
            return sl
        })()
    }, [])

    // match input to searchterm
    useEffect(() => {
        if (searchTerm != inputVal) setinputVal(searchTerm)
    }, [searchTerm])

    // manage input suggessions
    const inputDebounced = useRef(debounce(() => {}, 1000))
    useEffect(inputDebounced.current, [inputVal])

    const SkeletalLayout = (
        <Box className="p-5 rounded-2 relative shadow-4">
            <Section1>
                <Skeleton className="w-36 py-4" />
                <Skeleton className="p-4 w-max rounded-6 absolute right-0 top-0 m-5" />
                <Section3>
                    <Skeleton className="w-14 py-2" />
                    <Skeleton className="w-full py-4" />
                </Section3>
                <Section3>
                    <Skeleton className="w-14 py-2" />
                    <Skeleton className="w-full h-16" />
                </Section3>
            </Section1>
        </Box>
    )

    return (
        <>
            <Box {...props} maxWidth={"600px"}>
                {loading ? (
                    SkeletalLayout
                ) : (
                    <Box className="p-5 rounded-2 relative shadow-4">
                        <DarkModeButton darkMode={sharedData.darkmode} className={"absolute right-0 top-0 m-5"} />
                        <Section1>
                            <Head1>Word Meaning</Head1>
                            <Section2>
                                <Section3>
                                    <Head3>Search</Head3>
                                    <AutoComplete
                                        onChange={(e) => {
                                            setsearchTerm(e)
                                        }}
                                        onDebounce={(e) => {
                                            if (!e) return
                                            cachedSearch.current.search(e).then((res) => {
                                                setsuggests(res)
                                            })
                                        }}
                                        inputVal={[inputVal, setinputVal]}
                                        suggests={[suggests, setsuggests]}
                                    />
                                </Section3>
                                {/* word details */}
                                <Section3>
                                    <Head3>Information</Head3>
                                    <WordDetails inputVal={[searchTerm, setsearchTerm]} />
                                </Section3>
                                <Section3>
                                    {/* <Head3 className="">Sizing</Head3>
                                    <Card>
                                        <Text3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dicta officia, earum illum delectus qui maiores esse dolor. Ipsa consequatur atque hic porro? Aspernatur et iusto dolore. Optio, cumque temporibus?</Text3>
                                    </Card> */}
                                </Section3>
                            </Section2>
                        </Section1>
                    </Box>
                )}
            </Box>
        </>
    )
}
