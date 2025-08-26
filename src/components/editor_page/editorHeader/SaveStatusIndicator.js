import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import { saveStatusIndicatorData } from '@/lib/content-lib';
import { LuCheck } from 'react-icons/lu';

const MotionBox = motion.create(Box);

const SaveStatusIndicator = () => {

    const { isSaving, hasUnsavedChanges, lastSaved, error } = useSelector(
        (state) => state.persistence
    );
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let timer;
        // Show "Saving..." status
        if (isSaving) {
            setVisible(true);
            setMessage(saveStatusIndicatorData.saving || 'Saving...');
            setIsError(false);
            clearTimeout(timer); // clear timers
            return;
        }

        //   show errors
        if (error) {
            setVisible(true);
            setMessage(saveStatusIndicatorData.error || 'Saving error');
            setIsError(true);
            // show the error on the screen for a while
            timer = setTimeout(() => {
                setVisible(false);
            }, 4000);
            return;
        }

        // Show 'Saved' in case there are no errors
        if (!hasUnsavedChanges && lastSaved) {
            setVisible(true);
            setMessage(saveStatusIndicatorData.saved || 'Saved');
            setIsError(false);
            // hide message on timerr
            timer = setTimeout(() => {
                setVisible(false);
            }, 2000);
            return;
        }

        // If there are unsaved changes, hide the indicator
        if (hasUnsavedChanges) {
            setVisible(false);
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [isSaving, hasUnsavedChanges, lastSaved, error]);

    return (
        <AnimatePresence>
            {visible && (
                <MotionBox
                    key={'container'}
                    layout='size'
                    position="fixed"
                    top={{ base: '60px', sm: '70px', md: '20px' }}
                    left="50%"
                    transform="translateX(-50%)"
                    bg="rgba(0, 0, 0, 0.64)"
                    color={isError ? 'red.300' : 'gray.300'}
                    px="3"
                    py="1"
                    borderRadius="md"
                    zIndex="112"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >

                    <HStack >
                        {(!hasUnsavedChanges && lastSaved) && <Icon color='green'><LuCheck /></Icon>}
                        <Text fontSize={['2xs', 'xs']}>{message}</Text>
                    </HStack>
                </MotionBox>
            )}
        </AnimatePresence>
    );
};

export default SaveStatusIndicator;