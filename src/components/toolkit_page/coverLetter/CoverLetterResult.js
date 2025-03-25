import { Alert, Box, Button, useClipboard } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';

import CustomText from '@/components/editor_page/dataFields/CustomText';
import { setCoverLetterText } from '@/redux/coverLetter/coverLetterSlice';

import { LuCopy } from "react-icons/lu";
import { useRef } from 'react';
import { toolkitData } from '@/lib/content-lib';

const CoverLetterResult = ({ data }) => {
    const dispatch = useDispatch();
    const tempRef = useRef(null);
    const clipboard = useClipboard({ value: null });

    const onChangeHandler = (name, value) => {
        dispatch(setCoverLetterText({ value: value }));
    }

    const copyToClipboardHandler = () => {
        if (tempRef.current) {
            clipboard.setValue(tempRef.current.childNodes[0].childNodes[0].childNodes[0].innerText);
            clipboard.copy();
        }
    }

    return (
        <motion.div initial={{ opacity: 0, }} animate={{ opacity: 1, transition: { delay: 0.6 } }} style={{ width: '100%', padding: '0.75rem' }}>
            <Alert.Root mb={3} status={'info'} size="sm" alignItems={'center'}>
                <Alert.Indicator />
                <Alert.Title>
                    {toolkitData.tools.coverLetter.infoAlert ?? 'success lorem ipsum'}
                </Alert.Title>
            </Alert.Root>

            <Box p={1} borderRadius={'lg'}
                ref={tempRef}
                borderWidth={'0px'}
                outlineStyle={'solid'}
                outlineColor={`gray.200`}
                outlineWidth={'0px'}
                _hover={{ outlineWidth: '1px' }}
            >
                <CustomText size={['sm', 'md']} isEditable={true} allowEnter={true} variant={'p'} value={data} onChangeCallback={(name, value) => onChangeHandler('', value)} />

                <Box w='full' mt={4}>
                    <Button colorPalette={'teal'} w='full' size={['xs', 'sm']} onClick={copyToClipboardHandler}><LuCopy />{clipboard.copied ? toolkitData.tools.coverLetter.buttons.copyToClipboard[1] ?? 'Copy' : toolkitData.tools.coverLetter.buttons.copyToClipboard[0] ?? 'Copied'}</Button>
                </Box>
            </Box>

        </motion.div>
    )
}

export default CoverLetterResult;