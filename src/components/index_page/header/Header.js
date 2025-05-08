
import SectionContainer from '../SectionContainer';
import HeaderNavygation from './HeaderNavygation';
import HeaderText from './HeaderText';
import HeaderButtonToEditor from './HeaderButtonToEditor';
import { Image, Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import { motion } from 'motion/react';

import welcomeImg from '@/components/assets/images/welcome.webp'
import template0 from '@/components/assets/images/template0.webp'
import template1 from '@/components/assets/images/template1.webp'
import template2 from '@/components/assets/images/template2.webp'

const Header = () => {



    return (
        <SectionContainer sectionId={'sectionHeader'} useGradient={false} bgColor="white">
            <HeaderNavygation />
            <HeaderText />
            <HeaderButtonToEditor />
            <motion.div viewport={{ once: true }} initial={{ y: 300, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 85, } }}>
                <Image
                    h={['125px', '250px']}
                    mb={['-40px', '-30px']}
                    fit={'contain'}
                    w='auto'
                    alt='header section img'
                    asChild
                >
                    <NextImage
                        priority={true}
                        src={welcomeImg}
                    />
                </Image>
            </motion.div>
            <AnimateResumeImages />
        </SectionContainer >
    );
};

export default Header;


const AnimateResumeImages = () => {
    const imgArr = [
        { left: '80px', deg: '-15deg', delay: 0.1, src: template0 },
        { left: '125px', deg: '0deg', delay: 0.15, src: template1 },
        { left: '1270px', deg: '15deg', delay: 0.2, src: template2 },
    ];
    return (
        <Box
            mt={['-1', '-3']}
            h={['180px', '450px']}
            position={'relative'}
            w='full'
        >

            <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '100%' }} initial={{ y: 100 }} animate={{ y: 0, transition: { type: 'spring', delay: 0.2 } }}>

                {
                    imgArr.map((image, index) => {

                        return (
                            <motion.div key={index} style={{ zIndex: index, position: 'absolute', top: '0px', transformOrigin: 'bottom', }}
                                viewport={{ once: true }}
                                initial={{ opacity: 0, }} whileInView={{ opacity: 1, transform: `rotate(${image.deg})`, transition: { transform: { type: 'spring', delay: image.delay, mass: 2, stiffness: 100, } } }}
                            >
                                <Image asChild
                                    border={'1px solid #dedede'}
                                    borderRadius={'lg'}
                                    height={['190px', '469px']}
                                    mb={['-5', '-100']}
                                    fit={'contain'}
                                    w='auto'
                                    alt={`resume${index}`}
                                >
                                    <NextImage
                                        src={image.src}
                                        priority={index == 2 ? true : false}
                                    />
                                </Image>
                            </motion.div>
                        )
                    })
                }
            </motion.div>
        </Box>
    )
}