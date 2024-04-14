import { Flex, Text, Button, Card, Box, TextField, Heading, ScrollArea, IconButton, Tooltip } from "@radix-ui/themes"
import { useEffect, useRef, useState } from "react"
import DESIGN_TOKENS from "../../scripts/design_tokens"
import { Text2, Text3 } from "../DesignPrimitives"
import { debounce, scrollElementVisible } from "../../scripts/commons"

export default function AutoComplete(props) {
    const [val, setval] = props?.inputVal || useState("")
    const [focus, setfocus] = useState(false)
    const [suggests, setsuggests] = props.suggests
    const [showSuggests, setshowSuggests] = useState(false)
    const [index, setindex] = useState(-1)

    const scrollEl = useRef()
    const itemEl = useRef()
    const inputEl = useRef()

    // manage focus
    useEffect(() => {
        if (!focus) setshowSuggests(false)
        if (focus && suggests.length > 0) setshowSuggests(true)
    }, [focus])

    useEffect(() => {
        // change index to -1 when sugession is off
        if (showSuggests === false) {
            setindex(-1)
        }
    }, [showSuggests])

    // handling suggests change
    useEffect(() => {
        if (suggests.length > 0 && focus) setshowSuggests(true)
    }, [suggests])

    // close if index is changed to -1
    useEffect(() => {
        if (index < 0) setshowSuggests(false)
        if (index >= 0 && suggests.length > 0 && showSuggests == false) setshowSuggests(true)
    }, [index])

    // debounced trigger
    const debouncedInput = useRef(
        debounce((inputVal) => {
            props?.onDebounce?.(inputVal)
        }, 1000)
    )
    useEffect(() => {
        props?.onInput?.()
        if (val == "") {
            props?.onChange?.(val)
            setshowSuggests(false)
            setsuggests([])
        }
        debouncedInput.current(val)
    }, [val])

    // navigation manage
    function selectItem() {
        let newVal = ""
        setshowSuggests(() => {
            setval((v) => {
                newVal = index >= 0 ? suggests[index] : val
                props?.onChange?.(newVal)
                return newVal
            })
            return false
        })
        return newVal
    }

    function handleKeyDown(e) {
        setindex((v) => {
            const dir = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0
            const len = suggests.length - 1
            v += dir
            if (dir !== 0 && e.shiftKey === false) {
                e.preventDefault()
            }
            if (e.key === "Enter" && e.shiftKey === false) {
                const newVal = selectItem()
                props?.onChange?.(newVal)
            }

            if (dir == 1 && index == -1 && suggests.length > 0 && showSuggests == false) {
                setshowSuggests(true)
            }

            // scroll if offview
            setTimeout(() => {
                if (showSuggests && dir != 0 && index > 0) {
                    const { visible, offBy } = scrollElementVisible(scrollEl.current, itemEl.current)
                    if (!visible.y) {
                        scrollEl.current.children[1].scrollBy(0, offBy.y * 1.5)
                    }
                }
            }, 0)
            return v <= -1 ? -1 : v >= len ? len : v
        })
    }

    function handleInput(e) {
        setval(e.target.value)
        props?.onInput?.(e)
    }

    // const { appearance, accentColor, grayColor } = useContext(useThemeContext)

    return (
        <>
            <Box>
                {/* input box */}
                <Flex direction={"column"} justify={"center"} gap={"1"} className="w-full">
                    <Flex direction={"row"} className="relative group" gap={"2"}>
                        <TextField.Root ref={inputEl} onFocus={(e) => setfocus(true)} onBlur={(e) => setfocus(false)} onKeyDown={handleKeyDown} onInput={handleInput} value={val} className="w-full" placeholder="type a word" size={"3"} radius="large">
                            <TextField.Slot side="right">
                                <Tooltip content="Clear">
                                    <IconButton
                                        onClick={() => {
                                            setval("")
                                            inputEl.current.focus()
                                        }}
                                        className="invisible focus:visible group-hover:visible"
                                        color="gray"
                                        variant="ghost"
                                        size={"1"}
                                    >
                                        <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                                        </svg>
                                    </IconButton>
                                </Tooltip>
                            </TextField.Slot>
                        </TextField.Root>
                        {showSuggests ? (
                            <Box className="absolute w-full top-[100%] left-0 z-10">
                                <ScrollArea asChild scrollbars="vertical" className="max-h-[250px]">
                                    <Card ref={scrollEl} variant="surface" className="rounded-2 p-2">
                                        <Flex direction={"column"}>
                                            {suggests.map((word, i) => {
                                                return (
                                                    <Box ref={index === i ? itemEl : null} className={`p-1 px-3 cursor-pointer rounded-1${index === i ? " bg-accent-6" : ""}`} onMouseOver={(e) => setindex(i)} onMouseDown={() => selectItem()} key={i}>
                                                        <Text3>{word}</Text3>
                                                    </Box>
                                                )
                                            })}
                                        </Flex>
                                    </Card>
                                </ScrollArea>
                            </Box>
                        ) : (
                            ""
                        )}
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}
