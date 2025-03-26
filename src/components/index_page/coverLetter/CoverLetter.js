import Link from 'next/link';
import { Text, VStack, Heading, Image, Button } from '@chakra-ui/react';
import { motion } from "motion/react";

import { indexData } from '@/lib/content-lib';
import SectionContainer from '../SectionContainer';
import { LuSparkles } from "react-icons/lu";

const CoverLetter = () => {
    return (
        <SectionContainer sectionId={'sectionCoverLetter'} useGradient={false} bgColor='teal' textColor='#FFF'>

            <VStack paddingX={[1, 3]} justifyContent={'center'} gap={6} bg=''>
                <Text textAlign={'center'} fontSize={['sm', 'md']} >{indexData?.cover?.topheading || `Lorem ipsum dolor sit.`}</Text>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }}
                // viewport={{ once: true }}
                >
                    <Heading as='h2' textAlign={'center'} bg='' size={['xl', '3xl']} mx={'auto'} >
                        {
                            indexData?.cover?.heading || `Lorem ipsum dolor, sit amet consectetur adipisicing elit!`
                        }
                    </Heading>
                </motion.div>
                <Text color={'white'} textAlign={['left', 'center']} fontSize={['sm', 'md']}>
                    {
                        indexData?.cover?.descr || `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet cum eligendi iure ipsum officiis. Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero quidem animi dignissimos debitis voluptas!`
                    }
                </Text>
                <Link href='/toolkit/cover-letter'>
                    <Button variant={'surface'} colorPalette={'teal'} size={['xs', 'sm']} ><LuSparkles />Generate Your Cover Letter</Button>
                </Link>
            </VStack>

            <Image
                h={['125px', '250px']}
                mb={['-5', '-10']}
                fit={'contain'}
                src={`./${process.env.NEXT_PUBLIC_APP_COVER_IMG}`}
                alt='interview section img'
            />
        </SectionContainer>
    );
};

export default CoverLetter;