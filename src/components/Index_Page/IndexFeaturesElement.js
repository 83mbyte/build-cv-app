
import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { IconContext } from "react-icons";
import { GiPencilRuler, GiPodiumWinner, GiSandsOfTime } from "react-icons/gi";

import IndexSectionsWrapper from './IndexSectionsWrapper';
import AnimationWrapper from '../Animation/AnimationWrapper';
import { indexData } from '@/lib/content-lib';

const data = [
    { heading: indexData?.features?.one?.heading || `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`, text: indexData?.features?.one?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!`, icon: <GiPodiumWinner /> },
    { heading: indexData?.features?.two?.heading || 'Lorem ipsum dolor sit amet', text: indexData?.features?.two?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quam labore unde ut, omnis laudantium.`, icon: <GiPencilRuler /> },
    { heading: indexData?.features?.three?.heading || `Eum magnam sapiente`, text: indexData?.features?.three?.text || `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, architecto placeat.`, icon: <GiSandsOfTime /> }
];

const IndexFeaturesElement = () => {
    return (
        <IndexSectionsWrapper >

            <Box bg='' mx={'auto'} w={'full'} display={'flex'}  >
                <Heading as='h2' textAlign={'center'} size={['xl', 'xl']}>
                    {
                        indexData?.features?.topheading || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, quo.`
                    }
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
        </IndexSectionsWrapper>
    );
};

export default IndexFeaturesElement;




const Card = ({ icon = 'icon', text = 'lorem ipsum', heading }) => {



    const itemMotion = {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
    }
    return (


        <AnimationWrapper variant={'opacity'} whileInView={true} showOnce={true}>
            <Box w={['50px', 'full']} bg='' justifyContent={['center', 'flex-start']} alignItems={['', 'flex-start']} display={'flex'} margin={''} >
                <IconContext.Provider value={{
                    style: { width: '32px', height: '32px', color: '#319795' }
                }} >
                    <Box>
                        {icon}
                    </Box >
                </IconContext.Provider >
            </Box>

            <VStack alignItems={'flex-start'} spacing={[1, 2]}   >
                <Heading size={['sm', 'sm', 'md']} as={motion.h5} variants={itemMotion}>{heading}</Heading>
                <Text fontSize={['xs', 'xs', 'sm']} color={'gray.500'} as={motion.p} variants={itemMotion}>{text}</Text>
            </VStack>
        </AnimationWrapper>

    )
}