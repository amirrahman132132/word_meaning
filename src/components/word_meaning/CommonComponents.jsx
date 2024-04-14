export function UnitField(props) {
    return (
        <Flex className="w-full items-center" gap={DESIGN_TOKENS.gap3}>
            <Box className="w-full">
                <TextField.Root className="" size={"2"} type="number" defaultValue={"00"} radius="large" />
            </Box>
            <Box className="w-full">
                <Select.Root className="w-full " size={"1"} radius="large" defaultValue="pixel">
                    <Select.Trigger className="text-xs w-full" size={"2"} radius="large" />
                    <Select.Content className="text-xs" side="left">
                        <Select.Group>
                            <Select.Item value="pixel">Pixel</Select.Item>
                            <Select.Item value="rems">Rems</Select.Item>
                            <Select.Item value="%">%</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </Box>
        </Flex>
    )
}