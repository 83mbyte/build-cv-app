import { Box, Text, Heading } from '@chakra-ui/react';

import IndexSectionsWrapper from './IndexSectionsWrapper';
import AnimationWrapper from '../Animation/AnimationWrapper';
import { indexData } from '@/lib/content-lib';



const IndexInterviewElement = () => {
    return (
        <IndexSectionsWrapper bgColor='teal.700' textColor='white'>
            <Text textAlign={'center'} fontSize={['sm', 'lg']}>{indexData?.interview?.topheading || `Lorem ipsum dolor sit.`}</Text>
            <Box mx={'auto'} w={'full'} >

                <AnimationWrapper variant={'slideUp'} showOnce={true} whileInView={true} >
                    <Heading as='h2' textAlign={'center'} bg='' size={['xl', 'xl']} mx={'auto'} >
                        {
                            indexData?.interview?.heading || `Lorem ipsum dolor, sit amet consectetur adipisicing elit!`
                        }
                    </Heading>
                </AnimationWrapper>
            </Box>

            <Box bg='' w={['xs', 'full']} >
                <Text color={'white'} textAlign={'center'} fontSize={['sm', 'md']}>
                    {
                        indexData?.interview?.descr || `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet cum eligendi iure ipsum officiis. Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero quidem animi dignissimos debitis voluptas!`
                    }

                </Text>
            </Box>

            {/* Image for the Interview element section */}
            <Box
                bg='transparent'
                w='full'
                py={'0'}
                px={0}
                h={'250px'}
                mb={'-40px'}
                borderBottomWidth={'0px'}
                borderColor={'gray.300'}
                borderLeft={'none'}
                borderRight={'none'}
                justifyContent={'center'}
                display={'flex'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'bottom'}
                backgroundSize={'contain'}
                backgroundImage={`url(./${process.env.NEXT_PUBLIC_APP_INTERVIEW_IMG})`}
            >
            </Box>
        </IndexSectionsWrapper >
    );
};

export default IndexInterviewElement;