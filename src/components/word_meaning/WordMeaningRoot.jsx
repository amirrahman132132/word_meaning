import { Box, Button, Card, DropdownMenu, Flex, Heading, IconButton, Link, ScrollArea, Section, Separator, Text, Theme, ThemePanel, Tooltip } from "@radix-ui/themes"
import AutoComplete from "../autocomplete/AutoComplete"
import { useRef, useState } from "react"
import WordMeaningUI from "./WordMeaningUI"
import { ContextProvider } from "../Provider"

export default function WordMeaningRoot() {
    // gap = 6 , 4 , 1
    // head = 6 , 4 , 2

    const [darkmode, setdarkmode] = useState(true)

    const forContext = {
        darkmode: [darkmode, setdarkmode]
    }

    return (
        <>
            <Theme appearance={darkmode ? "dark" : "light"} accentColor="cyan" grayColor="mauve" panelBackground="solid" radius="full">
                <ContextProvider value={forContext}>
                    <WordMeaningUI className="m-auto my-5" />
                </ContextProvider>
                {/* <ThemePanel /> */}
            </Theme>
        </>
    )
}
