
import { useRef, lazy, Suspense, memo } from 'react';
import HeaderContainer from './editorHeader/HeaderContainer';
import WhiteSheetContainer from './whiteSheet/WhiteSheetContainer';
import ModalWindowBot from '../modalWindow/ModalWindowBot';
import { useSelector } from 'react-redux';
import { Spinner, Box, } from '@chakra-ui/react';

const SummaryAI = lazy(() => import('./resumeBlocks/aiBot/SummaryAI'));
const SkillsAI = lazy(() => import('./resumeBlocks/aiBot/SkillsAI'));
const ExperienceAI = lazy(() => import('./resumeBlocks/aiBot/ExperienceAI'));

const EditorMainContainer = () => {
    const resumeAreaRef = useRef(null);
    const modalBlockName = useSelector(state => state.editorSettings.showModal.blockName);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    let selectedBot;
    let modalTitle = 'Ai-powered assistant';

    switch (modalBlockName) {
        case 'resumeSummary':
            selectedBot = <Suspense fallback={<FallbackSpinner themeColor={themeColor} />}>
                <SummaryAI blockName={modalBlockName} />
            </Suspense>
            break;
        case 'resumeSkills':
            selectedBot = <Suspense fallback={<FallbackSpinner themeColor={themeColor} />}><SkillsAI /></Suspense>
            break;
        case 'resumeExperience':
            selectedBot = <Suspense fallback={<FallbackSpinner themeColor={themeColor} />}><ExperienceAI /></Suspense>
            break;

        default:
            break;
    }
    return (
        <>
            <HeaderContainer />
            <WhiteSheetContainer ref={resumeAreaRef} />

            {/* modal window of assistant */}
            <ModalWindowBot title={modalTitle} size='lg'>
                {selectedBot}
            </ModalWindowBot>

        </>

    );
};


const FallbackSpinner = ({ themeColor }) => {
    return (
        <Box w='full' h='150px' p={1} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems='center' colorPalette={themeColor}>
            <Spinner color='colorPalette.300' size={'lg'} />
        </Box>
    )
}

export default EditorMainContainer;