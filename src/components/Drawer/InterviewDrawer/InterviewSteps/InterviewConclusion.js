
import { Box, Heading, List, ListItem, Spinner, Text, } from '@chakra-ui/react';

import { useSelector } from 'react-redux';

import SectionDescription from '@/components/Dashboard/MainArea/SectionDescription';
import AnimationWrapper from '@/components/Animation/AnimationWrapper';

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
                                    <Text px={1}>{conclusion.greetings}</Text>
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={'sm'} textAlign={'center'} >Analysis:</Heading>
                                    <Text px={1}>{conclusion.analysis}</Text>
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={'sm'} textAlign={'center'} >Conclusion:</Heading>
                                    <Text px={1}>{conclusion.conclusion}</Text>
                                </ListItem>
                                <ListItem>
                                    <Heading as={'h2'} size={'sm'} textAlign={'center'} >Recommendations:</Heading>
                                    <Text px={1}>{conclusion.recommendations}</Text>
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