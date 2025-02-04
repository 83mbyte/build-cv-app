'use client'
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot } from "@/components/ui/popover";

import { Box, Button, HStack, Text, PopoverTrigger, Icon, } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { setIsHeaderMenuOpen, setLayout, setShowOverlay } from "@/redux/settings/editorSettingsSlice";

import { LuChevronDown, LuTableCellsSplit } from "react-icons/lu";


const layouts = ['1', '2', '3']
const HeaderLayoutMenu = () => {

    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const layout = useSelector(state => state.editorSettings.layout);
    const isMenuOpen = useSelector(state => state.editorSettings.isHeaderMenuOpen.layoutMenu);
    const dispatch = useDispatch();

    const changeLayout = (layoutIndex) => {
        dispatch(setLayout(layoutIndex));
    }

    return (
        <PopoverRoot onOpenChange={(e) => {
            dispatch(setShowOverlay(e.open));
            dispatch(setIsHeaderMenuOpen({ menu: 'layoutMenu', value: e.open }))

        }}
        >
            <PopoverTrigger asChild>
                <Button
                    variant={'link'} colorPalette={'white'} size={'xs'}
                    _hover={{ opacity: 0.5 }}
                >
                    <HStack gap={['1', '2']} >
                        <Icon><LuTableCellsSplit /></Icon>
                        Layout
                        <Icon><LuChevronDown style={{ transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease' }} /></Icon>
                    </HStack>
                </Button>

            </PopoverTrigger>
            <PopoverContent width='2xs'>
                <PopoverArrow />
                <PopoverBody>
                    <Text fontSize={'xs'}>Variant:</Text>
                    <Box borderWidth={1} borderColor={`${themeColor}.300`} marginY={'1'} borderRadius={'sm'} overflow={'hidden'} >
                        <HStack _hover={{ cursor: 'pointer' }} gap={0} w='full'>
                            {
                                layouts.map((item, index) => {
                                    return (
                                        <Box flex={1}
                                            key={index}
                                            transition={'background-color 0.7s ease-in-out'}
                                            backgroundColor={layout == index ? `${themeColor}.300` : 'transparent'}

                                            onClick={() => changeLayout(index)}
                                        >
                                            <Text textAlign={'center'} fontSize={['xs', 'sm']} fontWeight={'bold'}
                                                color={layout == index ? 'white' : `${themeColor}.300`}
                                                _hover={{ opacity: layout != index ? 0.5 : 1 }}
                                                transition={'opacity 0.5s ease'}

                                            >{item}</Text>
                                        </Box>
                                    )
                                })
                            }
                        </HStack>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    )
};

export default HeaderLayoutMenu;