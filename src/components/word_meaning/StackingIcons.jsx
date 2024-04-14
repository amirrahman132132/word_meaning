import { CopyIcon, DropdownMenuIcon, FileIcon, Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Box, DropdownMenu, Flex, IconButton, Separator, Tooltip } from "@radix-ui/themes"

export default function StackingIcons() {
    return (
        <>
            <Box>
                <Flex gap={"1"}>
                    <IconButton variant="solid" size={"3"}>
                        <PlusIcon />
                    </IconButton>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <IconButton color="gray" variant="outline" size={"3"}>
                                <DropdownMenuIcon />
                            </IconButton>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content className="left-0 shadow-3">
                            <Flex direction={"column"} className="border-gray-4 rounded-1" align={"center"} gap={"3"}>
                                <Tooltip side="right" content="Add Item">
                                    <IconButton color="gray" className="text-gray-12" variant="ghost" size={"2"}>
                                        <PlusIcon className="" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip side="right" content="Copy">
                                    <IconButton color="gray" className="text-gray-12" variant="ghost" size={"2"}>
                                        <CopyIcon className="" />
                                    </IconButton>
                                </Tooltip>
                                <Separator orientation={"horizontal"} />
                                <Tooltip side="right" content="Edit">
                                    <IconButton color="gray" className="text-gray-12" variant="ghost" size={"2"}>
                                        <Pencil1Icon className="" />
                                    </IconButton>
                                </Tooltip>
                                <Separator orientation={"horizontal"} />
                                <Tooltip side="right" content="Remove">
                                    <IconButton color="tomato" className="" variant="ghost" size={"2"}>
                                        <TrashIcon className="" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip side="right" content="Save">
                                    <IconButton color="blue" className="" variant="ghost" size={"2"}>
                                        <FileIcon className="" />
                                    </IconButton>
                                </Tooltip>
                            </Flex>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Box>
        </>
    )
}
