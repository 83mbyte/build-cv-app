
import { useRef, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import HeaderContainer from './editorHeader/HeaderContainer';
import WhiteSheetContainer from './whiteSheet/WhiteSheetContainer';
import ModalWindowBot from '../modalWindow/ModalWindowBot';
import FallbackSpinner from './FallbackSpinner';

const SummaryAI = lazy(() => import('./resumeBlocks/aiBot/SummaryAI'));
const SkillsAI = lazy(() => import('./resumeBlocks/aiBot/SkillsAI'));
const ExperienceAI = lazy(() => import('./resumeBlocks/aiBot/ExperienceAI'));

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
        case 'resumeExperience':
            selectedBot = <Suspense fallback={<FallbackSpinner />}><ExperienceAI /></Suspense>
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



export default EditorMainContainer;
