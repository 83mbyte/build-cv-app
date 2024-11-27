import { Suspense, lazy } from 'react';

import { Box, CircularProgress, CircularProgressLabel, HStack, Heading, List, ListItem, Spinner, Text, } from '@chakra-ui/react';

import { useSelector } from 'react-redux';



import SectionDescription from '@/components/Dashboard/MainArea/SectionDescription';
import AnimationWrapper from '@/components/Animation/AnimationWrapper';

const ScoresChart = lazy(() => import('./ScoresChart'))

const InterviewConclusion = () => {
    const conclusion = useSelector(state => state.interview.data.conclusion);

    return (

        <AnimationWrapper variant='scaleCard' width='100%' height={'100%'}>
            <Box bg='' height={'100%'} display={'flex'} flexDirection={'column'} p={[2, 5]} w='100%'>
                <Heading as='h3' size={['sm', 'md', 'md']} pb={2}>Conclusion</Heading>
                <SectionDescription value={`The following conclusion was generated based on the provided answers.`} />

                <Box overflowY={'scroll'} height={'100%'}>
                    {
                        !conclusion
                            ? <LoadingSpinner />
                            : <List styleType={'none'} spacing={[3, 5]}>
                                <ListItem >
                                    <Text px={1}>{conclusion?.greetings || 'missed data'}</Text>
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={['sm', 'md']} textAlign={'center'} >Statistics:</Heading>
                                    {
                                        conclusion?.statistics &&
                                        <CircularStats statistics={conclusion.statistics} />
                                    }
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={'sm'} textAlign={'center'} >Analysis:</Heading>
                                    <Text px={1}>{conclusion?.analysis || 'missed data'}</Text>
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={'sm'} textAlign={'center'} >Conclusion:</Heading>
                                    <Text px={1}>{conclusion?.conclusion || 'missed data'}</Text>
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={'sm'} textAlign={'center'} >Recommendations:</Heading>
                                    <Text px={1}>{conclusion?.recommendations || 'missed data'}</Text>
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={'sm'} textAlign={'center'} >User scores for each question:</Heading>
                                    <Suspense fallback={<LoadingSpinner />}>
                                        <ScoresChart details={conclusion?.details || null} />
                                    </Suspense>

                                </ListItem>
                            </List>
                    }
                </Box>
            </Box>
        </AnimationWrapper>

    );
};

export default InterviewConclusion;

const LoadingSpinner = () => {
    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Spinner color='teal' size='xl' />
        </Box>
    )
}


const CircularStats = ({ statistics }) => {
    if (!statistics) {
        return null
    }
    return (
        <HStack justifyContent={'space-around'}>
            <Box display={'flex'} w='full' alignItems={'center'} bg='' flexDirection={'column'}>
                <Text fontSize={['sm', 'xs']}>Acceptable answers</Text>
                <CircularProgress value={statistics.correct} color='green.400' size={'90px'}>
                    <CircularProgressLabel>{statistics.correct}%</CircularProgressLabel>
                </CircularProgress>
            </Box>
            <Box display={'flex'} w='full' alignItems={'center'} bg='' flexDirection={'column'}>
                <Text fontSize={['sm', 'xs']}>Unacceptable answers</Text>
                <CircularProgress value={statistics.incorrect} color='red.500' size={'90px'}>
                    <CircularProgressLabel>{statistics.incorrect}%</CircularProgressLabel>
                </CircularProgress>
            </Box>
        </HStack>
    )
}


