import { Box, Text, Heading, Highlight, ButtonGroup, Button } from '@chakra-ui/react';

import Link from 'next/link';

import IndexSectionsWrapper from './IndexSectionsWrapper';
import AnimationWrapper from '../Animation/AnimationWrapper';
import { indexData } from '@/lib/content-lib';

const IndexTopElement = () => {
    return (

        <IndexSectionsWrapper>

            <Text textAlign={'center'} fontSize={['sm', 'lg']}>{indexData?.top?.topheading || `Lorem, ipsum dolor.`}</Text>

            <AnimationWrapper variant={'slideDown'} whileInView={true}>
                <Heading as='h1' size={['xl', '2xl']} textAlign={'center'} >
                    {indexData?.top?.heading[0] || `Lorem ipsum dolor sit`} <Highlight query={indexData?.top?.highlight || 'lorem'} styles={{ px: '0.5', pt: '0', pb: '0.5', bg: 'rgba(250,250,137,0.8)', }}>{indexData?.top?.highlight || 'lorem'}</Highlight> {indexData?.top?.heading[1] || ` psum dolor sit amet.`}
                </Heading>
            </AnimationWrapper>

            <Box bg='' w={['xs', 'md']} >
                <Text color={'gray.500'} textAlign={'center'} fontSize={['sm', 'md']} bg={'rgba(250,250,250,0.4)'}>{indexData?.top?.text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil magni aliquam?`}
                    <Highlight query={indexData?.top?.texthighlight || `Lorem ipsum dolor`} styles={{ px: '0.5', py: '0.5', bg: 'rgba(250,250,137,0.8)', color: 'gray.500' }}>{`${indexData?.top?.texthighlight || `Lorem ipsum dolor`}- instant result.`}</Highlight></Text>
            </Box>

            {/* Buttons */}
            <Box justifyContent={'center'} display={'flex'} py={3}>
                <IndexTopElementButtons />
            </Box>

            {/* Image for the Top element section */}
            <Box
                bg='transparent'
                w='full'
                py={'0'}
                px={0}
                h={'250px'}
                mb={-10}
                borderBottomWidth={'0px'}
                borderColor={'gray.300'}
                borderLeft={'none'}
                borderRight={'none'}
                justifyContent={'center'}
                display={'flex'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'bottom'}
                backgroundSize={'contain'}
                backgroundImage={`url(./${process.env.NEXT_PUBLIC_APP_INDEX_TOP_IMG})`}
            >
            </Box>

        </IndexSectionsWrapper>
    );
};

export default IndexTopElement;

const IndexTopElementButtons = () => {

    return (
        <ButtonGroup colorScheme={'teal'} spacing={4} size={'md'}>
            <Button variant={'outline'} as={Link} href='/auth?page=login'>Login</Button>
            <Button variant={'solid'} as={Link} href='/auth?page=signup'>Register</Button>
        </ButtonGroup >
    )
}