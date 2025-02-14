
import { AbsoluteCenter, Box, VStack, IconButton, Portal, Container, Icon } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'motion/react';

import { useDispatch, useSelector } from 'react-redux';
import { setShowModal } from '@/redux/settings/editorSettingsSlice';

import { LuX, } from "react-icons/lu";
import { BsRobot } from "react-icons/bs";
import { useEffect } from 'react';

const ModalWindowBot = ({ size = 'lg', title = 'Modal Title', children }) => {
    const showModal = useSelector(state => state.editorSettings.showModal.show);
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const dispatch = useDispatch();

    useEffect(() => {
        if (showModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = '';
        }
    }, [showModal])

    return (
        <AnimatePresence mode='wait'>
            {
                showModal &&
                <Portal>
                    <Box position={'fixed'} bgColor={'rgba(0,0,0,0.3)'} w='100%' h='100vh' zIndex={10} overflowY={'hidden'} top={0} left={0}>
                        <AbsoluteCenter w='full' px={1}>
                            <Container width={['full', size]} padding={0} mx={1}>
                                <motion.div
                                    key={'modal'}
                                    initial={{ opacity: 0, scale: 0.75 }}
                                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                    style={{ width: '100%', padding: 0, margin: 0 }}
                                >
                                    <Box bg='white' width='full' margin={0} padding={2} rounded={'lg'} boxShadow={'md'}>
                                        <Box bg='' display={'flex'} w='full' alignItems={'center'} justifyContent={'flex-end'} p={0} m={0}>
                                            <IconButton
                                                aria-label="Hide"
                                                variant={'plain'}
                                                bgColor={`white`}
                                                border={'0px solid black'}
                                                _hover={{ backgroundColor: `${themeColor}.50` }}
                                                size={'2xs'}
                                                rounded={'md'}
                                                p={0}
                                                onClick={() => dispatch(setShowModal({ show: false }))}
                                            >
                                                <LuX />
                                            </IconButton>
                                        </Box>
                                        <VStack gap={3}>
                                            {/* modal header */}

                                            <Box bg='' display={'flex'} w='full' alignItems={'center'} justifyContent={'center'} fontSize={'lg'} fontWeight={'semibold'} >{title}</Box>
                                            <Box bg='' display={'flex'} w='full' alignItems={'center'} justifyContent={'center'} fontSize={'lg'} fontWeight={'semibold'} >
                                                <Icon color={`${themeColor}.400`} fontSize={['3xl', '6xl']}  >
                                                    <BsRobot />
                                                </Icon>
                                            </Box>

                                            {/* modal body */}
                                            <Box bg='' w='full' padding={3}>
                                                {children}
                                            </Box>
                                        </VStack>
                                    </Box>
                                </motion.div>
                            </Container>
                        </AbsoluteCenter>
                    </Box>
                </Portal >
            }
        </AnimatePresence >
    );
};

export default ModalWindowBot;