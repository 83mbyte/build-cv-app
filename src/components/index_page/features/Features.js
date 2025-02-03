
import { Heading, Box, VStack, Text, Icon, Stack, } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { LuHourglass, LuPencilRuler, LuTrophy, LuSmile, LuBotMessageSquare } from "react-icons/lu";

import { indexData } from '@/lib/content-lib';
import SectionContainer from '../SectionContainer';

const data = [
    { heading: indexData?.features?.one?.heading || `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`, text: indexData?.features?.one?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum magnam sapiente repudiandae id vitae rerum iure!`, icon: <LuTrophy /> },
    { heading: indexData?.features?.three?.heading || `Eum magnam sapiente`, text: indexData?.features?.three?.text || `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, architecto placeat.`, icon: <LuBotMessageSquare /> },
    { heading: indexData?.features?.two?.heading || 'Lorem ipsum dolor sit amet', text: indexData?.features?.two?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quam labore unde ut, omnis laudantium.`, icon: <LuPencilRuler /> },
    { heading: indexData?.features?.four?.heading || 'Lorem ipsum dolor sit amet', text: indexData?.features?.four?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quam labore unde ut, omnis laudantium.`, icon: <LuPencilRuler /> },
    { heading: indexData?.features?.five?.heading || 'Lorem ipsum dolor sit amet', text: indexData?.features?.five?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quam labore unde ut, omnis laudantium.`, icon: <LuSmile /> },
    { heading: indexData?.features?.six?.heading || 'Lorem ipsum dolor sit amet', text: indexData?.features?.six?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quam labore unde ut, omnis laudantium.`, icon: <LuHourglass /> },
];

const Features = () => {
    return (
        <SectionContainer sectionId={'sectionFeatures'} bgColor='white' >

            <VStack maxW='full' paddingX={[1, 3]} justifyContent={'center'} gap={6} bg=''>

                <Heading as='h2' textAlign={'center'} size={['xl', '3xl']} >
                    {
                        indexData?.features?.topheading || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, quo.`
                    }
                </Heading>
                <Box bg='' mx={'auto'} w={'full'} display={'flex'} flexDirection={['column', 'row']} gap={['6', '10']} flexWrap={'wrap'}>
                    {
                        data.map((item, index) => {
                            return (

                                <FeaturesItem key={index} itemKey={index} text={item.text} heading={item.heading} icon={item.icon} />
                            )
                        })
                    }
                </Box>
            </VStack>

        </SectionContainer>
    );
};

export default Features;

const FeaturesItem = ({ itemKey, text, heading, icon, whileInView = true }) => {
    return (
        <motion.div
            key={itemKey}
            initial={{ opacity: 0 }}
            whileInView={whileInView ? { opacity: 1, transition: { delay: 0.3 } } : null}
            viewport={{ once: true }}
            style={{ minWidth: '31%', width: 'auto' }}
        >

            <VStack alignItems={'flex-start'} bg=''>
                <Stack direction={['row', 'column']} alignItems={['center', 'flex-start']} bg='' gap={['3', '1']}>
                    <Box>
                        <Icon fontSize={'2xl'} color='teal'>
                            {icon}
                        </Icon>
                    </Box>
                    <Heading size={['md', 'lg']} as={'h3'}>{heading}</Heading>
                </Stack>
                <Text fontSize={['sm', 'md']} color={'gray.500'}>{text}</Text>
            </VStack>
        </motion.div>
    )
}