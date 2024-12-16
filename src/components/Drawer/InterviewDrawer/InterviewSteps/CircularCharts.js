import { Box, CircularProgress, CircularProgressLabel, Stack, Text } from '@chakra-ui/react';

const CircularCharts = ({ details }) => {

    if (!details) {
        return null
    }

    const totalQuestions = Object.keys(details).length;
    let negativeAnswersCount = 0;
    for (let elem of Object.values(details)) {

        if (elem == -1) {
            negativeAnswersCount++;
        }
    }

    const positivePercentage = ((100 / totalQuestions) * (totalQuestions - negativeAnswersCount)).toFixed(0);
    const negativePercentage = 100 - positivePercentage;

    const dataToRender = [
        {
            title: 'Acceptable answers',
            color: 'green.400',
            value: positivePercentage
        },
        {
            title: 'Incorrect answers',
            color: 'red.500',
            value: negativePercentage
        }
    ]

    return (

        <Stack justifyContent={'space-around'} bg='' direction={['column', 'row']} py={1} spacing={1}>
            {
                dataToRender.map((item, index) => {
                    return (
                        <Box display={'flex'} alignItems={'center'} bg='' flexDirection={'column'} px={2} key={index}>
                            <Text fontSize={'xs'} py={2} color={'gray.500'}>{item.title}</Text>
                            <CircularProgress value={item.value} color={item.color} size={['65px', '90px']}>
                                <CircularProgressLabel>{item.value}%</CircularProgressLabel>
                            </CircularProgress>
                        </Box>
                    )
                })
            }
        </Stack>
    )
};

export default CircularCharts;