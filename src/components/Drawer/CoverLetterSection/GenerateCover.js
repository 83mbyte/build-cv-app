import {
    Box, Button, Card, CardBody, CardFooter, Center, List, ListItem, ListIcon, ScaleFade, Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    Stepper,
    Text,
    VStack,
    useSteps,
    Divider,

} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SectionWrapper from '../../Wrappers/SectionWrapper';


import { MdOutlineArrowBack, MdOutlineArrowForward, MdCheckCircle, MdWarning } from "react-icons/md";
import InputCustom from '../../FormElements/InputCustom';
import SectionDescription from '../../Sections/SectionDescription';
import { useDispatch, useSelector } from 'react-redux';
import { inputQuizUpdate } from '../../../redux/features/coverLetter/coverLetterSlice';
import EditDataPopover from './EditDataPopover';



const GenerateCover = () => {

    const steps = [
        { title: 'Step #1', description: 'A job title' },
        { title: 'Step #2', description: 'A company name' },
        { title: 'Step #3', description: 'A hiring person name' },
        { title: 'Final', description: 'Your result' },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const dispatch = useDispatch();
    const jobTitle = useSelector(state => state.cover.data.jobTitle);
    const company = useSelector(state => state.cover.data.company);
    const hiringManager = useSelector(state => state.cover.data.hiringManager);

    const firstName = useSelector(state => state.personDetails.data.firstName);
    const lastName = useSelector(state => state.personDetails.data.lastName);
    const skills = useSelector(state => state.skills.data);


    const onButtonClick = (direction) => {
        switch (direction.toLowerCase()) {
            case 'next':
                if (activeStep < steps.length) {
                    setActiveStep(activeStep + 1)
                }

                break;
            case 'back':
                if (activeStep > 0) {
                    setActiveStep(activeStep - 1)
                }
                break;
            case 'confirm': {
                setActiveStep(activeStep + 1);
                break;
            }
            default:
                break;
        }
    }

    const onChangehandler = (name, value) => {
        dispatch(inputQuizUpdate({ name, value }))
    }

    return (
        <>
            {activeStep < 4 &&
                <SectionWrapper>
                    <Stepper index={activeStep} width={'100%'} size='md' colorScheme='teal'>
                        {steps.map((step, index) => (
                            <Step key={index} >
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box  >
                                    {/* <StepTitle>{step.title}</StepTitle> */}
                                    {/* <StepDescription >{step.description}</StepDescription> */}
                                </Box>
                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                </SectionWrapper>
            }
            <SectionWrapper flexDirect='column'>
                <Box bg='transparent' p={2} >

                    {
                        activeStep === 0 &&
                        <QuizStepItem
                            onButtonClick={onButtonClick}
                            title={'Job Title'}
                            hint={`Add a title like ‘Senior Developer', 'Sales Manager' or 'Crime Reporter', etc.`}
                            // hint={`Add a title like ‘Senior Developer' or 'Crime Reporter' that quickly describes the type of role you're applying to.`}
                            activeStep={activeStep}
                            inputValue={jobTitle}
                            inputName={'jobTitle'}
                            onChangehandler={onChangehandler}
                        />
                    }

                    {
                        activeStep === 1 &&
                        <QuizStepItem
                            onButtonClick={onButtonClick}
                            title={'Company Name'}
                            hint={`Provide the company's name. `}
                            activeStep={activeStep}
                            inputValue={company}
                            inputName={'company'}
                            onChangehandler={onChangehandler}
                        />
                    }

                    {
                        activeStep === 2 && <QuizStepItem onButtonClick={onButtonClick} title={'Hiring Manager Name'} hint={`Provide the manager name, or leave it blank.`} activeStep={activeStep} inputValue={hiringManager} inputName={'hiringManager'} onChangehandler={onChangehandler} />
                    }
                    {
                        activeStep === 3 && <QuizConfirmation hiringObj={{ jobTitle, company, hiringManager }} personDetails={{ firstName, lastName, skills }} onButtonClick={onButtonClick} />
                    }
                    {
                        activeStep === 4 && <QuizFinal onButtonClick={onButtonClick} />

                    }


                </Box >
            </SectionWrapper >
        </>
    );
};

export default GenerateCover;

const CardContainer = (
    {
        bgColor,
        buttons = [
            { title: 'Back', variant: 'outline', icon: { position: 'left', component: <MdOutlineArrowBack /> } }
        ],
        onButtonClick,
        activeStep,
        inputValue = null,
        children
    }
) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (!isOpen) {
            setIsOpen(true);
        }
        return () => {
            if (isOpen === true) {
                setIsOpen(false);
            }
        }

    }, [isOpen]);
    return (
        <ScaleFade initialScale={0.5} in={isOpen} delay={0.2}>
            <Card variant={'filled'} bg={bgColor} minH={'230px'}>
                <CardBody>
                    {children}
                </CardBody>

                <CardFooter>
                    <Center bg='transparent' w={'full'}>
                        {
                            buttons.map((item, index) => {
                                let content;

                                if (!item.icon) {
                                    content =
                                        <Box mx={3} key={index}>
                                            <Button
                                                colorScheme='teal'
                                                variant={item.variant ? item.variant : 'solid'}
                                                onClick={() => onButtonClick(item.title)}
                                                isDisabled={item?.isDisabled}
                                            >
                                                {item.title}
                                            </Button>
                                        </Box>
                                } else {
                                    if (item.icon.position === 'left') {
                                        if (item.title === 'Back' && activeStep === 0) {
                                            content = null;
                                        } else {
                                            content =
                                                <Box mx={3} key={index}>
                                                    <Button
                                                        colorScheme='teal'
                                                        variant={item.variant ? item.variant : 'solid'}
                                                        leftIcon={item.icon.component}
                                                        onClick={() => onButtonClick(item.title)}

                                                    >
                                                        {item.title}
                                                    </Button>
                                                </Box>
                                        }
                                    }

                                    if (item.icon.position === 'right') {
                                        content = <Box mx={3} key={index}>
                                            <Button
                                                colorScheme='teal'
                                                variant={item.variant ? item.variant : 'solid'}
                                                rightIcon={item.icon.component}
                                                onClick={() => onButtonClick(item.title)}
                                                isDisabled={item.title === 'Next' && inputValue.trim() === '' && (activeStep === 0 || activeStep === 1)}
                                            >
                                                {item.title}
                                            </Button>
                                        </Box>
                                    }
                                }
                                return content
                            })
                        }
                    </Center>
                </CardFooter>
            </Card>
        </ScaleFade>
    )
}

const QuizStepItem = ({ title, hint = null, inputName, inputValue, activeStep, onButtonClick, onChangehandler }) => {
    const buttons = [
        { title: 'Back', variant: 'outline', icon: { position: 'left', component: <MdOutlineArrowBack /> } },
        { title: 'Next', variant: 'solid', icon: { position: 'right', component: <MdOutlineArrowForward /> } }
    ]
    return (
        <CardContainer buttons={buttons} bgColor={'gray.50'} onButtonClick={onButtonClick} activeStep={activeStep} inputValue={inputValue}  >
            <VStack>
                <Text fontSize={'lg'}>{title}</Text>
                {hint && <SectionDescription value={hint} />}
                <Box bg='transparent' w='full'>
                    <InputCustom name={inputName} inputValue={inputValue} onChangeCallback={(name, value) => onChangehandler(name, value)} />
                </Box>
            </VStack>
        </CardContainer>
    )

}




const QuizConfirmation = ({ hiringObj, personDetails, onButtonClick }) => {
    const [disabled, setDisabled] = React.useState(true);
    const buttons = [
        { title: 'Back', variant: 'outline', icon: { position: 'left', component: <MdOutlineArrowBack /> } },
        { title: 'Confirm', variant: 'solid', isDisabled: disabled }
    ]
    const { jobTitle, company, hiringManager } = hiringObj;
    const { firstName, lastName, skills } = personDetails;

    useEffect(() => {
        if ((firstName !== '' || lastName !== '') && (skills && skills.length > 0)) {
            setDisabled(false)
        }
    }, [firstName, lastName, skills])

    return (
        <CardContainer buttons={buttons} bgColor={'gray.50'} onButtonClick={onButtonClick}>
            <VStack bg='' align={'flex-start'}>

                <Box bg='' w='full'>
                    {
                        !disabled
                            ? <Text fontSize={'lg'} textAlign={'center'}>Please confirm the provided data.</Text>
                            : <Text fontSize={'lg'} textAlign={'center'}>Please fix the <span style={{ color: 'red' }}>red</span> sign marked issues before proceed.</Text>
                    }
                </Box>
                <Box bg='' my={1}>
                    <List >
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

                                <Box minW="80px">Your Skills:</Box>

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
                <Box bg='' my={1}>
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
                </Box>

            </VStack>

        </CardContainer >
    )

}


const QuizFinal = ({ onButtonClick }) => {

    return (
        <CardContainer buttons={[{ title: 'Back', variant: 'outline', icon: { position: 'left', component: <MdOutlineArrowBack /> } }]} bgColor={'green.50'} onButtonClick={onButtonClick}>

            <VStack>
                <Text>Success!</Text>
                <Text>Still under constr..</Text>
            </VStack>
        </CardContainer>
    )
}





