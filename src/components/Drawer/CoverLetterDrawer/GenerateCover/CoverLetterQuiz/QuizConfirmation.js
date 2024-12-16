import { Box, Divider, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import React from 'react';


import { MdCheckCircle, MdWarning } from "react-icons/md";
import EditDataPopover from './EditDataPopover';

const QuizConfirmation = ({ hiringObj, personDetails }) => {
    const [disabled, setDisabled] = React.useState(true);

    const { jobTitle, company, hiringManager } = hiringObj;
    const { firstName, lastName, skills } = personDetails;

    React.useEffect(() => {
        if ((firstName !== '' || lastName !== '') && (skills && skills.length > 0)) {
            setDisabled(false)
        }
    }, [firstName, lastName, skills])
    return (
        <VStack bg='' align={'flex-start'} w='full'>
            <Box bg='' w='full'>
                {
                    !disabled
                        ? <Text fontSize={'lg'} textAlign={'center'}>Please confirm the provided data.</Text>
                        : <Text fontSize={'lg'} textAlign={'center'}>Please fix the <span style={{ color: 'red' }}>red</span> marked items before proceed.</Text>
                }
            </Box>
            <Box bg='' my={1}>
                <List>
                    <ListItem>
                        <ListIcon
                            as={(firstName || lastName) ? MdCheckCircle : MdWarning}
                            color={(firstName || lastName) ? 'green.500' : 'red.500'}
                        />
                        Your Name: <span className='italic'>{(firstName !== '' || lastName !== '') ? `${firstName} ${lastName}` : `not provided`}</span>
                        <EditDataPopover type={'personName'} firstName={firstName} lastName={lastName} />
                    </ListItem>
                    <ListItem display={'flex'} flexDirection={'row'}>
                        <ListIcon
                            as={skills.length > 0 ? MdCheckCircle : MdWarning}
                            color={skills.length > 0 ? 'green.500' : 'red.500'}
                        />

                        <Box display={'flex'} flexDirection={'row'} pt={0} mt={'-5px'}>

                            <Box minW="80px" mr={1}>Your Skills:</Box>

                            <Text className='italic'>
                                {
                                    skills.length > 0
                                        ? skills.map((item) => item.label
                                        ).join(', ')
                                        : 'not provided'
                                }
                            </Text>

                            <Box mt={'-6px'}><EditDataPopover type={'skills'} /></Box>

                        </Box>
                    </ListItem>
                </List>
            </Box>
            <Box bg='' my={1} py={1} w='full'>
                <Divider />
            </Box>
            <Box bg='' my={1} mb={6}>
                <List spacing={2} >
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Job Title: <span className='italic'>{jobTitle}</span>
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Company: <span className='italic'>{company}</span>
                    </ListItem>
                    <ListItem>
                        <ListIcon as={hiringManager ? MdCheckCircle : MdWarning} color={hiringManager ? 'green.500' : 'yellow.500'} />
                        Hiring Manager (optional): <span className='italic'>{hiringManager ? hiringManager : 'not provided'}</span>
                    </ListItem>
                </List>
            </Box >
        </VStack>

    );
};

export default QuizConfirmation;