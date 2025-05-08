import { indexData } from '@/lib/content-lib';
import { Heading, VStack, Highlight, Text } from '@chakra-ui/react';
import { motion } from "motion/react";

const HeaderText = () => {
    return (

        <VStack maxW='full' paddingX={3} justifyContent={'center'} gap={6} bg=''>

            <Text textAlign={'center'} fontSize={['sm', 'md']} >{indexData?.top?.topheading || `Lorem, ipsum dolor.`}</Text>
            <motion.div
                initial={{ opacity: 0, translateY: -100 }}
                whileInView={{ opacity: 1, translateY: 0, transition: { duration: 0.8 }, }}
                viewport={{ once: true }}
            >
                <Heading as='h1' size={['3xl', '4xl']} textAlign={'center'} bg='' maxWidth={'xl'}>
                    {indexData?.top?.heading[0] || `Lorem ipsum dolor sit`} <Highlight query={indexData?.top?.highlight || 'lorem'} styles={{ px: '0.5', pt: '0', pb: '0.5', bg: 'rgba(250,250,137,0.8)', }}>{indexData?.top?.highlight || 'lorem'}</Highlight> {indexData?.top?.heading[1] || ` psum dolor sit amet.`}
                </Heading>
            </motion.div>

            <Text color={'gray.500'} textAlign={'center'} fontSize={['sm', 'md']} bg={'rgba(250,250,250,0.4)'}>{indexData?.top?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil magni aliquam?`}
                <Highlight query={indexData?.top?.texthighlight || `Lorem ipsum dolor`} styles={{ px: '0.5', py: '0.5', bg: 'rgba(250,250,137,0.8)', color: 'gray.500' }}>{`${indexData?.top?.texthighlight || `Lorem ipsum dolor`}- instant result.`}</Highlight>
            </Text>
        </VStack>
    );
};

export default HeaderText;