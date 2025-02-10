'use client'
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch"
import { Box, Button, HStack, Text, PopoverTrigger, Icon, VStack, } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { setIsHeaderMenuOpen, setLayout, setShowOverlay } from "@/redux/settings/editorSettingsSlice";
import { setResumeSummaryIsVisible } from "@/redux/resume/summaryBlockSlice";
import { setResumeEducationIsVisible } from "@/redux/resume/educationBlockSlice";
import { setResumeExperienceIsVisible } from "@/redux/resume/experienceBlockSlice";
import { setResumeSkillsIsVisible } from "@/redux/resume/skillsBlockSlice";
import { setResumeLanguagesIsVisible } from "@/redux/resume/languagesBlockSlice";

import { LuChevronDown, LuTableCellsSplit } from "react-icons/lu";

const layouts = ['1', '2', '3']
const HeaderLayoutMenu = () => {

    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const layout = useSelector(state => state.editorSettings.layout);
    const isMenuOpen = useSelector(state => state.editorSettings.isHeaderMenuOpen.layoutMenu);

    // switch buttons status:
    const isSummaryChecked = useSelector(state => state.resumeSummary.isVisible);
    const isEducationChecked = useSelector(state => state.resumeEducation.isVisible);
    const isSkillsChecked = useSelector(state => state.resumeSkills.isVisible);
    const isLanguagesChecked = useSelector(state => state.resumeLanguages.isVisible);
    const isExperienceChecked = useSelector(state => state.resumeExperience.isVisible);
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
                    variant={'link'} colorPalette={'white'} size={['2xs', 'xs']}
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
                    <VStack width='full' bg='' gap={4}>
                        <Box w='full' >
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
                        </Box>
                        {/* show blocks */}
                        <Box w='full'>
                            <Text fontSize={'xs'}>Show:</Text>
                            <VStack w='full' alignItems={'flex-start'} gap={3} px={1}>
                                <SwitchBlock label={'Summary'} isChecked={isSummaryChecked} actionToDispatch={setResumeSummaryIsVisible} />
                                <SwitchBlock label={'Education'} isChecked={isEducationChecked} actionToDispatch={setResumeEducationIsVisible} />
                                <SwitchBlock label={'Experience'} isChecked={isExperienceChecked} actionToDispatch={setResumeExperienceIsVisible} />
                                <SwitchBlock label={'Skills'} isChecked={isSkillsChecked} actionToDispatch={setResumeSkillsIsVisible} />
                                <SwitchBlock label={'Languages'} isChecked={isLanguagesChecked} actionToDispatch={setResumeLanguagesIsVisible} />
                            </VStack>
                        </Box>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    )
};

export default HeaderLayoutMenu;

const SwitchBlock = ({ label, isChecked, actionToDispatch }) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const dispatch = useDispatch();
    return (
        <HStack bg='' justifyContent={'space-between'} w='full' alignItems={'center'}>

            <Text fontSize={'xs'}>{label}</Text>
            <Switch checked={isChecked}
                size={'sm'}
                colorPalette={themeColor}
                onCheckedChange={(e) => dispatch(actionToDispatch({ show: e.checked }))}
            />

        </HStack>
    )
}

