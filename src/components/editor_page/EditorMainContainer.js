
import { useRef, lazy, Suspense } from 'react';
import HeaderContainer from './editorHeader/HeaderContainer';
import WhiteSheetContainer from './whiteSheet/WhiteSheetContainer';
import ModalWindowBot from '../modalWindow/ModalWindowBot';
import { useSelector } from 'react-redux';
import { Spinner, Box } from '@chakra-ui/react';

const SummaryAI = lazy(() => import('./resumeBlocks/aiBot/SummaryAI'));
const SkillsAI = lazy(() => import('./resumeBlocks/aiBot/SkillsAI'));

const EditorMainContainer = () => {
    const resumeAreaRef = useRef(null);
    const modalBlockName = useSelector(state => state.editorSettings.showModal.blockName);


    let selectedBot;
    let modalTitle = 'Ai-powered assistant';

    switch (modalBlockName) {
        case 'resumeSummary':
            selectedBot = <Suspense fallback={<FallbackSpinner />}>
                <SummaryAI blockName={modalBlockName} />
            </Suspense>
            break;
        case 'resumeSkills':
            selectedBot = <Suspense fallback={<FallbackSpinner />}><SkillsAI /></Suspense>
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

const FallbackSpinner = () => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    return (
        <Box w='full' p={1} justifyContent={'center'} display={'flex'} h='150px'>
            <Spinner color={`${themeColor}.300`} size={'md'} />
        </Box>
    )
}

export default EditorMainContainer;