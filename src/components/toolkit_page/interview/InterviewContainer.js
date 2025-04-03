'use client'

import { Heading, Box, VStack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react'

import { useSelector } from 'react-redux';

import TagsContainer from '@/components/tags/TagsContainer';
import InterviewSettings from './InterviewSettings';
import InterviewProcess from './InterviewProcess';
import InterviewConclusion from './InterviewConclusion';
import { toolkitData } from '@/lib/content-lib';


const InterviewContainer = ({ pageHeading, pageText }) => {
    const currentStep = useSelector(state => state.interview.currentStep);

    return (

        <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <TagsContainer tags={toolkitData.tools.interview.tags ?? ['Job Interview']} color='gray' />
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
                maxH={'400px'}
                overflow={'hidden'}
            >

                <AnimatePresence mode='wait'>
                    {
                        currentStep == 0 &&
                        <MotionInterviewSettings initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }} stepDescription={toolkitData.tools.interview.steps[currentStep].description} />
                    }
                    {
                        currentStep == 1 &&
                        <MotionInterviewProcess initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }} stepDescription={toolkitData.tools.interview.steps[currentStep].description} />
                    }
                    {
                        currentStep == 2 &&
                        <MotionInterviewConclusion initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }} stepDescription={toolkitData.tools.interview.steps[currentStep].description} />
                    }
                </AnimatePresence>
            </VStack>
        </motion.div>

    );
};

export default InterviewContainer;

const MotionInterviewSettings = motion.create(InterviewSettings);
const MotionInterviewProcess = motion.create(InterviewProcess);
const MotionInterviewConclusion = motion.create(InterviewConclusion);