import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from "@/components/ui/popover";
import { HStack, Button, Icon, VStack, Box } from "@chakra-ui/react";

import { setIsHeaderMenuOpen, setShowOverlay, setThemeColor } from "@/redux/settings/editorSettingsSlice";
import { useDispatch, useSelector } from "react-redux";

import { LuChevronDown, LuPalette, LuCheck } from "react-icons/lu";
import { themeColorsArray } from "@/lib/defaults";

const HeaderThemeMenu = () => {

    const dispatch = useDispatch();
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const isMenuOpen = useSelector(state => state.editorSettings.isHeaderMenuOpen.themeMenu);

    const changeThemeColor = (colorName) => {
        if (colorName) {
            dispatch(setThemeColor(colorName));
        }
    };

    return (
        <PopoverRoot onOpenChange={(e) => {
            dispatch(setShowOverlay(e.open));
            dispatch(setIsHeaderMenuOpen({ menu: 'themeMenu', value: e.open }))
        }}>
            <PopoverTrigger asChild>
                <Button variant={'link'} colorPalette={'white'} size={'xs'}
                    _hover={{ opacity: 0.5 }}
                >
                    <HStack gap={['1', '2']}>
                        <Icon><LuPalette /></Icon>
                        Theme
                        <Icon><LuChevronDown style={{ transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease' }} /></Icon>
                    </HStack>
                </Button>
            </PopoverTrigger>
            <PopoverContent color='black' minWidth={['35px', '65px']} w='auto' borderRadius={'lg'}  >
                <PopoverArrow />
                <PopoverBody bg='' padding={['3', '4']} margin={'0'}>
                    <VStack gap='2'>
                        {
                            themeColorsArray.map((item, index) => {
                                return (
                                    <Box
                                        key={`theme_${index}`}
                                        boxSize={['25px', '30px']}
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        backgroundColor={item !== 'black' ? `${item}.400` : 'black'}
                                        cursor={'pointer'}
                                        _hover={{
                                            borderWidth: `1px`,
                                            borderStyle: 'solid',
                                            borderColor: `white`
                                        }}
                                        onClick={() => changeThemeColor(item)}>
                                        {
                                            themeColor == item && <Icon color='white'><LuCheck /></Icon>
                                        }
                                    </Box>
                                )
                            })
                        }
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot >
    )
}

export default HeaderThemeMenu;