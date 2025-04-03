import { AbsoluteCenter, Box, ProgressCircle, Stack, StackSeparator, Text } from '@chakra-ui/react';

const DetailsChart = ({ details }) => {

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
            title: 'Positive',
            color: 'green',
            value: positivePercentage
        },
        {
            title: 'Negative',
            color: 'red',
            value: negativePercentage
        }
    ]

    return (

        <Stack justifyContent={'space-around'} bg='' direction={['column', 'row']} py={1} gap={[2, 1]} w={'50%'} mx={'auto'} separator={<StackSeparator />}>
            {
                dataToRender.map((item, index) => {

                    return (
                        <Box display={'flex'} alignItems={'center'} bg='' flexDirection={'column'} my={1} px={2} key={index} gap={2}>
                            <Text fontSize={'xs'} color={'gray.500'}>{item.title}</Text>
                            <ProgressCircle.Root value={Number(item.value)} size={'xl'} colorPalette={item.color} transition={'ease-in'}>
                                <ProgressCircle.Circle >
                                    <ProgressCircle.Track colorPalette={'gray'} />
                                    <ProgressCircle.Range strokeLinecap="round" />
                                </ProgressCircle.Circle>
                                <AbsoluteCenter>
                                    <ProgressCircle.ValueText color={item.color} fontSize={'xs'} />
                                </AbsoluteCenter>
                            </ProgressCircle.Root>
                        </Box>
                    )
                })
            }
        </Stack>
    )
};

export default DetailsChart;