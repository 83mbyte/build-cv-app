import { Box, Heading, Text, VStack, } from '@chakra-ui/react';
import React from 'react';
import WelcomeWrapper from '../Wrappers/WelcomeWrapper';
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import { GiPencilRuler, GiPodiumWinner } from "react-icons/gi";

const WelcomeFeatures = () => {
    const data = [
        { heading: 'Create a resume to achieve your career goal.', text: 'Use our resume maker with its advanced creation tools to tell a professional story that engages recruiters.', icon: <GiPodiumWinner /> },
        { heading: 'Resume creating made easy.', text: 'Just fill in your details, choose a CV template. Export to PDF or generate a link to your resume.', icon: <GiPencilRuler /> }
    ];
    return (
        <WelcomeWrapper>

            <Box bg='' mx={'auto'} w={'full'} display={'flex'}  >
                <Heading as='h2' textAlign={'center'} size={['xl', 'xl']}>
                    Give yourself an advantage with the best online resume maker.
                </Heading>
            </Box>
            <Box bg='' mx={'auto'} w={'full'} display={'flex'} flexDirection={['column', 'row']} justifyContent={'space-between'} columnGap={['', 5]} rowGap={[5, '']}>

                {
                    data.map((item, index) => {
                        return (
                            <Card key={index} text={item.text} heading={item.heading} icon={item.icon} />
                        )
                    })
                }
            </Box>

        </WelcomeWrapper>

    );
};

export default WelcomeFeatures;

const Card = ({ icon = 'icon', text = 'lorem ipsum', heading }) => {

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { delay: 0.3, delayChildren: 0.6, staggerChildren: 0.3, duration: 1 }
        }
    }

    const itemMotion = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }
    return (
        <Box
            display={'flex'}
            flex={1}
            border={'0px solid gray'}
            rowGap={1}
            columnGap={2}
            flexDirection={['row', 'column']}
            as={motion.div}
            variants={container}
            initial={'hidden'}
            whileInView={'show'}
            viewport={{ once: true }}


        >
            <Box w={['50px', 'full']} bg='' justifyContent={['center', 'flex-start']} alignItems={['', 'flex-start']} display={'flex'} margin={''} >
                <IconContext.Provider value={{
                    style: { width: '32px', height: '32px', color: '#319795' }
                }} >
                    <Box >
                        {icon}
                    </Box >
                </IconContext.Provider >
            </Box>

            <VStack alignItems={'flex-start'} spacing={[1, 2]}   >
                <Heading size={['sm', 'sm', 'md']} as={motion.h5} variants={itemMotion}>{heading}</Heading>
                <Text fontSize={['xs', 'xs', 'sm']} color={'gray.500'} as={motion.p} variants={itemMotion}>{text}</Text>
            </VStack>
        </Box>
    )
}