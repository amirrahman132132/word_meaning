import { Avatar, Box, Button, Card, Flex, Heading, IconButton, Skeleton, Link, Quote, ScrollArea, Separator, Spinner, Strong, Tabs, Text, Tooltip } from "@radix-ui/themes"
import { useContext, useEffect, useRef, useState } from "react"
import { debounce } from "../../scripts/commons"

import LoadingAnimation from "./assets/loading.gif"
import { ContextProvider, ContextSystem } from "../Provider"
import { Head1, Head2, Head3, Section1, Section2, Section3 } from "../DesignPrimitives"
import DESIGN_TOKENS from "../../scripts/design_tokens"
import { PlayAudioElement } from "../complete_components/Reusables"

export default function WordDetails(props) {
    const [inputVal, setinputVal] = props.inputVal
    const [searchState, setsearchState] = useState(0) // 0 = empty input , 1 = loading , 2 = result , 3 = error
    const [result, setresult] = useState([])
    const [searchTerm, setsearchTerm] = useState("")

    // debounce manage
    const debouncedInput = useRef(
        debounce(function (val) {
            setsearchTerm(val)
        }, 0)
    )

    useEffect(() => {
        if (inputVal === "") {
            setsearchState(0)
        } else {
            setsearchState(1)
            debouncedInput.current(inputVal)
        }
    }, [inputVal])

    // manage search changes
    async function onWordInput(word) {
        if (searchState !== 0) {
            const res = await getWordData(word)
            setresult(res)
            setsearchState(2)
        }
    }

    useEffect(() => {
        onWordInput(searchTerm)
    }, [searchTerm])

    async function getWordData(word) {
        try {
            let res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
            res = await res.json()
            return res
        } catch (error) {
            setsearchState(3)
            throw error
        }
    }

    function handleRetry() {
        setsearchState(1)
        onWordInput(inputVal)
    }

    // manage stages for component

    const resultDom =
        result && result.title === "No Definitions Found" ? (
            <MessageBox>
                <Head1 className="text-accent-11">No Result Found For "{inputVal}"</Head1>
            </MessageBox>
        ) : (
            <GenerateDataDom result={result} />
        )

    const loadingDom = (
        <MessageBox>
            <Avatar size={"4"} src={LoadingAnimation} />
            <Head1 className="text-accent-11">Searching for "{inputVal}"</Head1>
        </MessageBox>
    )

    const emptyDom = (
        <MessageBox>
            <Head1 className="text-accent-11">Search Something</Head1>
        </MessageBox>
    )

    const errorDom = (
        <MessageBox>
            <Head1 className="text-accent-11">Something Went Wrong !</Head1>
            <Button onClick={handleRetry} variant="solid" px={"4"}>
                <Text>Retry</Text>
                <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
            </Button>
        </MessageBox>
    )
    // main component
    return (
        <ContextProvider value={[inputVal, setinputVal]}>
            <Box className="bg-gray-2 rounded-4">{[emptyDom, loadingDom, resultDom, errorDom][searchState]}</Box>
        </ContextProvider>
    )
}

/*==========================================================================================
        seperate components
==========================================================================================*/

function MessageBox(props) {
    return (
        <Card variant="ghost">
            <Section3 className="p-5" direction={"column"} minHeight={"40px"} align={"center"} justify={"center"}>
                {props.children}
            </Section3>
        </Card>
    )
}

function LinksList(props) {
    const [inputVal, setinputVal] = useContext(ContextSystem)
    return (
        <>
            {props.arr.length > 0 ? (
                <Section3>
                    <Head3 className="capitalize">{props.title}</Head3>
                    <Card variant="ghost">
                        <Flex gap={DESIGN_TOKENS.gap3} wrap={"wrap"}>
                            {props.arr.map((eachResult, i) => {
                                return (
                                    <Tooltip key={i} content={`Search For "${eachResult}"`}>
                                        <Link onClick={() => setinputVal(eachResult)} className={"cursor-pointer"}>
                                            <Head3>{eachResult}</Head3>
                                        </Link>
                                    </Tooltip>
                                )
                            })}
                        </Flex>
                    </Card>
                </Section3>
            ) : (
                ""
            )}
        </>
    )
}

function GenerateDataDom(props) {
    const res = props.result[0].meanings
    const [inputVal, setinputVal] = useContext(ContextSystem)

    const dataFilledDom = (
        <Tabs.Root defaultValue={res[0].partOfSpeech}>
            <Tabs.List>
                {res.map((mean, i) => {
                    return (
                        <Tabs.Trigger key={i} value={mean.partOfSpeech}>
                            <Heading size={"2"}>{mean.partOfSpeech}</Heading>
                        </Tabs.Trigger>
                    )
                })}
            </Tabs.List>
            <Box className="p-5">
                {res.map((mean, i) => {
                    return (
                        <Tabs.Content key={i} value={mean.partOfSpeech}>
                            <ScrollArea className="max-h-[250px]" scrollbars="vertical">
                                <Section2>
                                    <Flex className="w-max" overflow={"visible"} justify={"center"} gap={DESIGN_TOKENS.gap3}>
                                        <Head1 className="" color={"gray"}>
                                            {inputVal}
                                        </Head1>
                                        <PlayAudioElement link={props.result[0].phonetics.find((ss) => ss.audio)?.audio || ""} />
                                    </Flex>
                                    <Section3>
                                        <Head3>Meanings</Head3>
                                        {mean.definitions.map((definition, j) => {
                                            return (
                                                <Flex justify={"start"} gapX={"2"} key={j}>
                                                    <Text color="gray" size={"2"}>
                                                        {j + 1}.
                                                    </Text>
                                                    {/* <DotFilledIcon /> */}
                                                    <Text size={"2"}>{definition.definition}</Text>
                                                </Flex>
                                            )
                                        })}
                                    </Section3>
                                    <LinksList title="Synonyms" arr={mean.synonyms} />
                                    <LinksList title="Antonyms" arr={mean.antonyms} />
                                </Section2>
                            </ScrollArea>
                        </Tabs.Content>
                    )
                })}
            </Box>
        </Tabs.Root>
    )
    return dataFilledDom
}
