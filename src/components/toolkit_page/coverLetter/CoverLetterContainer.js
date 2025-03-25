'use client'

import { Box, Heading, StackSeparator, Text, VStack } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { motion } from 'motion/react';

import CoverLetterForm from './CoverLetterForm';
import CoverLetterResult from './CoverLetterResult';
import TagsContainer from '@/components/tags/TagsContainer';

const CoverLetterContainer = ({ pageHeading, pageText, placeholders }) => {

    const coverLetterText = useSelector(state => state.coverLetter.coverLetterText);

    return (

        <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <TagsContainer tags={['AI', 'Cover Letter']} color='gray' />
            <Box w='full' pb={'10'}>
                <Heading as='h1' size={['xl', '3xl']}>{pageHeading ?? 'Lorem ipsum'}</Heading>
                <Text fontSize={['sm', 'md']}>{pageText ?? 'Lorem ipsum lorem ipsum lorem ipsum'}</Text>
            </Box>
            <VStack border={'1px solid #dedede'}
                bg='white'
                w='full'
                padding={'3'}
                borderRadius={'lg'}
                gap={'2'}
                alignItems={'flex-start'}
                shadow={'xs'}
                separator={<StackSeparator />}
            >
                <CoverLetterForm placeholders={placeholders} isButtonDisabled={coverLetterText != null} />
                {
                    coverLetterText && <CoverLetterResult data={coverLetterText} />
                }
            </VStack>
        </motion.div>
    );
};

export default CoverLetterContainer;

