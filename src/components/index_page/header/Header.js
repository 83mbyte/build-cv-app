
import SectionContainer from '../SectionContainer';
import HeaderNavygation from './HeaderNavygation';
import HeaderText from './HeaderText';
import HeaderButtonToEditor from './HeaderButtonToEditor';
import { Image, Box } from '@chakra-ui/react';
import { motion } from 'motion/react';

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
                    src={`./${process.env.NEXT_PUBLIC_APP_INDEX_TOP_IMG}`}
                    alt='header section img'
                />
            </motion.div>
            <AnimateResumeImages />
        </SectionContainer >
    );
};

export default Header;


const AnimateResumeImages = () => {
    const imgArr = [
        { left: '80px', deg: '-15deg', delay: 0.1, src: './template0.png' },
        { left: '125px', deg: '0deg', delay: 0.15, src: './template1.png' },
        { left: '1270px', deg: '15deg', delay: 0.2, src: './template2.png' },
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
                                <Image
                                    h={['190px', '469px']}
                                    mb={['-5', '-100']}
                                    fit={'contain'}
                                    src={image.src}
                                    alt={`resume${index}`}
                                    border={'1px solid #dedede'}
                                    borderRadius={'lg'}

                                />
                            </motion.div>
                        )
                    })
                }
            </motion.div>
        </Box>
    )
}