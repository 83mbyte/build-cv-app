
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover';
import { Button, Text, Box, HStack, Icon, createListCollection, VStack } from '@chakra-ui/react';

import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";

import { useDispatch, useSelector } from 'react-redux';
import { setIsHeaderMenuOpen, setShowOverlay, } from '@/redux/settings/editorSettingsSlice';
import { setFontSize, setCurrentFont } from '@/redux/fontSettings/fontSettingsSlice';

import { LuChevronDown, LuALargeSmall } from "react-icons/lu";
import { fontSizeNames } from '@/lib/defaults';



const frameworks = createListCollection({
    items: [
        { label: "Default", value: 'body' },
        { label: "Dancing Script", value: "dancing" },
        { label: "Jersey 15", value: "jersey" },
        { label: "Oswald", value: "oswald" },
    ],
})


const HeaderFontsMenu = () => {
    const dispatch = useDispatch();
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const isMenuOpen = useSelector(state => state.editorSettings.isHeaderMenuOpen.fontsMenu);
    const fontSize = useSelector(state => state.fontSettings.fontSize);

    const changeFontSize = (fontSize) => {
        if (fontSize) {
            dispatch(setFontSize(fontSize))
        }
    }

    const changeFont = (fontName) => {
        if (fontName) {
            dispatch(setCurrentFont(fontName))
        }
    }

    return (
        <PopoverRoot onOpenChange={(e) => {
            dispatch(setShowOverlay(e.open));
            dispatch(setIsHeaderMenuOpen({ menu: 'fontsMenu', value: e.open }))
        }}>
            <PopoverTrigger asChild>
                <Button
                    variant={'link'} colorPalette={'white'} size={'xs'}
                    _hover={{ opacity: 0.5 }}
                >
                    <HStack gap={['1', '2']} >
                        <Icon><LuALargeSmall /></Icon>
                        Fonts
                        <Icon  ><LuChevronDown style={{ transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease' }} /></Icon>
                    </HStack>

                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody >
                    <VStack gap={2}>
                        <Box w='full'>
                            <Text fontSize={'xs'}>Fonts:</Text>

                            <SelectRoot size={'xs'} collection={frameworks} positioning={{ sameWidth: true, placement: "bottom" }}
                                id='customSelect'
                                defaultValue={['body']}
                                onValueChange={(e) => {
                                    changeFont(e.value[0]);
                                }}
                            >
                                <SelectTrigger >
                                    <SelectValueText placeholder="Default" />
                                </SelectTrigger>
                                <SelectContent portalled={false} width="full"  >
                                    {frameworks.items.map((item) => (
                                        <SelectItem item={item} key={item.value} _hover={{ opacity: 0.5 }} cursor={'pointer'}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectRoot>
                        </Box>

                        {/* sizing fonts */}
                        <Box w='full'  >
                            <Text fontSize={'xs'}>Size:</Text>


                            <Box borderWidth={1} borderColor={`${themeColor}.300`} margin={1} borderRadius={'sm'} overflow={'hidden'}>

                                <HStack _hover={{ cursor: 'pointer' }} gap={0}>
                                    {
                                        fontSizeNames.map((item, index) => {

                                            return (
                                                <Box flex={1}
                                                    key={index}
                                                    transition={'background-color 0.7s ease-in-out'}
                                                    backgroundColor={fontSize.size == item ? `${themeColor}.300` : 'transparent'}
                                                    onClick={() => changeFontSize(item)}
                                                >
                                                    <Text textAlign={'center'} fontSize={'sm'} fontWeight={'bold'}
                                                        color={fontSize.size == item ? 'white' : `${themeColor}.300`}
                                                        _hover={{ opacity: fontSize != item ? 0.5 : 1 }}
                                                        transition={'opacity 0.5s ease'}
                                                    >{item}</Text>
                                                </Box>
                                            )
                                        })
                                    }
                                </HStack>

                            </Box>
                        </Box>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    );
};

export default HeaderFontsMenu;