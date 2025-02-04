import { Box, Portal } from '@chakra-ui/react';

import { useSelector } from 'react-redux';

const MainBgContainer = ({ children }) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const showOverlay = useSelector(state => state.editorSettings.showOverlay);
    return (

        <>
            <Box minHeight={'100%'} backgroundColor={themeColor !== 'black' ? `${themeColor}.400` : 'gray.400'} overflow={'scroll'} width={'100%'} paddingBottom={'10px'} display={'block'} position={'absolute'} transition={'background-color 2s ease-in-out'} >

                {children}

            </Box>

            {/* overlay div */}
            <Portal>
                <Box
                    bgColor={'rgba(0,0,0,0.45)'}
                    height={'100vh'}
                    width={'100%'}
                    display={showOverlay ? 'block' : 'none'}
                    position={'fixed'}
                    top={0}
                    left={0}
                    zIndex={99}
                // transition={'background-color 1s ease'}
                >
                </Box>
            </Portal>


        </>
    );
};

export default MainBgContainer;