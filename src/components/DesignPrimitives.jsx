import { Box, Button, Flex, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes"
import { useContext } from "react"
import { ContextSystem } from "./Provider"
import DESIGN_TOKENS from "../scripts/design_tokens"

export function Section1(props) {
    return (
        <Flex {...props} className={props.className} direction={"column"} gap={DESIGN_TOKENS.gap1}>
            {props.children}
        </Flex>
    )
}

export function Section2(props) {
    return (
        <Flex {...props} className={props.className} direction={"column"} gap={DESIGN_TOKENS.gap2}>
            {props.children}
        </Flex>
    )
}

export function Section3(props) {
    return (
        <Flex {...props} className={props.className} direction={"column"} gap={DESIGN_TOKENS.gap3}>
            {props.children}
        </Flex>
    )
}

export function Head1(props){
    return (
        <Heading {...props} size={DESIGN_TOKENS.text1}>{props.children}</Heading>
    )
}

export function Head2(props){
    return (
        <Heading {...props} weight={'medium'} size={DESIGN_TOKENS.text2}>{props.children}</Heading>
    )
}

export function Head3(props){
    return (
        <Heading {...props} weight={'medium'} size={DESIGN_TOKENS.text3}>{props.children}</Heading>
    )
}

export function Text1(props){
    return (
        <Text {...props} size={DESIGN_TOKENS.text1}>{props.children}</Text>
    )
}

export function Text2(props){
    return (
        <Text {...props} size={DESIGN_TOKENS.text2}>{props.children}</Text>
    )
}

export function Text3(props){
    return (
        <Text {...props} size={DESIGN_TOKENS.text3}>{props.children}</Text>
    )
}

export function Group1H(props){
    return (
        <Flex {...props} className={props.className} gap={DESIGN_TOKENS.gap1}>
            {props.children}
        </Flex>
    )
}

export function Group2H(props){
    return (
        <Flex {...props} className={props.className} gap={DESIGN_TOKENS.gap2}>
            {props.children}
        </Flex>
    )
}

export function Group3H(props){
    return (
        <Flex {...props} className={props.className} gap={DESIGN_TOKENS.gap3}>
            {props.children}
        </Flex>
    )
}
export function Group1V(props){
    return (
        <Flex {...props} direction={'column'} className={props.className} gap={DESIGN_TOKENS.gap1}>
            {props.children}
        </Flex>
    )
}

export function Group2V(props){
    return (
        <Flex {...props} direction={'column'} className={props.className} gap={DESIGN_TOKENS.gap2}>
            {props.children}
        </Flex>
    )
}

export function Group3V(props){
    return (
        <Flex {...props} direction={'column'} className={props.className} gap={DESIGN_TOKENS.gap3}>
            {props.children}
        </Flex>
    )
}
