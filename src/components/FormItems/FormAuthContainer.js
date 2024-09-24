// 
//  structure wrapper for the AUTH page forms...
// 

import { Heading, Card, CardBody, CardHeader } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import AnimationWrapper from '../Animation/AnimationWrapper';

const FormAuthContainer = ({ title, children }) => {
    return (

        <AnimationWrapper variant='slideX' custom={window?.innerWidth || null}>
            <Card w={['sm', 'lg', 'xl']} alignItems="center" justifyContent={'center'} px={[2, 4]} py={[1, 2]} as={motion.div} layout >
                <CardHeader>
                    <Heading as='h2'>{title}</Heading>
                </CardHeader>

                <CardBody bg={''} w='full' px={[2, 4]} py={[1, 2]}  >

                    {children}

                </CardBody>
            </Card>
        </AnimationWrapper >
    );
};

export default FormAuthContainer;