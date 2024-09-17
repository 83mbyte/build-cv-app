
import { Box, Text, Heading } from '@chakra-ui/react';

import IndexSectionsWrapper from './IndexSectionsWrapper';
import AnimationWrapper from '../Animation/AnimationWrapper';
import { indexData } from '@/lib/content-lib';

const IndexCoverElement = () => {
    return (
        <IndexSectionsWrapper bgColor='teal' textColor='white'>
            <Text textAlign={'center'} fontSize={['sm', 'lg']}>{indexData?.cover?.topheading || `Lorem ipsum dolor sit.`}</Text>
            <Box mx={'auto'} w={'full'} >

                <AnimationWrapper variant={'slideUp'} showOnce={false} whileInView={true} >
                    <Heading as='h2' textAlign={'center'} bg='' size={['xl', 'xl']} mx={'auto'} >
                        {
                            indexData?.cover?.heading || `Lorem ipsum dolor, sit amet consectetur adipisicing elit!`
                        }
                    </Heading>
                </AnimationWrapper>
            </Box>

            <Box bg='' w={['xs', 'full']} >
                <Text color={'white'} textAlign={'center'} fontSize={['sm', 'md']}>
                    {
                        indexData?.cover?.descr || `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet cum eligendi iure ipsum officiis. Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero quidem animi dignissimos debitis voluptas!`
                    }

                </Text>
            </Box>

            {/* Image for the Cover element section */}
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
                backgroundImage={`url(./${process.env.NEXT_PUBLIC_APP_COVER_IMG})`}
            >
            </Box>
        </IndexSectionsWrapper >
    );
};

export default IndexCoverElement;