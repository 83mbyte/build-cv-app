import { Box, Card, CardBody, ScaleFade, } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';


import { useDispatch } from 'react-redux';
import { inputQuizUpdate } from '@/redux/features/coverLetter/coverLetterSlice';

import QuizQuestion from './QuizQuestion';
import QuizConfirmation from './QuizConfirmation';
import QuizFinal from './QuizFinal';
import QuizNavygation from './QuizNavigation';

const QuizCardContainer = (
    {
        variant = 'quiz',
        bgColor,
        activeStep,
        inputValue = null,
        title,
        hint = null,
        inputName,
        onButtonClick,
        hiringObj = null,
        personDetails = null,
        coverText = null,
        isBtnLoading = false
    }
) => {
    let quizCardContent;

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const onChangeHandler = (name, value) => {
        dispatch(inputQuizUpdate({ name, value }))
    }

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

    if (variant === 'question') {
        quizCardContent =
            <QuizQuestion title={title} hint={hint} inputName={inputName} inputValue={inputValue} activeStep={activeStep} onChangeHandler={onChangeHandler} onButtonClick={onButtonClick} />
    }

    if (variant === 'confirmation') {
        quizCardContent = <QuizConfirmation onButtonClick={onButtonClick} hiringObj={hiringObj} personDetails={personDetails} />
    }

    if (variant === 'final') {
        quizCardContent = <QuizFinal title={title} hint={hint} coverText={coverText} onButtonClick={onButtonClick} />
    }


    if (variant !== 'final') {
        return (
            <CardWrapper
                isOpen={isOpen}
                bgColor={bgColor}
                variant={variant}
                height={'350px'}
                padding={[1, 5]}
                activeStep={activeStep}
                inputValue={inputValue}
                personDetails={personDetails}
                coverText={coverText}
                isBtnLoading={isBtnLoading}
                onButtonClick={onButtonClick}
            >
                {quizCardContent}
            </CardWrapper>
        );
    }

    else {
        return (

            <CardWrapper
                isOpen={isOpen}
                bgColor={'white'}
                variant={variant}
                height={'100%'}
                padding={0}
                activeStep={activeStep}
                inputValue={inputValue}
                personDetails={personDetails}
                coverText={coverText}

                onButtonClick={onButtonClick}
            >
                {quizCardContent}
            </CardWrapper>
        );
    }

};

export default QuizCardContainer;

const CardWrapper = ({ isOpen, bgColor, variant, height, padding, activeStep, inputValue, personDetails, coverText, isBtnLoading, onButtonClick, children }) => {
    return (
        <ScaleFade initialScale={0.5} in={isOpen} delay={0.2}>

            <Card variant={'filled'} bg={bgColor} minH='250px' h={height} overflow={'scroll'} >
                <CardBody p={padding} bg={'transparent'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                    {
                        children
                    }
                    <Box pb={padding === 0 ? 4 : 'inherit'}>
                        <QuizNavygation variant={variant} activeStep={activeStep} inputValue={inputValue} personDetails={personDetails} coverText={coverText} isBtnLoading={isBtnLoading} onButtonClick={onButtonClick} />
                    </Box>
                </CardBody>
            </Card>
        </ScaleFade>
    )
}







