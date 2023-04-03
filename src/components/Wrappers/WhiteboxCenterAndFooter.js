import { Box, ScaleFade, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FooterContainer from '../Footer/FooterContainer';

const WhiteboxCenterAndFooter = ({ width = ['sm', 'lg'], children }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (!isVisible) {
            setIsVisible(true)
        }
        return () => {
            if (isVisible) {
                setIsVisible(false)
            }
        }
    }, [isVisible])
    return (
        <VStack h="100vh" minH={'300px'} justifyContent={'space-around'}  >
            <Box flex={1} alignItems="center" justifyContent={'center'} display={'flex'} w={['sm', 'lg', 'xl']} >
                <ScaleFade in={isVisible} initialScale={0.3} >
                    <Box w={width}
                        p={8}
                        mt={1}
                        border={['none', '1px']}
                        borderColor={['', 'gray.300']}
                        borderRadius={10}
                        bg={['', 'white']}
                    >
                        {children}
                    </Box>
                </ScaleFade>
            </Box>
            <Box w={'full'} bg='transparent'>
                <FooterContainer />
            </Box>
        </VStack>
    );
};

export default WhiteboxCenterAndFooter;