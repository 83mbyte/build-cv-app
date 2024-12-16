import { Alert, AlertIcon } from '@chakra-ui/react';
import AnimationWrapper from '../Animation/AnimationWrapper';
import { motion } from 'motion/react';;;
import { uid } from 'uid/single';

const sizeBreakPoints = ['sm', 'md'];
const keyId = uid();

const AlertCustom = ({ type = 'info', message = 'alert message here..' }) => {

    return (

        <AnimationWrapper variant='alertStretch' width='100%'>
            <Alert status={type} rounded={sizeBreakPoints} fontSize={'sm'} as={motion.div} layout layoutId={keyId} >
                <AlertIcon />
                {message}
            </Alert>
        </AnimationWrapper>
    );
};

export default AlertCustom;