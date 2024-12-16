
import { Center, Box, Button } from "@chakra-ui/react";

import { MdOutlineArrowBack, MdOutlineArrowForward, MdModeEditOutline } from "react-icons/md";

const QuizNavygation = ({ variant, activeStep, inputValue, personDetails = null, coverText = null, isBtnLoading, onButtonClick }) => {

    return (
        <Center bg='transparent' w={'full'}>
            {
                (variant === 'question' && activeStep === 0) &&
                <ButtonTemplate
                    rightIcon={<MdOutlineArrowForward />}
                    disableRule={inputValue.trim() === '' && (activeStep === 0 || activeStep === 1)}
                    value='Next'
                    onButtonClick={onButtonClick}
                />
            }
            {
                (variant === 'question' && (activeStep === 1 || activeStep === 2)) &&
                <>
                    <ButtonTemplate
                        variantBtn='outline'
                        leftIcon={<MdOutlineArrowBack />}
                        value='Back'
                        onButtonClick={onButtonClick}
                    />

                    <ButtonTemplate
                        rightIcon={<MdOutlineArrowForward />}
                        disableRule={inputValue.trim() === '' && (activeStep === 0 || activeStep === 1)}
                        value='Next'
                        onButtonClick={onButtonClick}
                    />
                </>
            }
            {
                (variant === 'confirmation' && activeStep === 3) &&
                <>
                    <ButtonTemplate
                        variantBtn='outline'
                        leftIcon={<MdOutlineArrowBack />}
                        value='Back'
                        onButtonClick={onButtonClick}
                    />

                    <ButtonTemplate
                        rightIcon={<MdOutlineArrowForward />}
                        disableRule={personDetails.skills.length < 1 || (personDetails.firstName === '' && personDetails.lastName === '')}
                        loadingRule={isBtnLoading}
                        value='Confirm'
                        onButtonClick={onButtonClick}
                    />
                </>
            }
            {
                (variant === 'final' && activeStep === 4) &&
                <>
                    {
                        (variant === 'final' && (coverText && coverText !== ''))
                            ? <>
                                <ButtonTemplate
                                    variantBtn='outline'
                                    leftIcon={<MdModeEditOutline />}
                                    value='Edit'
                                    onButtonClick={onButtonClick}
                                />

                                <ButtonTemplate
                                    value='Save & Exit'
                                    onButtonClick={onButtonClick}
                                />

                            </>

                            : <>
                                <ButtonTemplate
                                    variantBtn='outline'
                                    leftIcon={<MdOutlineArrowBack />}
                                    value='Back'
                                    onButtonClick={onButtonClick}
                                />
                            </>
                    }
                </>
            }
        </Center >
    )
}

export default QuizNavygation;

const ButtonTemplate = ({ variantBtn = 'solid', leftIcon = null, rightIcon = null, disableRule = false, loadingRule = false, value = '', onButtonClick }) => {
    return (
        <Box mx={3}>
            <Button
                colorScheme={'teal'}
                size={['sm', 'md']}
                variant={variantBtn}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                isDisabled={disableRule}
                isLoading={loadingRule}
                onClick={() => onButtonClick(value.toLowerCase())}
            >
                {value}
            </Button>
        </Box>
    )
}