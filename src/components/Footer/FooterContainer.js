import { Box, Container, Stack, Text, HStack, chakra, VisuallyHidden } from '@chakra-ui/react';
import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const FooterContainer = () => {
    return (
        <Box w="full" my={3}>
            <Container
                bg=''
                as={Stack}
                direction={{ base: 'column', md: 'row' }}
                spacing={3}
                px={2}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
                fontSize={'xs'}
            >
                <FooterColumn >
                    <Text>IntroduceMe</Text>
                </FooterColumn>
                <FooterColumn>
                    <Text >&copy; 2023. All rights reserved.</Text>
                </FooterColumn>
                <FooterColumn >
                    <HStack spacing={{ base: 2, md: 1 }}>
                        <SocialMediaIcon href="https://twitter.com" label={'Twitter'}><FaTwitter /></SocialMediaIcon>
                        <SocialMediaIcon href="https://facebook.com" label={'Facebook'}><FaFacebook /></SocialMediaIcon>
                        <SocialMediaIcon href="https://www.linkedin.com/" label={'Linkedin'}><FaLinkedin /></SocialMediaIcon>
                    </HStack>
                </FooterColumn>
            </Container>
        </Box>
    );
};

export default FooterContainer;

const FooterColumn = ({ children }) => {
    return (
        <Box color={'gray.400'}>
            {children}
        </Box>
    )
}

const SocialMediaIcon = ({ children, label, href = '#' }) => {
    return (

        <chakra.button
            rounded={'full'}
            w={7}
            h={7}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            target={'_blank'}
            rel={'noopener noreferrer nofollow'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'color 0.3s ease'}
            color={'gray.400'}
            // bg='red'
            fontSize={{ base: 'md', md: 'sm' }}
            _hover={{
                color: 'teal'
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button >
    )
}