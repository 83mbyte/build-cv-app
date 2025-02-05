
import { useRef } from 'react';
import HeaderContainer from './editorHeader/HeaderContainer';
import WhiteSheetContainer from './whiteSheet/WhiteSheetContainer';

const EditorMainContainer = () => {
    const resumeAreaRef = useRef(null);


    return (
        <>
            <HeaderContainer />
            <WhiteSheetContainer ref={resumeAreaRef} />
        </>
    );
};

export default EditorMainContainer;